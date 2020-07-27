import React from 'react';
import CloudinaryContext from 'cloudinary-react/lib/components/CloudinaryContext';
import Image from 'cloudinary-react/lib/components/Image';
import Transformation from 'cloudinary-react/lib/components/Transformation';

const UserThumbnail = ({ profileImage, width, height }) => (
  <>
    <CloudinaryContext cloudName='huynhstagram'>
      <Image publicId={profileImage} className='comment-profile-image'>
        <Transformation
          width={width || '30'}
          height={height || '30'}
          crop='thumb'
          radius='max'
          background='rgb:fafafa'
        />
      </Image>
    </CloudinaryContext>
  </>
);
export default UserThumbnail;
