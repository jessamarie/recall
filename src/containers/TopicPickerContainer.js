import React, { Component } from 'react'
import TopicList from '../components/TopicList'

import './TopicPickerContainer.css'
import topicData from '../data/topic-data.json'

class TopicPickerContainer extends Component {

  constructor () {
    super()
    this.state = {
      topicData: topicData,
      matchingTopics: []
    }
  }

  getMatchingTopics() {
    
  }

  render () {
    return (
      <div className='TopicPickerContainer'>
        <TopicList />
      </div>
    )
  }
}

export default TopicPickerContainer
