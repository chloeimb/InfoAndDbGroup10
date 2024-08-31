// Dashboard.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px; /* Ensure space for the fixed ribbon */
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  margin: 1.5rem 0;
  color: ${(props) => props.theme.colors.primary};
`;

const DashboardContent = styled.div`
  padding: 1rem 2rem;
  text-align: left;
`;

const Dashboard = () => {
  return (
    <Container>
      <DashboardWrapper>
        <Title>Dashboard</Title>
        <DashboardContent>
          <p>Welcome to your dashboard! Here, you can view your profile, manage settings, and more.</p>
          {/* Add more dashboard features and content here */}
        </DashboardContent>
      </DashboardWrapper>
    </Container>
  );
};

export default Dashboard;
