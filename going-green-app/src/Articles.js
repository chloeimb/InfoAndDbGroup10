import React, { useState, useEffect } from 'react';
import BottomNav from './BottomNav'; // Import the bottom navigation bar

function Articles() {
  const [articles, setArticles] = useState([]);

  // Fetch articles (you can replace this with an API call later)
  useEffect(() => {
    const fetchedArticles = [
      { id: 1, title: 'How to Reduce Your Carbon Footprint', content: 'Here are some tips to lower your carbon footprint...' },
      { id: 2, title: 'The Impact of Climate Change', content: 'Climate change is affecting our planet in significant ways...' },
      { id: 3, title: 'Renewable Energy Sources', content: 'Solar, wind, and other renewable energy sources are key to sustainability...' },
    ];
    setArticles(fetchedArticles);
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      <div className="articles-list">
        {articles.map(article => (
          <div key={article.id} className="article">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
      <BottomNav /> {/* Include the bottom navigation bar */}
    </div>
  );
}

export default Articles;
