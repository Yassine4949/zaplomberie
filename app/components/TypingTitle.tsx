'use client';

import { useEffect, useState } from 'react';

interface TypingTitleProps {
  text: string;
  className?: string;
  speed?: number; // ms entre chaque lettre
}

export default function TypingTitle({
  text,
  className,
  speed = 35,
}: TypingTitleProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayed}</span>;
}
