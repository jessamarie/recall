import React, { Component } from 'react'
import './Sentence.css'

/**
 * Sentence is the component that displays a sentences
 */
class Sentence extends Component {
  Sentence () {
    var sentence = this.props.sentence

    return sentence.map((word, index) => {
      if (word.extracted) {
        var style = {
          width: `${word.word.length * 2.3}vmax`
        }

        var className = ''

        if (word.correct === true) {
          className = 'correct'
        } else if (word.correct === false) {
          className = 'incorrect'
        }

        return (
          <input
            className={className}
            style={style}
            onChange={(e) => this.props.onAnswerChange(e, index)}
            value={word.attempt}
            key={word.key}
            disabled={word.correct} />
        )
      }

      return (
        <span key={word.key}>{word.word}</span>
      )
    })
  }

  render () {
    var sentence = this.Sentence()
    return (
      <div className='Sentence'>
        <p>{sentence}.</p>
      </div>
    )
  }
}

export default Sentence
