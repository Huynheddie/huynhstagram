import React from 'react';
import CloudinaryContext from 'cloudinary-react/lib/components/CloudinaryContext';
import Image from 'cloudinary-react/lib/components/Image';
import Transformation from 'cloudinary-react/lib/components/Transformation';
import { Link } from 'react-router-dom';

const UserThumbnail = ({ userId, profileImage, width, height, color, handleCloseModal }) => (
  <>
    <CloudinaryContext cloudName='huynhstagram'>
      <Link to={`/user/${userId}`} onClick={handleCloseModal || null}>
        <Image publicId={profileImage} className='comment-profile-image'>
          <Transformation
            width={width || '30'}
            height={height || '30'}
            crop='thumb'
            radius='max'
            background={color ? `rgb:${color}` : 'rgb:fafafa'}
          />
        </Image>
      </Link>
    </CloudinaryContext>
  </>
);
export default UserThumbnail;
