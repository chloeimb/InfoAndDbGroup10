// Dashboard.js
import React from 'react';
import styled from 'styled-components';
import MyChart from './components/MyChart';  // Import your chart component

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px; /* Ensure space for the fixed ribbon */
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  overflow-y: auto; /* Allow scrolling if content overflows */
`;

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
`;

const Title = styled.h2`
  margin: 1.5rem 0;
  color: ${(props) => props.theme.colors.primary};
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  text-align: left;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.primary};
`;

const SectionContent = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Dashboard = () => {
  return (
    <Container>
      <DashboardWrapper>
        <Title>Dashboard</Title>

        {/* Carbon Footprint Summary Section */}
        <Section>
          <SectionTitle>Carbon Footprint Summary</SectionTitle>
          <SectionContent>
            <p>Total Carbon Footprint: 5,000 kg CO₂</p>
            <p>Average Daily Emissions: 15 kg CO₂</p>
          </SectionContent>
        </Section>

        {/* Charts Section */}
        <Section>
          <SectionTitle>Charts</SectionTitle>
          <SectionContent>
            <MyChart /> {/* Add the chart component here */}
          </SectionContent>
        </Section>

        {/* Personalized Tips Section */}
        <Section>
          <SectionTitle>Personalized Tips</SectionTitle>
          <SectionContent>
            <p>Tip 1: Consider reducing your meat consumption to lower emissions.</p>
            <p>Tip 2: Use public transport more frequently to reduce your carbon footprint.</p>
          </SectionContent>
        </Section>
      </DashboardWrapper>
    </Container>
  );
};

export default Dashboard;
