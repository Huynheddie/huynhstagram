import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Form, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { CloudinaryContext, Transformation, Image as CImage } from 'cloudinary-react';
import userService from '../services/user';

const UserProfile = () => {
  const history = useHistory();
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    const findUser = async () => {
      const response = await userService.getUser(loggedInUser.id);
      setUser(response);
    };

    findUser();
  }, [loggedInUser.id]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    history.push('/');
  };

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
    <>
      { user
      && (
      <>
        <Card centered>

          <Card.Content style={{ textAlign: 'center' }}>
            <CloudinaryContext cloudName='huynhstagram'>
              <CImage publicId={user.profileImage}>
                <Transformation
                  width='80'
                  height='80'
                  crop='thumb'
                  radius='max'
                />
              </CImage>
            </CloudinaryContext>
            <h1 style={{ marginTop: '0' }}>{user.username}</h1>
          </Card.Content>

          <Card.Content>
            <Card.Header style={{ marginBottom: '10px' }}>Change Profile Picture</Card.Header>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                { previewSource && (
                <Card>
                  <Image src={previewSource} />
                </Card>
                )}
                <Button
                  content='Upload'
                  labelPosition='left'
                  icon='upload'
                  fluid
                  onClick={() => fileInputRef.current.click()}
                  type='button'
                />
                <input ref={fileInputRef} hidden type='file' onChange={handleFileInputChange} />
                { previewSource
                  && (
                  <Button
                    color='instagram'
                    type='submit'
                    loading={isLoading}
                    style={{ float: 'right', marginTop: '10px' }}
                  >Submit
                  </Button>
                  )}
              </Form.Field>
            </Form>

          </Card.Content>
        </Card>

        <Card centered>
          <Card.Content style={{ textAlign: 'center' }}>
            <Button
              color='instagram'
              content='Log out'
              onClick={handleLogout}
            />
          </Card.Content>
        </Card>
      </>
      )}

    </>
  );
};

export default UserProfile;
