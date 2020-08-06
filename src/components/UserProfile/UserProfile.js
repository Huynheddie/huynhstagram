import React, { useState, useEffect } from 'react';
import Image from 'cloudinary-react/lib/components/Image';
import CloudinaryContext from 'cloudinary-react/lib/components/CloudinaryContext';
import Transformation from 'cloudinary-react/lib/components/Transformation';
import { Link, useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import userService from '../../services/user';
import UserProfileHeader from './UserProfileHeader';
import postService from '../../services/posts';

const UserProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const findUser = async () => {
      const response = await userService.getUser(id);
      setUser(response);
    };

    const getUserPosts = async () => {
      const response = await postService.getPostsByUser(id);
      setUserPosts(response);
    };

    findUser();
    getUserPosts();
  }, [id]);

  useEffect(() => {
    if (user) { console.log('User:', user); }
  }, [user]);

  useEffect(() => {
    if (userPosts.length > 0) {
      console.log('User Posts: ', userPosts);
    }
  }, [userPosts]);

  return (
    <>
      { user
      && (
      <>
        <UserProfileHeader user={user} userPosts={userPosts} setUser={setUser} />

        <div className='user-profile-posts-section'>
          { userPosts.length > 0 && userPosts.map((post) => (
            <div key={post.id} style={{ marginBottom: '25px' }} className='user-profile-post-overlay'>
              <Link to={`/post/${post.id}`}>

                <CloudinaryContext cloudName='huynhstagram'>
                  <Image publicId={post.imageId}>
                    <Transformation
                      width='293'
                      height='293'
                      crop='thumb'
                    />
                  </Image>
                </CloudinaryContext>

                <div className='user-profile-overlay-icons'>
                  <Icon name='heart' size='large' />
                  <div className='post-overlay-text'>
                    {post.likes.length}
                  </div>
                  <Icon style={{ marginLeft: '40px' }} name='comment' size='large' />
                  <div className='post-overlay-text'>
                    {post.comments.length}
                  </div>
                </div>

              </Link>
            </div>
          )) }
        </div>

      </>
      )}

    </>
  );
};

export default UserProfile;
