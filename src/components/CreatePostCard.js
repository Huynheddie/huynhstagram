import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'semantic-ui-react';
import postService from '../services/posts';

const CreatePostCard = ({ handleNewPost }) => {
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName && content) {
      const response = await postService.createPost({ userName, date: new Date(), content });
      if (response) {
        handleNewPost(response);
      }
    }
  };

  return (
    <Card centered>
      <Card.Content>
        <h2>Create a post</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label htmlFor='username-input'>Username</label>
            <Input id='username-input' placeholder='ex. spagheddie' value={userName} onChange={handleUserNameChange} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='content-input'>Content</label>
            <Input id='content-input' placeholder='ex. is incredible' value={content} onChange={handleContentChange} />
          </Form.Field>
          <Button color='instagram' type='submit'>Submit</Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default CreatePostCard;
