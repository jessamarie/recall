import React from 'react';
import './Sentence.scss';

/**
 * Sentence is the component that displays a sentences
 */
export default function Sentence({ sentence, onAnswerChange }) {
  function getSentence() {
    return sentence.map((word, index) => {
      if (word.extracted) {
        const style = {
          width: `${word.word.length * 2.3}vmax`
        };

        let className = '';

        if (word.correct === true) {
          className = 'correct';
        } else if (word.correct === false) {
          className = 'incorrect';
        }

        return (
          <input
            className={className}
            style={style}
            onChange={(e) => onAnswerChange(e, index)}
            value={word.attempt}
            key={word.key}
            disabled={word.correct}
          />
        );
      }

      return <span key={word.key}>{word.word}</span>;
    });
  }

  return (
    <div className='Sentence'>
      <p>{getSentence()}.</p>
    </div>
  );
}
