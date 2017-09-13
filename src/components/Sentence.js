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

        var key = index * this.props.currentIndex

        return (
          <input
            className={word.completed ? 'correct' : ''}
            style={style}
            onChange={(e) => this.props.onAnswerChange(e, index)}
            key={key} />
        )
      }

      return (
        <span key={index}>{word.word}</span>
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
