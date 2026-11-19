import portrait from '@/assets/portrait.webp';

/** Sparks live in this coordinate space (px), whatever the poster size is. */
export const SIZE = 640;

/** Pixels darker than this (sum of r+g+b) count as the black backdrop. */
const DARK = 45 * 3;

/** Closing runs on a reduced mask: one cell covers CELL x CELL pixels. */
export const CELL = 4;
const CLOSE_RADIUS = 5;

/** Ink for dark areas that sit inside the figure (hair shadows, eyes). */
export const INK = [14, 13, 18] as const;

/** Sparks are born only on the right half, never left of the face. */
const SPAWN_MIN_X = 0.5;
const SPAWN_MAX_Y = 0.85;

export interface Silhouette {
  /** The poster with a transparent backdrop. */
  image: ImageData;
  /** Spark birth points on the figure's rim, as x/y pairs in SIZE space. */
  spawn: number[];
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

/** Marks the dark pixels that connect to the image border, by flood fill. */
const floodOutside = (dark: Uint8Array, width: number, height: number) => {
  const outside = new Uint8Array(width * height);
  const stack = new Int32Array(width * height);
  let top = 0;

  const push = (x: number, y: number) => {
    const index = y * width + x;

    if (outside[index] === 0 && dark[index] === 1) {
      outside[index] = 1;
      stack[top] = index;
      top += 1;
    }
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }

  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  while (top > 0) {
    top -= 1;

    const index = stack[top];
    const x = index % width;
    const y = (index - x) / width;

    if (x > 0) {
      push(x - 1, y);
    }

    if (x < width - 1) {
      push(x + 1, y);
    }

    if (y > 0) {
      push(x, y - 1);
    }

    if (y < height - 1) {
      push(x, y + 1);
    }
  }

  return outside;
};

/** One separable pass of max (dilate) or min (erode) over a square window. */
export const sweep = (
  source: Uint8Array,
  cols: number,
  rows: number,
  radius: number,
  grow: boolean,
) => {
  const pass = (input: Uint8Array, horizontal: boolean) => {
    const output = new Uint8Array(input.length);

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        let value = grow ? 0 : 1;

        for (let k = -radius; k <= radius; k += 1) {
          const nx = horizontal ? x + k : x;
          const ny = horizontal ? y : y + k;

          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) {
            continue;
          }

          const sample = input[ny * cols + nx];

          if (grow ? sample === 1 : sample === 0) {
            value = grow ? 1 : 0;
            break;
          }
        }

        output[y * cols + x] = value;
      }
    }

    return output;
  };

  return pass(pass(source, true), false);
};

/**
 * Fills the gaps of the figure (closing): returns, per coarse cell, whether
 * the cell lies inside the figure's body even if it is dark there.
 */
const closeBody = (dark: Uint8Array, width: number, height: number) => {
  const cols = Math.ceil(width / CELL);
  const rows = Math.ceil(height / CELL);
  const lit = new Uint8Array(cols * rows);

  for (let y = 0; y < height; y += CELL / 2) {
    for (let x = 0; x < width; x += CELL / 2) {
      if (dark[y * width + x] === 0) {
        lit[Math.floor(y / CELL) * cols + Math.floor(x / CELL)] = 1;
      }
    }
  }

  const grown = sweep(lit, cols, rows, CLOSE_RADIUS, true);
  const closed = sweep(grown, cols, rows, CLOSE_RADIUS, false);

  return { closed, cols };
};

const build = async (): Promise<Silhouette> => {
  const source = await loadImage(portrait);
  const width = source.naturalWidth;
  const height = source.naturalHeight;
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    throw new Error('Canvas 2D is not available');
  }

  ctx.drawImage(source, 0, 0);

  const frame = ctx.getImageData(0, 0, width, height);
  const data = frame.data;
  const dark = new Uint8Array(width * height);

  for (let i = 0; i < dark.length; i += 1) {
    dark[i] = data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2] < DARK ? 1 : 0;
  }

  const outside = floodOutside(dark, width, height);
  const { closed, cols } = closeBody(dark, width, height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = y * width + x;
      const i = index * 4;

      if (dark[index] === 0) {
        data[i + 3] = 255;
        continue;
      }

      // Dark and open to the outside: transparent, unless the closing says
      // it is the body (hair in shadow). Enclosed dark is always ink.
      const body =
        outside[index] === 0 ||
        closed[Math.floor(y / CELL) * cols + Math.floor(x / CELL)] === 1;

      data[i] = INK[0];
      data[i + 1] = INK[1];
      data[i + 2] = INK[2];
      data[i + 3] = body ? 255 : 0;
    }
  }

  // Sparks rise from the right-hand rim: lit pixels with open air above or
  // beside them.
  const spawn: number[] = [];
  const reach = Math.round(width * 0.008);

  for (let y = reach; y < height * SPAWN_MAX_Y; y += 4) {
    for (let x = Math.floor(width * SPAWN_MIN_X); x < width - reach; x += 4) {
      const index = y * width + x;

      if (
        dark[index] === 0 &&
        (outside[index - reach * width] === 1 || outside[index + reach] === 1)
      ) {
        spawn.push((x / width) * SIZE, (y / height) * SIZE);
      }
    }
  }

  return { image: frame, spawn };
};

let cached: Promise<Silhouette> | null = null;

/** Analyses the poster once and shares the result between both layers. */
export const loadSilhouette = () => {
  cached ??= build();

  return cached;
};
