import React from 'react';

const Notification = ({ message }) => {
  const styles = {
    color: message.errorCode === 1 ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginNBottom: '10px',
  };

  if (!message.message) {
    return null;
  }

  return <div style={styles}>{message.message}</div>;
};

export default Notification;
