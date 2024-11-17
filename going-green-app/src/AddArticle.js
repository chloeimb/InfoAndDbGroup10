// AddArticle.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [articleUrl, setArticleUrl] = useState('');

  const handleAddArticle = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:3000/articles',
        { title, content, imageUrl, articleUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Article added successfully!');
      // Reset form fields
      setTitle('');
      setContent('');
      setImageUrl('');
      setArticleUrl('');
    } catch (error) {
      console.error('Error adding article:', error);
      alert('Error adding article');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Article
      </Typography>
      <form onSubmit={handleAddArticle}>
        <TextField
          label="Title"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Content"
          fullWidth
          required
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Image URL"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Article URL"
          fullWidth
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Article
        </Button>
      </form>
    </Container>
  );
};

export default AddArticle;
