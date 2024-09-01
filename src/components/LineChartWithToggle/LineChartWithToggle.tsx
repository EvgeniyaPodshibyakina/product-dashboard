import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { LineChartWithToggleProps } from "./types/LineChartWithToggleProps";
import "./LineChartWithToggle.scss";

// Generic Component to display a Line Chart with a toggle to select the time frame
const LineChartWithToggle: React.FC<LineChartWithToggleProps> = ({
  title,
  data,
  dataKey,
  lineColor,
  yAxisDomain,
  yAxisTicks,
  valueFormatter,
}) => {
  // State to manage the selected time frame
  const [timeFrame, setTimeFrame] = useState<string>("12");

  // Handler to update the selected time frame
  const handleTimeFrameChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTimeFrame: string
  ) => {
    if (newTimeFrame !== null) {
      setTimeFrame(newTimeFrame);
    }
  };

  // Function to filter the data based on the selected time frame
  const getFilteredData = () => {
    switch (timeFrame) {
      case "12":
        return data; // Last 12 months (default, shows all data)
      case "6":
        return data.slice(-6); // Last 6 months
      case "3":
        return data.slice(-3); // Last 3 months
      case "1":
        return data.slice(-1); // Last month
      default:
        return data; // Fallback to showing all data
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="line-chart-with-toggle">
      <h2>{title}</h2>
      <div className="toggle-group-container">
        {/* Toggle buttons for selecting the time frame */}
        <ToggleButtonGroup
          value={timeFrame}
          exclusive
          onChange={handleTimeFrameChange}
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
        {/* Line chart with customized X and Y axes */}
        <LineChart data={filteredData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#093a6b" />
          <YAxis
            domain={yAxisDomain}
            ticks={yAxisTicks}
            tickFormatter={valueFormatter}
            stroke="#093a6b"
          />
          {/* Y-axis with custom ticks and formatter */}
          <Tooltip
            formatter={(value: number | string) =>
              valueFormatter ? valueFormatter(Number(value)) : value
            }
          />{" "}
          {/* Tooltip to show data point details */}
          <Line type="monotone" dataKey={dataKey} stroke={lineColor} />{" "}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartWithToggle;
