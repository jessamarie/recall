import React, { useState } from 'react';
import TopicList from '../components/TopicList';

import './TopicPickerContainer.scss';

/**
 * TopicList is the component that handles events related
 * to a user selecting a topic
 */
export default function TopicPickerContainer({ setTopic, topics }) {
  const [matchingTopics, setMatchingTopics] = useState([]);
  const [selectedID, setSelectedID] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  /* findMatchingTopics returns a list of topic names that
     the user input startsWith
  */
  function findMatchingTopics(input) {
    let matchingTopics = [];

    if (input !== '') {
      matchingTopics = topics.filter((topic) => {
        return topic.name.toLowerCase().startsWith(input.toLowerCase());
      });
    }

    return matchingTopics;
  }

  function handleInputChange(e) {
    const input = e.target.value;
    const matchingTopics = findMatchingTopics(input);
    setMatchingTopics(matchingTopics);
    setSelectedID(0);
    setSelectedIndex(-1);
  }

  /* matchingTopicsExist returns true if the matchingTopics
    array is not empty, o.w false
  */
  function matchingTopicsExist() {
    if (matchingTopics && matchingTopics.length > 0) {
      return true;
    }

    return false;
  }

  /* handleTopicSubmit returns the selected Topic
    to the App, to be passed on to the Sentences
    component for preparation.
  */
  function handleTopicSubmit(e) {
    e.preventDefault();

    // do nothing if the index is less than or greater than
    // the length of the current matchingTopics
    if (selectedIndex < 0 || selectedIndex > matchingTopics.length) {
      return;
    }

    setTopic(matchingTopics[selectedIndex]);
    setSelectedID(0);
    setSelectedIndex(-1);
  }

  /*
    handleTopicSelect changes the selectedID
    to the one that the user clicked
  */
  function handleTopicSelect(e, id, index) {
    setSelectedID(id);
    setSelectedIndex(index);
  }

  /*
    moveSelectionUp sets the selectedIndex and id
    to the previous one's in matchingTopics
  */
  function moveSelectionUp() {
    const newSelectedIndex = selectedIndex - 1;

    // prevent index out of bounds
    if (newSelectedIndex < 0) {
      return;
    }
    const newSelectedID = matchingTopics[newSelectedIndex].id;
    setSelectedIndex(newSelectedIndex);
    setSelectedID(newSelectedID);
  }

  /*
    moveSelectionDown sets the selectedIndex and id
    to the next one's in matchingTopics
  */
  function moveSelectionDown() {
    const newSelectedIndex = selectedIndex + 1;
    // prevent index out of bounds
    if (newSelectedIndex > matchingTopics.length - 1) {
      return;
    }
    const newSelectedID = matchingTopics[newSelectedIndex].id;

    setSelectedIndex(newSelectedIndex);
    setSelectedID(newSelectedID);
  }

  /*
    handleListTraversal handles the event where the
    user hits the down or up key
  */
  function handleListTraversal(e) {
    if (matchingTopicsExist()) {
      // if the keyCode is the 'UP' key
      if (e.keyCode === 38) {
        moveSelectionUp();
        // if the keyCode is the 'DOWN' key
      } else if (e.keyCode === 40) {
        moveSelectionDown();
      }
    }
  } // end handleKeyDown

  return (
    <div className='TopicPickerContainer'>
      <TopicList
        topics={matchingTopics}
        selectedIndex={selectedIndex}
        onInputChange={handleInputChange}
        onTopicSubmit={handleTopicSubmit}
        onTopicSelect={handleTopicSelect}
        onListTraversal={handleListTraversal}
      />
    </div>
  );
}
