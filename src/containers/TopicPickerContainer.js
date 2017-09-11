import React, { Component } from 'react'
import TopicList from '../components/TopicList'

class TopicPickerContainer extends Component {
  render () {
    return (
      <div className='topic-container'>TopicPickerContainer
        <TopicList />
      </div>
    )
  }
}

export default TopicPickerContainer
