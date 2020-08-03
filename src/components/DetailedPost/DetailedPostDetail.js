import React from 'react';
import { Card } from 'semantic-ui-react';
import dateFormatter from '../../utils/dateFormatter';

const DetailedPostDetail = ({ post, handleOpenLikes }) => (
  <Card.Content className='detailed-post-details'>
    <Card.Header
      className='post-subheader'
      onClick={() => handleOpenLikes(post.likes)}
      style={{ marginBottom: '5px', cursor: 'pointer' }}
    >{post.likes.length} likes
    </Card.Header>
    <Card.Meta>
      {dateFormatter.timeSince(post.date)} ago
    </Card.Meta>
  </Card.Content>
);

export default DetailedPostDetail;
