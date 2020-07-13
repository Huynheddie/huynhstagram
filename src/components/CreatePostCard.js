import React, { useState, useRef } from 'react';
import { Card, Form, Input, Button, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import postService from '../services/posts';

const CreatePost = ({ handleNewPost }) => {
  const [content, setContent] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const fileInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content && selectedFile) {
      setIsLoading(true);
      const response = await postService.createPost({ date: new Date(), content }, selectedFile);
      handleNewPost(response);
      history.push('/');
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      previewFile(file);
    }
  };

  return (
    <Card centered>
      <Card.Content>
        <h2>Create a post</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label htmlFor='content-input'>Content</label>
            <Input id='content-input' placeholder='ex. is incredible' value={content} onChange={({ target }) => setContent(target.value)} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='image-input'>Image</label>
            <Button
              content='Upload'
              labelPosition='left'
              icon='upload'
              fluid
              onClick={() => fileInputRef.current.click()}
            />
            <input ref={fileInputRef} hidden type='file' onChange={handleFileInputChange} />
          </Form.Field>
          { previewSource && (
            <Card>
              <Image src={previewSource} />
            </Card>
          )}
          { selectedFile && <Button color='instagram' style={{ float: 'right' }} loading={isLoading} type='submit'>Submit</Button>}
        </Form>
      </Card.Content>
    </Card>
  );
};

export default CreatePost;
