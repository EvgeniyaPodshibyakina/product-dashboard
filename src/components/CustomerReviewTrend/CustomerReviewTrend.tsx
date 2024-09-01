import React from "react";
import LineChartWithToggle from "../LineChartWithToggle/LineChartWithToggle";
import { CustomerReviewTrendProps } from "./types/CustomerReviewTrendProps";

// Component to display the Customer Review Trend using a reusable LineChartWithToggle component
const CustomerReviewTrend: React.FC<CustomerReviewTrendProps> = ({ data }) => {
  return (
    <div className="chart-wrapper">
      <LineChartWithToggle
        title="Customer Review Trend"
        data={data}
        dataKey="averageRating"
        lineColor="#4caf50"
        yAxisDomain={[0, 5]}
        yAxisTicks={[0, 1, 2, 3, 4, 5]}
      />
    </div>
  );
};

export default CustomerReviewTrend;
