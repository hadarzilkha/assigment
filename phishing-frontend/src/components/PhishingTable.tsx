import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Attempt = {
  _id: string;
  email: string;
  status: string;
  createdAt: string;
};

const PhishingTable = () => {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [statusFilter, setStatusFilter] = useState(''); // Status filter
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/phishing', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttempts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter by status
  const filteredAttempts = attempts.filter((attempt) =>
    statusFilter ? attempt.status === statusFilter : true
  );

  return (
    <div>
      <h3>Phishing Attempts</h3>

      {/* Status filter */}
      <label>Filter by Status:</label>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="clicked">Clicked</option>
      </select>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border={1}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttempts.map((a) => (
              <tr key={a._id}>
                <td>{a.email}</td>
                <td>{a.status}</td>
                <td>{new Date(a.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PhishingTable;
