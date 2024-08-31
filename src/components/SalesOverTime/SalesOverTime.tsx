import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SalesOverTimeProps } from './types/SalesOverTimeProps';
import { SalesData } from '../../mockData/types';
import './SalesOverTime.scss';

const SalesOverTime: React.FC<SalesOverTimeProps> = ({ data }) => {
  const [timeFrame, setTimeFrame] = useState<string>('12');

  const handleTimeFrameChange = (event: React.MouseEvent<HTMLElement>, newTimeFrame: string) => {
    if (newTimeFrame !== null) {
      setTimeFrame(newTimeFrame);
    }
  };

  const getFilteredData = (): SalesData[] => {
    switch (timeFrame) {
      case '12':
        return data;
      case '6':
        return data.slice(-6); // Последние 6 месяцев
      case '3':
        return data.slice(-3); // Последние 3 месяца
      case '1':
        return data.slice(-1); // Последний месяц
      default:
        return data;
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="SalesOverTimeContainer">
      <h2>Sales Over Time</h2>
      <ToggleButtonGroup
        value={timeFrame}
        exclusive
        onChange={handleTimeFrameChange}
        aria-label="time frame"
        className="ToggleButtonGroup"
      >
        <ToggleButton value="12">Last 12M</ToggleButton>
        <ToggleButton value="6">Last 6M</ToggleButton>
        <ToggleButton value="3">Last 3M</ToggleButton>
        <ToggleButton value="1">Last 1M</ToggleButton>
      </ToggleButtonGroup>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#1976d2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesOverTime;