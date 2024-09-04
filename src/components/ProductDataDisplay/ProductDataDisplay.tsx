import React from "react";
import CurrentInventory from "../CurrentInventory/CurrentInventory";
import SalesOverTime from "../SalesOverTime/SalesOverTime";
import ConversionRateOverTime from "../ConversionRateOverTime/ConversionRateOverTime";
import CustomerReviewTrend from "../CustomerReviewTrend/CustomerReviewTrend";
import LatestComments from "../LatestComments/LatestComments";
import { ProductDataDisplayProps } from "./types/ProductDataDisplayProps";
import GenerateReportButton from "../GenerateReportButton/GenerateReportButton";
import { useReportData } from "../../hooks/ui/useReportData/useReportData";
import "./ProductDataDisplay.scss";

// Component to display the product data using various components
const ProductDataDisplay: React.FC<ProductDataDisplayProps> = ({
  salesData,
  conversionData,
  reviewData,
  comments,
  inventoryCount,
}) => {
  // use custom hook for data preparation
  const reportData = useReportData({
    salesData,
    conversionData,
    reviewData,
    comments,
    inventoryCount,
  });

  return (
    <div className="ProductDataDisplay">
      <div className="report-button ">
        <GenerateReportButton reportData={reportData} />
      </div>
      <div className="current-inventory ">
        <CurrentInventory inventoryCount={inventoryCount} />
      </div>
      <div className="sales-over-time ">
        <SalesOverTime data={salesData} />
      </div>
      <div className="conversion-rate">
        <ConversionRateOverTime data={conversionData} />
      </div>
      <div className="review-trend ">
        <CustomerReviewTrend data={reviewData} />
      </div>
      <div className="latest-comments">
        <LatestComments comments={comments} />
      </div>
    </div>
  );
};

export default ProductDataDisplay;