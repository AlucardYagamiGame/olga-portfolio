import { Fragment } from 'react';

import styles from './RichText.module.scss';

const TOKEN = /\{([^}]+)\}/g;

interface RichTextProps {
  text: string;
}

export const RichText = ({ text }: RichTextProps) => {
  const parts = text.split(TOKEN);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ?
          <mark
            key={`${part}-${index}`}
            className={styles.chip}
          >
            {part}
          </mark>
        : <Fragment key={`${part}-${index}`}>{part}</Fragment>,
      )}
    </>
  );
};
