import React from 'react';
import { Card } from 'semantic-ui-react';

const ZeroPosts = ({ pageLoading }) => (
  <>
    { !pageLoading && (
    <Card centered className='zero-posts'>
      <Card.Content>
        <h3 style={{ textAlign: 'center' }}>
          Follow other users to get your feed started!
        </h3>
      </Card.Content>
    </Card>
    )}
  </>
);

export default ZeroPosts;
