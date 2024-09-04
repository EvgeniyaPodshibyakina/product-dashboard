import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { LineChartWithToggleProps } from './types/LineChartWithToggleProps';
import useTimeFrame from '../../hooks/ui/useTimeFrame';
import './LineChartWithToggle.scss';

const LineChartWithToggle: React.FC<LineChartWithToggleProps> = ({
  title,
  data,
  dataKey,
  lineColor,
  yAxisDomain,
  yAxisTicks,
  valueFormatter,
}) => {
  const { timeFrame, setTimeFrame, filteredData } = useTimeFrame(data);

  return (
    <div className="LineChartWithToggle">
      <h2>{title}</h2>
      <div className="toggle-group-container">
        <ToggleButtonGroup
          value={timeFrame}
          exclusive
          onChange={setTimeFrame}
          aria-label="time frame"
        >
          <ToggleButton value="12" className="toggle-button">
            Last 12M
          </ToggleButton>
          <ToggleButton value="6" className="toggle-button">
            Last 6M
          </ToggleButton>
          <ToggleButton value="3" className="toggle-button">
            Last 3M
          </ToggleButton>
          <ToggleButton value="1" className="toggle-button">
            Last 1M
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#093a6b" />
          <YAxis
            domain={yAxisDomain}
            ticks={yAxisTicks}
            tickFormatter={valueFormatter}
            stroke="#093a6b"
          />
          <Tooltip
            formatter={(value: number | string) =>
              valueFormatter ? valueFormatter(Number(value)) : value
            }
          />
          <Line type="monotone" dataKey={dataKey} stroke={lineColor} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartWithToggle;