import React from 'react';
import { Message, Grid } from 'semantic-ui-react';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <Grid centered style={{ paddingTop: '1.5rem', marginBottom: '1rem' }}>
      <Message
        color='red'
        size='large'
        style={{ maxWidth: '60%' }}
      >
        <Message.Header>Error</Message.Header>
        <Message.Content>
          {message}
        </Message.Content>
      </Message>
    </Grid>
  );
};

export default Notification;
