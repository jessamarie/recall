import React, { Component } from 'react'
import './SentencesContainer.css'

import Sentence from '../components/Sentence'

/**
 * SentenceContainer is the component that holds all
 * of the logic related to breaking down sentences
 */
class SentencesContainer extends Component {

  render () {
    console.log('In sentence container', this.props.topic)
    return (
      <div onClick={this.props.resetTopic}>
        <Sentence />
      </div>
    )
  }
}

export default SentencesContainer
