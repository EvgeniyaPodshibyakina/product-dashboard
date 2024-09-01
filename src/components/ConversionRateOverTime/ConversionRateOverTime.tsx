import React from "react";
import LineChartWithToggle from "../LineChartWithToggle/LineChartWithToggle";
import { ConversionRateOverTimeProps } from "./types/ConversionRateOverTimeProps";

const ConversionRateOverTime: React.FC<ConversionRateOverTimeProps> = ({
  data,
}) => {
  const formattedData = data.map((dataPoint) => {
    return {
      ...dataPoint,
      conversionRate: dataPoint.conversionRate * 100,
    };
  });
  const formatPercent = (value: number) => `${value.toFixed(0)}%`;
  return (
    <div className="chart-wrapper">
      <LineChartWithToggle
        title="Conversion Rate Over Time"
        data={formattedData}
        dataKey="conversionRate"
        lineColor="#dc004e"
        yAxisDomain={[0, 100]}
        yAxisTicks={[0, 20, 40, 60, 80, 100]}
        valueFormatter={formatPercent}
      />
    </div>
  );
};

export default ConversionRateOverTime;
