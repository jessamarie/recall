import React from 'react';
import './TopicList.scss';

/**
 * TopicList is the component that displays a list of topics
 */
export default function TopicList({
  topics,
  selectedIndex,
  onTopicSelect,
  onTopicSubmit,
  onInputChange,
  onListTraversal
}) {
  /*
    ListItems fills the dropdown with topics that match the
    input data
  */
  function getListItems() {
    if (topics && topics.length > 0) {
      return topics.map((topic, index) => {
        return (
          <li
            key={index}
            className={selectedIndex === index ? 'selected' : ''}
            onClick={(e) => onClick(e, topic.id, index)}
          >
            {topic.name}
          </li>
        );
      });
    }

    return null;
  }

  function onClick(e, id, index) {
    e.preventDefault();
    onTopicSelect(e, id, index);
    onTopicSubmit(e);
  }

  const listItems = getListItems();
  const list = listItems ? <ul> {listItems} </ul> : null;

  return (
    <form className='TopicList' onSubmit={onTopicSubmit}>
      <div className='input-wrapper'>
        <input
          list='topics'
          onChange={onInputChange}
          onKeyDown={onListTraversal}
          placeholder='Enter a topic (e.g. Web)'
        />
        {/* <span className="autocomplete"></span> */}
      </div>
      <div className='list-wrapper'>{list}</div>
    </form>
  );
}
