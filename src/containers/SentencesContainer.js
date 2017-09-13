import React, { Component } from 'react'
import './SentencesContainer.css'

import Sentence from '../components/Sentence'

/* exclusions is a list of words that will not be extracted
  from a sentence. */
var exclusions = [
  'a', 'the', 'an', 'to', 'is', 'are', 'that', 'of', 'like', 'as',
  'this', 'also', 'from', 'into', 'can', 'for', 'or', 'and', 'on',
  'with', 'onto'
]

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
    this.previous = this.previous.bind(this)
  }

  /* prepSentences extracts each sentence of 1-2 words
     and returns an array of objects like so:
     obj = {
      sentence: 'original sentence'
      extractedWords: ['word1', 'word2']
    }
  */
  prepSentences () {
    return this.props.topic.sentences.map((sentence) => {
      var words = sentence.toLowerCase().trim().split(' ')

      var wordsToExtract = this.getWordsToExtract(words, words.length)

      var extractedSentence = this.extractWordsFromSentences(words, wordsToExtract)
      // console.log(extractedSentence)

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
      if (wordsToExtract.includes(word)) {
        return {
          word: word,
          attempt: '',
          extracted: true,
          completed: false
        }
      } else {
        return {
          word: word,
          attempt: word,
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
    this.state.currentSentence[index].attempt = input

    if (input === this.state.currentSentence[index].word) {
      this.state.currentSentence[index].completed = true
    }

    this.state.extractedSentences[this.state.currentIndex] = this.state.currentSentence
    console.log('new sentence', this.state.extractedSentences[this.state.currentIndex])

    this.setState({
      currentSentence: this.state.currentSentence,
      extractedSentences: this.state.extractedSentences
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

  render () {
    return (
      <div>
        <Sentence
          onAnswerChange={this.handleAnswerChange}
          sentence={this.state.currentSentence}
        />
        <button onClick={this.props.resetTopic}>New Topic</button>
        <button onClick={this.props.resetTopic}>Resart</button>
        <button onClick={this.previous}>Previous</button>
        <button onClick={this.next}>Next</button>

      </div>
    )
  }
}

export default SentencesContainer
