// FAQPage.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const FAQWrapper = styled.div`
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

const Question = styled.h3`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.primary};
`;

const Answer = styled.p`
  margin-top: 0.5rem;
  color: ${(props) => props.theme.colors.text};
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.button};
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const FAQPage = () => {
  return (
    <Container>
      <FAQWrapper>
        <Title>Frequently Asked Questions</Title>
        <Question>What is this application?</Question>
        <Answer>This application helps you log and track various activities.</Answer>
        <Question>How do I log an activity?</Question>
        <Answer>You can log an activity by clicking the "Log Activity" button on the Dashboard.</Answer>
        <Question>Where can I view my logged activities?</Question>
        <Answer>Your logged activities are displayed on your Dashboard.</Answer>
        {/* Add more questions and answers as needed */}

        {/* Back to Dashboard Button */}
        <BackButton to="/dashboard">Back to Dashboard</BackButton>
      </FAQWrapper>
    </Container>
  );
};

export default FAQPage;
