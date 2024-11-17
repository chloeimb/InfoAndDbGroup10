// Articles.js

import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button,
} from '@mui/material';
import BottomNav from './BottomNav'; // Import your BottomNav component

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const apiKey = 'YOUR_NEWSAPI_KEY'; // Replace with your actual NewsAPI key

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch custom articles from your backend
        const customArticlesResponse = await fetch('http://localhost:3000/articles');
        const customArticles = await customArticlesResponse.json();

        // Fetch articles from NewsAPI
        const newsApiResponse = await fetch(
          `https://newsapi.org/v2/everything?q=environment OR climate OR sustainability OR "eco-friendly"&language=en&apiKey=${apiKey}`
        );
        const newsApiData = await newsApiResponse.json();

        // Combine custom articles with NewsAPI articles
        const combinedArticles = [...customArticles, ...newsApiData.articles];

        // Sort articles by date (assuming both have a 'createdAt' or 'publishedAt' field)
        combinedArticles.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.publishedAt);
          const dateB = new Date(b.createdAt || b.publishedAt);
          return dateB - dateA; // Descending order
        });

        setArticles(combinedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [apiKey]);

  return (
    <div
      style={{
        minHeight: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Ensure space between articles and BottomNav
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
        <Typography variant="h4" gutterBottom>
          Eco News
        </Typography>

        <Grid container spacing={4}>
          {articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {(article.imageUrl || article.urlToImage) && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.imageUrl || article.urlToImage}
                    alt={article.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.content || article.description || 'No description available'}
                  </Typography>
                </CardContent>
                {(article.articleUrl || article.url) && (
                  <CardActions>
                    <Button
                      size="small"
                      href={article.articleUrl || article.url}
                      target="_blank"
                      sx={{ color: '#1976d2' }}
                    >
                      Read More
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Bottom Navigation */}
      <div
        style={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center', // Center the BottomNav
          backgroundColor: '#fff', // Ensure BottomNav is visible with a background color
          padding: '10px 0', // Add some padding for visual spacing
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)', // Add slight shadow for separation
        }}
      >
        <BottomNav />
      </div>
    </div>
  );
};

export default Articles;
