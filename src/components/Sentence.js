import React, { Component } from 'react'
import './Sentence.css'

/**
 * Sentence is the component that displays a sentences
 */
class Sentence extends Component {
  Sentence () {
    return this.props.sentence.map((word, index) => {
      if (word.extracted) {
        return (
          <input
            className='word'
            onChange={(e) => this.props.onAnswerChange(e, index)}
            key={index} />
        )
      }
      return (
        <span key={index}>{word.word} </span>
      )
    })
  }

  render () {
    var sentence = this.Sentence()
    return (
      <div>
        <p>{sentence}</p>
      </div>
    )
  }
}

export default Sentence
