import React, { Component } from 'react'
import './App.css'

import TopicPickerContainer from './containers/TopicPickerContainer'

/**
 * App is the component that holds the entire application
 */
class App extends Component {
  constructor () {
    super()
    this.state = {
      selectedTopic: {}
    }

    this.setTopic = this.setTopic.bind(this)
  }

  /*
    setTopic is called by TopicPickerContainer when a user
    has submitted a topic
   */
  setTopic (topic) {
    console.log('setting topic to', topic)
    this.setState({
      selectedTopic: topic
    })
  }

  /* isEmpty checks if an object is empty */
  isEmpty (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  /*
    Container returns the proper container based on the
    value of selectedTopic
  */
  Container () {
    if (!this.isEmpty(this.state.selectedTopic)) {
      console.log('empty')
    } else {
      return (
        <TopicPickerContainer setTopic={this.setTopic} />
      )
    }
  }

  render () {
    var container = this.Container()

    return (
      <div className='App'>
        <header>
          <h1>Recall</h1>
          <button className='instructions'>Instructions</button>
        </header>
        <main>
          <div className='container'>
            <div className='flashcard'>
              {container}
            </div>
          </div>
        </main>
        <footer>Made with &hearts; by Jessa</footer>
      </div>
    )
  }
}

export default App
