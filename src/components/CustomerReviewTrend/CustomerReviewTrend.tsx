import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomerReviewTrendProps } from './types/CustomerReviewTrendProps';

const CustomerReviewTrend: React.FC<CustomerReviewTrendProps> = ({ data }) => {
  return (
    <div>
      <h2>Customer Review Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="averageRating" stroke="#4caf50" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerReviewTrend;