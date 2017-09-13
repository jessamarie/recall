import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import './SentencesContainer.css'
import 'font-awesome/css/font-awesome.css'
import Sentence from '../components/Sentence'

/* exclusions is a list of words that will not be extracted
  from a sentence. */
var exclusions = [
  'a', 'the', 'an', 'to', 'is', 'are', 'that', 'of', 'like', 'as',
  'this', 'also', 'from', 'into', 'can', 'for', 'or', 'and', 'on',
  'with', 'onto'
]

var keyCounter = 0

/**
 * SentenceContainer is the component that holds all
 * of the logic related to breaking down sentences
 */
class SentencesContainer extends Component {
  /* constructor */
  constructor (props) {
    super(props)

    var extractedSentences = this.prepSentences()

    this.state = {
      extractedSentences: extractedSentences,
      currentSentence: extractedSentences[0],
      currentIndex: 0
    }

    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.next = this.next.bind(this)
    this.reveal = this.reveal.bind(this)
    this.previous = this.previous.bind(this)
    this.restart = this.restart.bind(this)
  }

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
      completed: false // word !== attempt,
      extracted: true
    }
  */
  prepSentences () {
    return this.props.topic.sentences.map((sentence) => {
      // trim whitespace and remove all punctuation
      var words = sentence.toLowerCase().trim().match(/[^_\W]+/g).join(' ').split(' ')

      var wordsToExtract = this.getWordsToExtract(words, words.length)

      var extractedSentence = this.extractWordsFromSentences(words, wordsToExtract)

      return extractedSentence
    })
  }

  /*
    extractWordsFromSentences marks a word as extracted if it
    is in the wordsToExtract array.

    @returns an array of objects that represent the full sentence,
    one word at a time
  */
  extractWordsFromSentences (sentenceWords, wordsToExtract) {
    var extractedSentence = sentenceWords.map((word) => {
      keyCounter = keyCounter + 1

      if (wordsToExtract.includes(word)) {
        return {
          key: keyCounter,
          word: word,
          attempt: '',
          extracted: true,
          completed: false
        }
      } else {
        return {
          key: keyCounter,
          word: word,
          extracted: false
        }
      }
    })

    return extractedSentence
  }

  /*
    getWordsToExtract handles the process of finding 1-2
    words to remove from an array
  */
  getWordsToExtract (words, length) {
    var wordsToExtract = []

    var wordToExtract = this.getWordToExtract(words, wordsToExtract)
    wordsToExtract.push(wordToExtract)

    // repeat if length is long enough
    if (length > 5) {
      wordToExtract = this.getWordToExtract(words, wordsToExtract)
      wordsToExtract.push(wordToExtract)
    }

    return wordsToExtract
  }

  /*
    getWordToExtract handles the process of finding one
    word to remove from a given array of words
  */
  getWordToExtract (words, currentWordsToExtract) {
    var wordToExtract
    var excludedWords = []

    excludedWords.push(...exclusions)
    excludedWords.push(...currentWordsToExtract)

    words = this.getExtractableWords(words, excludedWords)
    wordToExtract = this.getRandomWordByIndex(words, words.length)

    return wordToExtract
  }

  /* getExtractableWords returns the set difference of
  two arrays of words
  */
  getExtractableWords (words, exclusionWords) {
    let wordsSet = new Set(words)
    let exclusionsSet = new Set(exclusionWords)
    let difference = new Set([...wordsSet].filter(x => !exclusionsSet.has(x)))
    return Array.from(difference)
  }

  /* getRandomWordByIndex finds one random word in an array
    to extract
  */
  getRandomWordByIndex (words, len) {
    var randomIndex = Math.floor(Math.random() * len)
    return words[randomIndex]
  }

  /* getRandomWordByIndex finds one random word in an array
    to extract
  */
  handleAnswerChange (e, index) {
    var input = e.target.value

    var newSentence = this.state.currentSentence.slice()
    var newExtractedSentences = this.state.extractedSentences.slice()

    newSentence[index].attempt = input

    if (input === newSentence[index].word) {
      newSentence[index].completed = true
    }

    newExtractedSentences[this.state.currentIndex] = newSentence

    this.setState({
      currentSentence: newSentence,
      extractedSentences: newExtractedSentences
    })
  }

  /* next moves to the next sentence */
  next () {
    if (this.state.currentIndex < this.state.extractedSentences.length - 1) {
      var newCurrentIndex = this.state.currentIndex + 1
      this.setState({
        currentIndex: newCurrentIndex,
        currentSentence: this.state.extractedSentences[newCurrentIndex]
      })
    }
  }

  /* next moves to the previous sentence */
  previous () {
    if (this.state.currentIndex > 0) {
      var newCurrentIndex = this.state.currentIndex - 1
      this.setState({
        currentIndex: newCurrentIndex,
        currentSentence: this.state.extractedSentences[newCurrentIndex]
      })
    }
  }

  /* restart reprepares the sentences and starts them at the beginning */
  restart () {
    var extractedSentences = this.prepSentences()

    this.setState({
      extractedSentences: extractedSentences,
      currentIndex: 0,
      currentSentence: extractedSentences[0]
    })
  }

  /* reveal completes the sentence */
  reveal () {
    var newSentence = this.state.currentSentence.map((word) => {
      word.completed = true
      word.attempt = word.word
      return word
    })

    this.setState({
      currentSentence: newSentence
    })
  }

  render () {
    return (
      <div className='SentencesContainer'>
        <div className='options top'>
          <button className='back' onClick={this.props.resetTopic}><FontAwesome name='chevron-left' /></button>
          <h2 className='topic'>{this.props.topic.name}</h2>
          <button className='empty' >.</button>
        </div>
        <Sentence
          onAnswerChange={this.handleAnswerChange}
          sentence={this.state.currentSentence}
          currentIndex={this.state.currentIndex}
        />

        <div className='options bottom'>
          <button onClick={this.previous}><FontAwesome name='arrow-left' /></button>
          <button onClick={this.restart}><FontAwesome name='repeat' /></button>
          <button onClick={this.reveal}><FontAwesome name='envelope-open' /></button>
          <button onClick={this.next}><FontAwesome name='arrow-right' /></button>
        </div>
      </div>
    )
  }
}

export default SentencesContainer
