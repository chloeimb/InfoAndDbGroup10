// Dashboard.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
`;

const DashboardContent = styled.div`
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
