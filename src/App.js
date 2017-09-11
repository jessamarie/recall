import React, { Component } from 'react'
import './App.css'

import TopicPickerContainer from './containers/TopicPickerContainer'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header>
          <h1>Recall</h1>
          <button className='instructions'>Instructions</button>
        </header>
        <main>
          <div className='container'>
            <div className='flashcard'>
              <TopicPickerContainer />
            </div>
          </div>
        </main>
        <footer>Made with &hearts; by Jessa</footer>
      </div>
    )
  }
}

export default App
