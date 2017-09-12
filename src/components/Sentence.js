import React, { Component } from 'react'
import './Sentence.css'

/**
 * Sentence is the component that displays a sentences
 */
class Sentence extends Component {

  Sentence () {
    return this.props.sentence.split(' ').map((word, index) => {
      if (this.props.words.includes(word)) {
        return (
          <input className='word' key={index} />
        )
      }
      return (
        <span key={index}>{word} </span>
      )
    })
  }

  render () {
    var sentence = this.Sentence()
    return (
      <div>
        <p>{sentence}</p>
        <p>{this.props.words[0]}</p>
      </div>
    )
  }
}

export default Sentence
