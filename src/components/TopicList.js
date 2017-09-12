import React, { Component } from 'react'
import './TopicList.css'

/**
 * TopicList is the component that displays a list of topics
 */
class TopicList extends Component {
  /*
    ListItems fills the dropdown with topics that match the
    input data
  */
  ListItems () {
    if (this.props.topics && this.props.topics.length > 0) {
      return this.props.topics.map((topic, index) => {
        return (
          <li key={index}
            className={this.props.selectedIndex === index ? 'selected' : ''}
            onClick={(e) => this.props.onTopicSelect(e, topic.id, index)}>{topic.name}</li>
        )
      })
    }

    return null
  }

  render () {
    var listItems = this.ListItems()
    var list = listItems ? (<ul> {listItems} </ul>) : null

    return (
      <form className='TopicList' onSubmit={this.props.onTopicSubmit}>
        <div className='input-wrapper'>
          <input list='topics'
            onChange={this.props.onInputChange}
            onKeyDown={this.props.onListTraversal}
            placeholder='Enter a topic (e.g. Math)' />
          {/* <span className="autocomplete"></span> */}
        </div>
        {list}
      </form>
    )
  }
}

export default TopicList
