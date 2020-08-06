import React, { useState, useRef } from 'react';
import { Card, Form, Image, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import userService from '../../services/user';

const UpdateProfilePicture = ({ handleCloseModal }) => {
  const history = useHistory();
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const fileInputRef = useRef();

  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      setIsLoading(true);
      await userService.updateProfileImage(loggedInUser.id, selectedFile);
      history.go();
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
    <Card.Content>
      <h2 style={{ marginBottom: '10px' }}>Upload New Profile Picture</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field error>
          { previewSource && (
          <Card fluid>
            <Image fluid src={previewSource} />
          </Card>
          )}
          <Button
            content='Upload'
            labelPosition='left'
            icon='upload'
            fluid
            onClick={() => fileInputRef.current.click()}
            type='button'
            disabled={isLoading}
          />
          <input ref={fileInputRef} hidden type='file' onChange={handleFileInputChange} />
          <Button
            color='instagram'
            type='submit'
            loading={isLoading}
            disabled={isLoading || !previewSource}
            style={{ float: 'right', marginTop: '10px', marginBottom: '10px' }}
          >Submit
          </Button>
        </Form.Field>
      </Form>

      <Button color='red' style={{ marginTop: '10px' }} disabled={isLoading} onClick={handleCloseModal}>Cancel</Button>
    </Card.Content>
  );
};

export default UpdateProfilePicture;
