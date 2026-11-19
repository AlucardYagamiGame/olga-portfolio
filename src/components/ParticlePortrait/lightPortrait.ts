import { CELL, INK, sweep } from './silhouette';

/** Light theme: the dark areas become deep indigo (#1e1b4b), not black. */
const LIGHT_INK = [30, 27, 75] as const;

/** How far (in coarse cells) gaps between hair strands are bridged. */
const BRIDGE = 6;

/**
 * How many coarse cells the outline is pulled back after bridging. Less than
 * BRIDGE, so a thin indigo rim is left around every strand tip.
 */
const SHRINK = BRIDGE - 1;

/** Radius (coarse cells) and passes of the blur that makes the outline a curve. */
const CURVE_RADIUS = 2;
const CURVE_PASSES = 3;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const smoothstep = (from: number, to: number, value: number) => {
  const t = clamp01((value - from) / (to - from));

  return t * t * (3 - 2 * t);
};

/** Box blur on the coarse mask, edges clamped so the frame edge stays solid. */
const blur = (source: Float32Array, cols: number, rows: number) => {
  let current = source;
  let next = new Float32Array(source.length);
  const size = CURVE_RADIUS * 2 + 1;

  for (let pass = 0; pass < CURVE_PASSES; pass += 1) {
    for (const horizontal of [true, false]) {
      const lines = horizontal ? rows : cols;
      const length = horizontal ? cols : rows;
      const stride = horizontal ? 1 : cols;
      const step = horizontal ? cols : 1;

      for (let line = 0; line < lines; line += 1) {
        const start = line * step;
        const at = (n: number) =>
          current[start + Math.min(length - 1, Math.max(0, n)) * stride];
        let sum = 0;

        for (let k = -CURVE_RADIUS; k <= CURVE_RADIUS; k += 1) {
          sum += at(k);
        }

        for (let n = 0; n < length; n += 1) {
          next[start + n * stride] = sum / size;
          sum += at(n + CURVE_RADIUS + 1) - at(n - CURVE_RADIUS);
        }
      }

      [current, next] = [next, current];
    }
  }

  return current;
};

/**
 * Builds a solid, smooth, coarse mask of the whole figure, dark hair
 * included. Gaps between strands are bridged, everything the backdrop cannot
 * reach is the body, and the outline is then blurred into one clean curve.
 */
const buildBody = (isInk: Uint8Array, width: number, height: number) => {
  const cols = Math.ceil(width / CELL);
  const rows = Math.ceil(height / CELL);
  const lit = new Uint8Array(cols * rows);

  for (let y = 0; y < height; y += CELL / 2) {
    for (let x = 0; x < width; x += CELL / 2) {
      if (isInk[y * width + x] === 0) {
        lit[Math.floor(y / CELL) * cols + Math.floor(x / CELL)] = 1;
      }
    }
  }

  const bridged = sweep(lit, cols, rows, BRIDGE, true);
  const backdrop = new Uint8Array(cols * rows);
  const stack = new Int32Array(cols * rows);
  let top = 0;

  const push = (x: number, y: number) => {
    const index = y * cols + x;

    if (backdrop[index] === 0 && bridged[index] === 0) {
      backdrop[index] = 1;
      stack[top] = index;
      top += 1;
    }
  };

  // The backdrop is open at the top and on the upper sides. The lower sides
  // and the bottom belong to the figure, which runs out of the frame there.
  for (let x = 0; x < cols; x += 1) {
    push(x, 0);
  }

  for (let y = 0; y < rows * 0.55; y += 1) {
    push(0, y);
    push(cols - 1, y);
  }

  while (top > 0) {
    top -= 1;

    const index = stack[top];
    const x = index % cols;
    const y = (index - x) / cols;

    if (x > 0) {
      push(x - 1, y);
    }

    if (x < cols - 1) {
      push(x + 1, y);
    }

    if (y > 0) {
      push(x, y - 1);
    }

    if (y < rows - 1) {
      push(x, y + 1);
    }
  }

  const filled = new Uint8Array(cols * rows);

  for (let i = 0; i < filled.length; i += 1) {
    filled[i] = backdrop[i] === 1 ? 0 : 1;
  }

  const body = sweep(filled, cols, rows, SHRINK, false);
  const coverage = new Float32Array(cols * rows);

  for (let i = 0; i < coverage.length; i += 1) {
    coverage[i] = body[i];
  }

  return { coverage: blur(coverage, cols, rows), cols, rows };
};

/**
 * Prepares the poster for the light page. The dark theme never uses this.
 *
 * - the whole figure is one solid shape with a smooth outline: strand tips
 *   and dithered specks no longer make it ragged;
 * - dark areas turn indigo and fill that shape, so hair shadows are solid
 *   instead of see-through holes;
 * - skin keeps its original beige, as do the hair and the red streak.
 */
const cache = new WeakMap<ImageData, ImageData>();

const buildLightImage = (source: ImageData) => {
  const { width, height } = source;
  const data = new Uint8ClampedArray(source.data);
  const isInk = new Uint8Array(width * height);

  for (let index = 0; index < isInk.length; index += 1) {
    const i = index * 4;

    isInk[index] =
      data[i] === INK[0] && data[i + 1] === INK[1] && data[i + 2] === INK[2] ?
        1
      : 0;
  }

  const { coverage, cols, rows } = buildBody(isInk, width, height);
  const sample = (cx: number, cy: number) =>
    coverage[
      Math.min(rows - 1, Math.max(0, cy)) * cols +
        Math.min(cols - 1, Math.max(0, cx))
    ];

  for (let y = 0; y < height; y += 1) {
    const fy = (y + 0.5) / CELL - 0.5;
    const y0 = Math.floor(fy);
    const ty = fy - y0;

    for (let x = 0; x < width; x += 1) {
      const fx = (x + 0.5) / CELL - 0.5;
      const x0 = Math.floor(fx);
      const tx = fx - x0;
      const smooth =
        (sample(x0, y0) * (1 - tx) + sample(x0 + 1, y0) * tx) * (1 - ty) +
        (sample(x0, y0 + 1) * (1 - tx) + sample(x0 + 1, y0 + 1) * tx) * ty;
      const index = y * width + x;
      const i = index * 4;

      // One alpha for every pixel: the outline is the smooth curve, however
      // ragged the strands inside it are.
      data[i + 3] = Math.round(smoothstep(0.42, 0.58, smooth) * 255);

      if (isInk[index] === 1) {
        data[i] = LIGHT_INK[0];
        data[i + 1] = LIGHT_INK[1];
        data[i + 2] = LIGHT_INK[2];
        continue;
      }
    }
  }

  return new ImageData(data, width, height);
};

/** The result is cached, because the portrait and its shadow both need it. */
export const makeLightImage = (source: ImageData) => {
  let image = cache.get(source);

  if (!image) {
    image = buildLightImage(source);
    cache.set(source, image);
  }

  return image;
};
