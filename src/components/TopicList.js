import React, { Component } from 'react'
import './TopicList.css'

const topics = ['Biology', 'Math', 'Music']

class TopicList extends Component {

  /* getCorrespondingTopics fills the autocomplete dropdown
    with topics that match the input data
   */
  getCorrespondingTopics (e) {

  }

  // use JS to listen for the input change event
  // run a function whenever that fires
  // delivering the current contents to your code as a variable.
  // This function would use that variable to search your list and create a subset,
  // then iterate through the subset and create a series of elements.
  // You can use CSS to heavily style a ul so that it doesn't resemble a list at all,
  //  and position it immediately under your input so that it appears to be a dropdown.
  // The ul is useful because it can handle positioning its children.
  //  These children can be anything you want. Buttons, anchors, other form elements, whatever.
  render () {
    var topicList = this.props.topics.map((topic) => {
      return (
        <li key={topic.id}>{topic.name}</li>
      )
    })
    return (
      <form className='TopicList'>
        <input list='topics' onChange={this.props.onInputChange} placeholder='Enter a topic (e.g Biology, Math, etc)' />
        <ul>
          {topicList}
        </ul>
      </form>
    )
  }
}

export default TopicList
