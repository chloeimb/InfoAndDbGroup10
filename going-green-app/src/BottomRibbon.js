// BottomRibbon.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  z-index: 1000; /* Ensure the ribbon is always on top */
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

const BottomRibbon = () => {
  return (
    <FixedRibbon>
      <Button to="/dashboard">Dashboard</Button>
      <Button to="/log-activity">Log Activity</Button>
      <Button to="/articles">Articles</Button>
      <Button to="/faq">FAQ</Button>
    </FixedRibbon>
  );
};

export default BottomRibbon;
