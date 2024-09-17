import React, { useState, useEffect } from 'react';
import BottomNav from './BottomNav'; // Import the bottom navigation bar

function Faq() {
  const [faqs, setFaqs] = useState([]);

  // Fetch FAQs (you can replace this with an API call later)
  useEffect(() => {
    const fetchedFaqs = [
      { id: 1, question: 'What is a carbon footprint?', answer: 'A carbon footprint is the total amount of greenhouse gases emitted by an individual, event, organization, or product.' },
      { id: 2, question: 'How can I reduce my carbon footprint?', answer: 'You can reduce your carbon footprint by using renewable energy, minimizing waste, and reducing energy consumption.' },
      { id: 3, question: 'What are the benefits of renewable energy?', answer: 'Renewable energy reduces dependency on fossil fuels, lowers greenhouse gas emissions, and supports a sustainable environment.' },
    ];
    setFaqs(fetchedFaqs);
  }, []);

  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map(faq => (
          <div key={faq.id} className="faq-item">
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
      <BottomNav /> {/* Include the bottom navigation bar */}
    </div>
  );
}

export default Faq;
