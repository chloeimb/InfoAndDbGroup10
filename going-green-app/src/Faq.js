import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BottomNav from './BottomNav'; // Import your BottomNav component
import backgroundImage from './images/faqimage.png'; // Adjust the path as necessary

// Sample FAQ data
const faqData = [
  {
    question: "What is the purpose of this app?",
    answer: "This app helps users track their carbon footprint by logging daily activities and viewing trends over time."
  },
  {
    question: "How do I log an activity?",
    answer: "To log an activity, navigate to the Log Activity page, select the activity type, enter the relevant details, and submit."
  },
  {
    question: "Can I edit my logged activities?",
    answer: "Currently, the app does not support editing of logged activities, but this feature will be added in the next release."
  },
  {
    question: "How is the carbon impact calculated?",
    answer: "The carbon impact is calculated based on standard emissions factors for various activities, such as driving, biking, and walking."
  }
];

const FAQ = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Full screen height
        width: '100vw', // Full screen width
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Ensure space is distributed between content and BottomNav
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          padding: 4, 
          borderRadius: 2, 
          boxShadow: 3, 
          mt: 4, 
          mb: 4 // Ensure some margin between the content and the BottomNav
        }}
      >
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>

        {/* FAQ List */}
        <Box>
          {faqData.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* Bottom Navigation */}
      <div 
        style={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center', // Ensure BottomNav is centered
        }}
      >
        <BottomNav />
      </div>
    </div>
  );
};

export default FAQ;
