import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const ZeroPosts = ({ pageLoading }) => (
  <>
    { !pageLoading && (
    <Card centered className='zero-posts'>
      <Card.Content style={{ textAlign: 'center' }}>
        <h3>
          Follow others to get your feed started!
        </h3>
        <h4>or</h4>
        <h3>
          Create your own posts by clicking on <Icon style={{ marginRight: '0px' }} name='plus square outline' />
        </h3>
      </Card.Content>
    </Card>
    )}
  </>
);

export default ZeroPosts;
