import React, { Component } from 'react'
import TopicList from '../components/TopicList'

import './TopicPickerContainer.css'
import axios from 'axios'

/**
 * TopicList is the component that handles events related
 * to a user selecting a topic
 */
class TopicPickerContainer extends Component {
  constructor () {
    super()
    this.state = {
      topics: [],
      matchingTopics: [],
      /* stores the id of the currently selected topic in the dropdown */
      selectedID: 0, // no id can be 0
      /* stores the index of the currently selected topic in the dropdown */
      selectedIndex: -1
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleTopicSubmit = this.handleTopicSubmit.bind(this)
    this.handleTopicSelect = this.handleTopicSelect.bind(this)
    this.handleListTraversal = this.handleListTraversal.bind(this)
  }

  /* This will call the api to get all the topic data */
  componentDidMount () {
    axios.get('http://localhost:4000/api/topics').then((response) => {
      console.log(response.data)
      this.setState({
        topics: response.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  /* findMatchingTopics returns a list of topic names that
     the user input startsWith
  */
  findMatchingTopics (input) {
    var topics = []

    if (input !== '') {
      topics = this.state.topics.filter((topic) => {
        console.log(input, topic.name)
        return topic.name.toLowerCase().startsWith(input.toLowerCase())
      })
    }

    return topics
  }

  handleInputChange (e) {
    var input = e.target.value
    var topics = this.findMatchingTopics(input)
    this.setState({
      matchingTopics: topics,
      selectedID: 0,
      selectedIndex: -1
    })
  }

  /* matchingTopicsExist returns true if the matchingTopics
    array is not empty, o.w false
  */
  matchingTopicsExist () {
    if (this.state.matchingTopics && this.state.matchingTopics.length > 0) {
      return true
    }

    return false
  }

  /* handleTopicSubmit returns the selected Topic
    to the App, to be passed on to the Sentences
    component for preparation.
  */
  handleTopicSubmit (e) {
    e.preventDefault()

    // do nothing if the index is less than or greater than
    // the length of the current matchingTopics
    if (this.state.selectedIndex < 0 || this.state.selectedIndex > this.state.matchingTopics.length) { return }

    this.props.setTopic(this.state.matchingTopics[this.state.selectedIndex])
    this.setState({
      selectedID: 0,
      selectedIndex: -1
    })
  }

  /*
    handleTopicSelect changes the selectedID
    to the one that the user clicked
  */
  handleTopicSelect (e, id, index) {
    this.setState({
      selectedID: id,
      selectedIndex: index
    })
  }

  /*
    moveSelectionUp sets the selectedIndex and id
    to the previous one's in matchingTopics
  */
  moveSelectionUp () {
    var newSelectedIndex = this.state.selectedIndex - 1

    // prevent index out of bounds
    if (newSelectedIndex < 0) { return }
    var newSelectedID = this.state.matchingTopics[newSelectedIndex].id

    this.setState({
      selectedIndex: newSelectedIndex,
      selectedID: newSelectedID
    })
  }

  /*
    moveSelectionDown sets the selectedIndex and id
    to the next one's in matchingTopics
  */
  moveSelectionDown () {
    var newSelectedIndex = this.state.selectedIndex + 1
    // prevent index out of bounds
    if (newSelectedIndex > this.state.matchingTopics.length - 1) { return }
    var newSelectedID = this.state.matchingTopics[newSelectedIndex].id

    this.setState({
      selectedIndex: newSelectedIndex,
      selectedID: newSelectedID
    })
  }

  /*
    handleListTraversal handles the event where the
    user hits the down or up key
  */
  handleListTraversal (e) {
    if (this.matchingTopicsExist()) {
      // if the keyCode is the 'UP' key
      if (e.keyCode === 38) {
        this.moveSelectionUp()
      // if the keyCode is the 'DOWN' key
      } else if (e.keyCode === 40) {
        this.moveSelectionDown()
      }
    }
  } // end handleKeyDown

  render () {
    return (
      <div className='TopicPickerContainer'>
        <TopicList
          topics={this.state.matchingTopics}
          selectedIndex={this.state.selectedIndex}
          onInputChange={this.handleInputChange}
          onTopicSubmit={this.handleTopicSubmit}
          onTopicSelect={this.handleTopicSelect}
          onListTraversal={this.handleListTraversal}
        />
      </div>
    )
  }
}

export default TopicPickerContainer
