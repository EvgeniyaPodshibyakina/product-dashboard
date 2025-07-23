import React from "react";
import LineChartWithToggle from "../LineChartWithToggle/LineChartWithToggle";
import { SalesOverTimeProps } from "./types/SalesOverTimeProps";

const SalesOverTime: React.FC<SalesOverTimeProps> = ({ data }) => {

  const formatPrice = (value: number) => `${value}€`;
  return (
    <div className="chart-wrapper">
      <LineChartWithToggle
        title="Sales Over Time"
        data={data}
        dataKey="sales"
        lineColor="#1976d2"
        yAxisDomain={[0, 6000]}
        yAxisTicks={[1000, 2000, 3000, 4000, 5000, 6000]}
        valueFormatter={formatPrice}
      />
    </div>
  );
};

export default SalesOverTime;
