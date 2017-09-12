import React, { Component } from 'react'
import './SentencesContainer.css'

import Sentence from '../components/Sentence'

/* exclusions is a list of words that will not be stripped
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
    this.state = {
      strippedSentences: this.prepareSentences(),
      currentSentence: 0
    }
  }

  /* prepareSentences strips each sentence of 1-2 words
     and returns an array of objects like so:
     obj = {
      sentence: 'original sentence'
      strippedWords: ['word1', 'word2']
    }
  */
  prepareSentences () {
    return this.props.topic.sentences.map((sentence) => {
      var words = sentence.toLowerCase().trim().split(' ')

      words = this.removeWords(words, exclusions)
      words = this.stripWords(words)

      return {
        sentence: sentence,
        strippedWords: words
      }
    })
  }

  /* stripSentence returns an array of one or two random
  elements from the words array passed in
  */
  stripWords (words) {
    var len = words.length
    var strippedWords = []

    strippedWords.push(this.stripWord(words, len))
    words = this.removeWords(words, strippedWords)

    if (len > 5) {
      len = words.length
      strippedWords.push(this.stripWord(words, len))
    }

    return strippedWords
  }

  /* strip word finds one random word in an array
    to strip
  */
  stripWord (words, len) {
    var randomIndex = Math.floor(Math.random() * len)
    return words[randomIndex]
  }

  /* removeWords returns the set difference of
  two arrays of words
  */
  removeWords (words, exclusionWords) {
    let wordsSet = new Set(words)
    let exclusionsSet = new Set(exclusionWords)
    let difference = new Set([...wordsSet].filter(x => !exclusionsSet.has(x)))
    return Array.from(difference)
  }

  render () {
    return (
      <div>
        <Sentence sentence={this.state.strippedSentences[0].sentence}
          words={this.state.strippedSentences[0].strippedWords}
        />
        <button onClick={this.props.resetTopic}>Reset</button>
        <button onClick={this.props.resetTopic}>Resart</button>
        <button onClick={this.props.resetTopic}>Skip</button>
      </div>
    )
  }
}

export default SentencesContainer
