import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.scss';

import TopicPickerContainer from './containers/TopicPickerContainer';
import SentencesContainer from './containers/SentencesContainer';

/**
 * App is the component that holds the entire application
 */
export default function App() {
  const [selectedTopic, setTopic] = useState({});
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get('https://recall-api.onrender.com/api/topics')
      .then((response) => {
        setTopics(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /*
    resetTopic is called by SentencesContainer to reset a topic
   */
  function resetTopic() {
    setTopic({});
  }

  /* isEmpty checks if an object is empty */
  function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /*
    Container returns the proper container based on the
    value of selectedTopic
  */
  function getContainer() {
    if (!isEmpty(selectedTopic)) {
      return (
        <SentencesContainer resetTopic={resetTopic} topic={selectedTopic} />
      );
    } else {
      return <TopicPickerContainer setTopic={setTopic} topics={topics} />;
    }
  }

  return (
    <div className='App'>
      <header>
        {/* <div className='instructions'><FontAwesome name='question-circle' /></div> */}
        <h1>Recall</h1>
      </header>
      <main>
        <div className='container'>
          <div className='flashcard'>{getContainer()}</div>
        </div>
      </main>
      <footer>Made with &hearts; by Jessa</footer>
    </div>
  );
}
