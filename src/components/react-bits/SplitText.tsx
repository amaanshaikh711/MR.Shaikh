import React from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 30,
}) => {
  const words = text.split(' ');

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="inline-block transition-transform duration-500 ease-out hover:-translate-y-1 hover:text-purple-400"
              style={{
                transitionDelay: `${(wordIndex * 5 + charIndex) * delay}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
