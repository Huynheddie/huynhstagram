import React from 'react';
import { Card } from 'semantic-ui-react';
// import dateFormatter from '../utils/dateFormatter';

const PostTextSection = ({ post }) => (
  <Card.Content style={{ borderTop: 'none', paddingTop: '5px', paddingBottom: '0', flexGrow: '1' }}>

    {/* <Card.Header className='post-subheader' style={{ marginBottom: '1em' }}>{post.likes.length} likes</Card.Header> */}

    <div style={{ display: 'grid' }}>
      <div style={{ display: 'inline-flex' }}>
        <Card.Header className='post-subheader'>{post.user.username}</Card.Header>
        <Card.Description className='post-content' style={{ marginLeft: '5px', marginBottom: '.5em' }}>
          {post.content}
        </Card.Description>
      </div>

      {post.comments.map((comment) => (
        <div key={comment._id} style={{ display: 'inline-flex' }}>
          <p style={{ fontWeight: '700' }}> {comment.username}</p>
          <p style={{ marginLeft: '5px' }}>{comment.comment}</p>
        </div>
      ))}
    </div>

    {/* <Card.Meta>
      {dateFormatter.timeSince(post.date)} ago
    </Card.Meta> */}

  </Card.Content>
);

export default PostTextSection;
