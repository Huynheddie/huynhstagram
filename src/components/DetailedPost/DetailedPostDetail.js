import React from 'react';
import { Card } from 'semantic-ui-react';
import dateFormatter from '../../utils/dateFormatter';

const DetailedPostDetail = ({ post }) => (
  <Card.Content className='detailed-post-details'>
    <Card.Header className='post-subheader' style={{ marginBottom: '5px' }}>{post.likes.length} likes</Card.Header>
    <Card.Meta>
      {dateFormatter.timeSince(post.date)} ago
    </Card.Meta>
  </Card.Content>
);

export default DetailedPostDetail;
