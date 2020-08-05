import React from 'react';
import { Card } from 'semantic-ui-react';

const ZeroPosts = ({ pageLoading }) => (
  <>
    { !pageLoading && (
    <Card centered className='zero-posts'>
      <Card.Content>
        Follow other users to get your feed started!
      </Card.Content>
    </Card>
    )}
  </>
);

export default ZeroPosts;
