import React from 'react';
import PhishingTable from '../components/PhishingTable';
import SendForm from '../components/SendForm';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <SendForm /> {/* כפתור לשלוח ניסיון פישינג */}
      <PhishingTable />
    </div>
  );
};

export default Dashboard;
