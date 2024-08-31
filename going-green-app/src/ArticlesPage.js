// ArticlesPage.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const ArticlesWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: left;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const ArticleTitle = styled.h3`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.primary};
`;

const ArticleContent = styled.p`
  margin-top: 0.5rem;
  color: ${(props) => props.theme.colors.text};
`;

const ArticlesPage = () => {
  return (
    <Container>
      <ArticlesWrapper>
        <Title>Articles</Title>
        <ArticleTitle>Article 1</ArticleTitle>
        <ArticleContent>
          This is a brief summary of the first article. You can read more by clicking here.
        </ArticleContent>
        <ArticleTitle>Article 2</ArticleTitle>
        <ArticleContent>
          This is a brief summary of the second article. You can read more by clicking here.
        </ArticleContent>
        {/* Add more articles as needed */}
      </ArticlesWrapper>
    </Container>
  );
};

export default ArticlesPage;
