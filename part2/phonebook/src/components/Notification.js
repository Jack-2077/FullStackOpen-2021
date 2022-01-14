import React from 'react';

const styles = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginNBottom: '10px',
};
const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  return <div style={styles}>{message}</div>;
};

export default Notification;
