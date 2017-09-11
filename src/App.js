import React, { Component } from 'react'
import './App.css'

import TopicPickerContainer from './containers/TopicPickerContainer'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header>
          <h1>Recall</h1>
          <button>Instructions</button>
        </header>
        <main className='container'>
          <TopicPickerContainer />
        </main>
        <footer>Made with &hearts; by Jessa</footer>
      </div>
    )
  }
}

export default App
