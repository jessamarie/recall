import React, { Component } from 'react'
import TopicList from '../components/TopicList'

import './TopicPickerContainer.css'
import topicsData from '../data/topic-data.json'

class TopicPickerContainer extends Component {

  constructor () {
    super()
    this.state = {
      topics: new Array(topicsData),
      matchingTopics: []
    }

    this.getMatchingTopics = this.getMatchingTopics.bind(this)
  }

  getMatchingTopics (e) {
    var input = e.target.value
    var topics = []

    if (input !== '') {
      topics = topicsData.filter((topic) => {
        return topic.name.startsWith(e.target.value)
      })
    }

    this.setState({
      matchingTopics: topics
    })
  }

  render () {
    return (
      <div className='TopicPickerContainer'>
        <TopicList topics={this.state.matchingTopics} onInputChange={this.getMatchingTopics} />
      </div>
    )
  }
}

export default TopicPickerContainer
