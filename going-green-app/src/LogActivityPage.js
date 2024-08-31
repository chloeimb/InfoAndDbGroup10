// LogActivityPage.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.button};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const LogActivityPage = () => {
  const handleLogActivity = (event) => {
    event.preventDefault();
    // Handle activity logging logic here
    alert('Activity logged!');
  };

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Log Activity</FormTitle>
        <Form onSubmit={handleLogActivity}>
          <Input type="text" placeholder="Activity Name" required />
          <Textarea placeholder="Activity Description" rows="4" required />
          <Button type="submit">Log Activity</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default LogActivityPage;
