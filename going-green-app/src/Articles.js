import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, Box } from '@mui/material';
import BottomNav from './BottomNav'; // Import your BottomNav component

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const apiKey = '7bd1015d51de4db7ad11a5aaca5925f8'; // Your NewsAPI key

  // Function to fetch eco-related news articles from NewsAPI
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=environment OR climate OR sustainability OR "eco-friendly"&language=en&apiKey=${apiKey}`
        );
        const data = await response.json();
        setArticles(data.articles); // Assuming the response contains an array of articles
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
                {article.urlToImage && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.urlToImage}
                    alt={article.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description ? article.description : 'No description available'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    href={article.url}
                    target="_blank"
                    sx={{ color: '#1976d2' }}
                  >
                    Read More
                  </Button>
                </CardActions>
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
