import React from 'react';
import { Card } from 'semantic-ui-react';
import CloudinaryContext from 'cloudinary-react/lib/components/CloudinaryContext';
import { Image as CImage } from 'cloudinary-react';
import Transformation from 'cloudinary-react/lib/components/Transformation';

const UserProfileHeader = ({ user }) => (
  <div>
    {user && (
    <Card.Content style={{ textAlign: 'center', paddingTop: '10px' }}>
      <CloudinaryContext cloudName='huynhstagram'>
        <CImage publicId={user.profileImage}>
          <Transformation
            width='200'
            height='200'
            crop='thumb'
            radius='max'
          />
        </CImage>
      </CloudinaryContext>
      <h1 style={{ marginTop: '0' }}>{user.username}</h1>
    </Card.Content>
    )}
  </div>
);

export default UserProfileHeader;
