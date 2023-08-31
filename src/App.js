import React, { Component } from 'react';

import './App.scss';

import TopicPickerContainer from './containers/TopicPickerContainer';
import SentencesContainer from './containers/SentencesContainer';

/**
 * App is the component that holds the entire application
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedTopic: {}
    };

    this.setTopic = this.setTopic.bind(this);
    this.resetTopic = this.resetTopic.bind(this);
  }

  /*
    setTopic is called by TopicPickerContainer when a user
    has submitted a topic
   */
  setTopic(topic) {
    this.setState({
      selectedTopic: topic
    });
  }

  /*
    resetTopic is called by SentencesContainer to reset a topic
   */
  resetTopic(e) {
    this.setState({
      selectedTopic: {}
    });
  }

  /* isEmpty checks if an object is empty */
  isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /*
    Container returns the proper container based on the
    value of selectedTopic
  */
  Container() {
    if (!this.isEmpty(this.state.selectedTopic)) {
      return (
        <SentencesContainer
          resetTopic={this.resetTopic}
          topic={this.state.selectedTopic}
        />
      );
    } else {
      return <TopicPickerContainer setTopic={this.setTopic} />;
    }
  }

  render() {
    var container = this.Container();

    return (
      <div className='App'>
        <header>
          {/* <div className='instructions'><FontAwesome name='question-circle' /></div> */}
          <h1>Recall</h1>
        </header>
        <main>
          <div className='container'>
            <div className='flashcard'>{container}</div>
          </div>
        </main>
        <footer>Made with &hearts; by Jessa</footer>
      </div>
    );
  }
}

export default App;
