// FAQPage.js
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
      </FAQWrapper>
    </Container>
  );
};

export default FAQPage;
