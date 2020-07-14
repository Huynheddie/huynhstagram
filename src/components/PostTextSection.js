import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import Image from 'cloudinary-react/lib/components/Image';
import CloudinaryContext from 'cloudinary-react/lib/components/CloudinaryContext';
import Transformation from 'cloudinary-react/lib/components/Transformation';
import dateFormatter from '../utils/dateFormatter';
import postService from '../services/posts';

const PostTextSection = ({ post, detailedPage, handleEditPost }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  const handleCommentLike = async (postId, comment, likes, commentIndex) => {
    let newLikes = [];
    if (likes.findIndex((user) => user === loggedInUser.username) === -1) {
      likes.push(loggedInUser.username);
      newLikes = likes;
    } else {
      newLikes = likes.filter((user) => user !== loggedInUser.username);
    }
    const newComment = { ...comment, likes: newLikes };
    const newComments = post.comments;
    newComments[commentIndex] = newComment;

    const response = await postService.patchPost(postId, { comments: newComments });
    console.log(response);
    if (response) {
      handleEditPost(postId, response);
    }
  };

  return (
    <Card.Content className='detailed-comment-content' style={{ borderTop: 'none' }}>

      <div style={{ display: 'grid' }}>
        { detailedPage && (
        <div className='detailed-comment-text'>
          <CloudinaryContext cloudName='huynhstagram'>
            <Image publicId={post.user.profileImage} className='comment-profile-image'>
              <Transformation
                width='30'
                height='30'
                crop='thumb'
                radius='max'
              />
            </Image>
          </CloudinaryContext>
          <Card.Header className='post-subheader'>{post.user.username}</Card.Header>
          <Card.Description className='post-content'>
            {post.content}
          </Card.Description>
          <div style={{ flexBasis: '100%', height: '0' }}></div>

          <Card.Meta className='detailed-comment-time'>{dateFormatter.timeSinceCondensed(post.date)}</Card.Meta>
        </div>
        )}

        {post.comments.map((comment, index) => (
          <div key={index} className='detailed-comment-text'>
            <CloudinaryContext cloudName='huynhstagram'>
              <Image publicId={comment.profileImage} className='comment-profile-image'>
                <Transformation
                  width='30'
                  height='30'
                  crop='thumb'
                  radius='max'
                />
              </Image>
            </CloudinaryContext>
            <Card.Content key={index + comment.username} style={{ fontWeight: '700' }}> {comment.username}</Card.Content>
            <Card.Content key={index + comment.comment} style={{ marginLeft: '5px' }}>{comment.comment}</Card.Content>
            {comment.likes.findIndex((user) => user === loggedInUser.username) === -1
              ? <Icon onClick={() => handleCommentLike(post.id, comment, comment.likes, index)} name='heart outline' color='grey' className='comment-like-icon' />
              : <Icon onClick={() => handleCommentLike(post.id, comment, comment.likes, index)} name='heart' color='red' className='comment-like-icon' />}
            <div style={{ flexBasis: '100%', height: '0' }}></div>
            { detailedPage
            && (
              <>
                <Card.Meta key={index + comment.date.toString()} className='detailed-comment-time'>{dateFormatter.timeSinceCondensed(comment.date)}</Card.Meta>
                {comment.likes.length > 0
                && <Card.Content style={{ fontSize: '12px', paddingLeft: '10px', color: '#8e8e8e', fontWeight: '600' }} key={index}>{comment.likes.length} likes</Card.Content>}
              </>
            )}
          </div>
        ))}
      </div>

    </Card.Content>
  );
};

export default PostTextSection;
