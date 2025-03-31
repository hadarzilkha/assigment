import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/register', { email, password });
      alert('נרשמת בהצלחה!');
      navigate('/login');
    } catch (err) {
      alert('רישום נכשל');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>הרשמה</h2>
      <input type="email" placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">הרשמה</button>
    </form>
  );
};

export default Register;
