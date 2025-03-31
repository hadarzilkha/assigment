import React, { useState } from 'react';
import axios from 'axios';

const SendForm = () => {
  const [email, setEmail] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/phishing', { email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Phishing attempt sent successfully!');
      setEmail('');
    } catch (err) {
      alert('Sending failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSend}>
      <h3>Send Phishing Attempt</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendForm;
