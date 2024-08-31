// Dashboard.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px; /* Padding to ensure content isn't hidden by the fixed button */
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

const FixedRibbon = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled(Link)`
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.button};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
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

      {/* Fixed Ribbon at the Bottom */}
      <FixedRibbon>
        <Button to="/log-activity">Log Activity</Button>
        <Button to="/faq">FAQ</Button>
      </FixedRibbon>
    </Container>
  );
};

export default Dashboard;
