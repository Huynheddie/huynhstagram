import React from 'react';
import { Card } from 'semantic-ui-react';
import CloudinaryContext from 'cloudinary-react/lib/components/CloudinaryContext';
import { Image as CImage } from 'cloudinary-react';
import Transformation from 'cloudinary-react/lib/components/Transformation';

const UserProfileHeaderImage = ({ user }) => (
  <div>
    {user && (
    <Card.Content style={{ textAlign: 'center', paddingTop: '10px' }}>
      <CloudinaryContext cloudName='huynhstagram'>
        <CImage publicId={user.profileImage}>
          <Transformation
            width='175'
            height='175'
            crop='thumb'
            radius='max'
            background='rgb:fafafa'
          />
        </CImage>
      </CloudinaryContext>
    </Card.Content>
    )}
  </div>
);

export default UserProfileHeaderImage;
