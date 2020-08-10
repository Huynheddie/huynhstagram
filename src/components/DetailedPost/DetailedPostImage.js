import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import Image from 'cloudinary-react/lib/components/Image';

const DetailedPostImage = ({ post }) => (
  <Grid.Column width='8' id='detailed-post-image-column'>
    <Card fluid className='detailed-post-image-card'>
      <Card.Content className='detailed-post-image-content'>
        <Image cloudName='huynhstagram' publicId={post.imageId} className='detailed-post-image' />
      </Card.Content>
    </Card>
  </Grid.Column>
);

export default DetailedPostImage;
