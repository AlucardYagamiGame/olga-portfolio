import { Fragment } from 'react';

import styles from './RichText.module.scss';

const TOKEN = /\{([^}]+)\}/g;
const LEADING_PUNCTUATION = /^[,.;:!?)»]+/;

interface RichTextProps {
  text: string;
}

export const RichText = ({ text }: RichTextProps) => {
  const parts = text.split(TOKEN);

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          // Punctuation right after a chip is rendered together with it.
          const rest = index > 0 ? part.replace(LEADING_PUNCTUATION, '') : part;

          return rest ?
              <Fragment key={`${part}-${index}`}>{rest}</Fragment>
            : null;
        }

        const punctuation =
          parts[index + 1]?.match(LEADING_PUNCTUATION)?.[0] ?? '';

        return (
          <span
            key={`${part}-${index}`}
            className={styles.group}
          >
            <mark className={styles.chip}>{part}</mark>
            {punctuation}
          </span>
        );
      })}
    </>
  );
};
