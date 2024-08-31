import React from 'react';
import { Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ConversionRateOverTimeProps } from './types/ConversionRateOverTimeProps';

const ConversionRateOverTime: React.FC<ConversionRateOverTimeProps> = ({ data }) => {
  return (
    <div>
      <h2>Conversion Rate Over Time</h2>
      <ResponsiveContainer width={600} height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="conversionRate" stroke="#dc004e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionRateOverTime;