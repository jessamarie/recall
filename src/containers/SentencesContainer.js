import React, { useState } from 'react';

import './SentencesContainer.scss';
import Sentence from '../components/Sentence';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faBackward,
  faChevronLeft,
  faQuestionCircle,
  faSquareCheck
} from '@fortawesome/free-solid-svg-icons';
import { exclusions } from './exclusions';

let keyCounter = 0;

/**
 * SentenceContainer is the component that holds all
 * of the logic related to breaking down sentences
 */
export default function SentencesContainer({ topic, resetTopic }) {
  const [extractedSentences, setExtractedSentences] = useState(prepSentences());
  const [currentSentence, setCurrentSentence] = useState(extractedSentences[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* prepSentences extracts each sentence of 1-2 words
     and returns the sentence back as an array of objects.

     If the word is not extracted then:
     obj = {
      word: The orginal word
      key: A Unique identifier,
      extracted: false
     }
     obj = {
      word: The orginal word
      attempt: '' // the user's input
      key: A Unique identifier,
      correct: false // word !== attempt,
      extracted: true
    }
  */
  function prepSentences() {
    return topic.sentences.map((sentence) => {
      // trim whitespace and remove all punctuation
      const words = sentence
        .toLowerCase()
        .trim()
        .match(/[^_\W]+/g)
        .join(' ')
        .split(' ');

      let wordsToExtract = getWordsToExtract(words, words.length);

      const extractedSentence = extractWordsFromSentences(
        words,
        wordsToExtract
      );

      return extractedSentence;
    });
  }

  /*
    extractWordsFromSentences marks a word as extracted if it
    is in the wordsToExtract array.

    @returns an array of objects that represent the full sentence,
    one word at a time
  */
  function extractWordsFromSentences(sentenceWords, wordsToExtract) {
    const extractedSentence = sentenceWords.map((word) => {
      keyCounter = keyCounter + 1;

      if (wordsToExtract.includes(word)) {
        return {
          key: keyCounter,
          word: word,
          attempt: '',
          extracted: true,
          correct: null
        };
      } else {
        return {
          key: keyCounter,
          word: word,
          extracted: false
        };
      }
    });

    return extractedSentence;
  }

  /*
    getWordsToExtract handles the process of finding 1-2
    words to remove from an array
  */
  function getWordsToExtract(words, length) {
    let wordsToExtract = [];

    let wordToExtract = getWordToExtract(words, wordsToExtract);
    wordsToExtract.push(wordToExtract);

    // repeat if length is long enough
    if (length > 5) {
      wordToExtract = getWordToExtract(words, wordsToExtract);
      wordsToExtract.push(wordToExtract);
    }

    return wordsToExtract;
  }

  /*
    getWordToExtract handles the process of finding one
    word to remove from a given array of words
  */
  function getWordToExtract(words, currentWordsToExtract) {
    let wordToExtract;
    let excludedWords = [];

    excludedWords.push(...exclusions);
    excludedWords.push(...currentWordsToExtract);

    const extractableWords = getExtractableWords(words, excludedWords);
    wordToExtract = getRandomWordByIndex(
      extractableWords,
      extractableWords.length
    );

    return wordToExtract;
  }

  /* getExtractableWords returns the set difference of
  two arrays of words
  */
  function getExtractableWords(words, exclusionWords) {
    let wordsSet = new Set(words);
    let exclusionsSet = new Set(exclusionWords);
    let difference = new Set(
      [...wordsSet].filter((x) => !exclusionsSet.has(x))
    );
    return Array.from(difference);
  }

  /* getRandomWordByIndex finds one random word in an array
    to extract
  */
  function getRandomWordByIndex(words, len) {
    const randomIndex = Math.floor(Math.random() * len);
    return words[randomIndex];
  }

  /* getRandomWordByIndex finds one random word in an array
    to extract
  */
  function handleAnswerChange(e, index) {
    const input = e.target.value;

    const newSentence = currentSentence.slice();
    let newExtractedSentences = extractedSentences.slice();

    newSentence[index].attempt = input;

    if (input === newSentence[index].word) {
      newSentence[index].correct = true;
    }

    newExtractedSentences[currentIndex] = newSentence;

    setCurrentSentence(newSentence);
    setExtractedSentences(newExtractedSentences);
  }

  /* next moves to the next sentence */
  function next() {
    if (currentIndex < extractedSentences.length - 1) {
      const newCurrentIndex = currentIndex + 1;

      setCurrentIndex(newCurrentIndex);
      setCurrentSentence(extractedSentences[newCurrentIndex]);
    }
  }

  /* next moves to the previous sentence */
  function previous() {
    if (currentIndex > 0) {
      const newCurrentIndex = currentIndex - 1;

      setCurrentIndex(newCurrentIndex);
      setCurrentSentence(extractedSentences[newCurrentIndex]);
    }
  }

  /* restart reprepares the sentences and starts them at the beginning */
  function restart() {
    const extracted = prepSentences();

    setExtractedSentences(extracted);
    setCurrentIndex(0);
    setCurrentSentence(extractedSentences[0]);
  }

  /* reveal completes the sentence */
  function reveal() {
    const newSentence = currentSentence.map((word) => {
      word.correct = true;
      word.attempt = word.word;
      return word;
    });

    setCurrentSentence(newSentence);
  }

  /* checkAnswer checks if the sentence is correct */
  function checkAnswer(e) {
    let newSentence = currentSentence.map((word) => {
      if (word.attempt !== word.word) {
        word.correct = false;
      }
      return word;
    });

    setCurrentSentence(newSentence);
  }

  return (
    <div className='SentencesContainer'>
      <div className='options top'>
        <button title='pick new topic' className='back' onClick={resetTopic}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2 className='topic'>{topic.name}</h2>
        <button className='empty'>.</button>
      </div>
      <Sentence
        onAnswerChange={handleAnswerChange}
        sentence={currentSentence}
        currentIndex={currentIndex}
      />

      <div className='options bottom'>
        <button className='left' title='previous sentence' onClick={previous}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          className='restart'
          title='restart sentence set'
          onClick={restart}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className='check' title='check answer' onClick={checkAnswer}>
          <FontAwesomeIcon icon={faSquareCheck} />
        </button>
        <button className='help' title='reveal answer' onClick={reveal}>
          <FontAwesomeIcon icon={faQuestionCircle} />
        </button>
        <button className='right' title='next sentence' onClick={next}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
