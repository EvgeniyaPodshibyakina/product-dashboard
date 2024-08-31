// src/components/ProductDataDisplay/ProductDataDisplay.tsx
import React from 'react';
import CurrentInventory from '../CurrentInventory/CurrentInventory';
import SalesOverTime from '../SalesOverTime/SalesOverTime';
import ConversionRateOverTime from '../ConversionRateOverTime/ConversionRateOverTime';
import CustomerReviewTrend from '../CustomerReviewTrend/CustomerReviewTrend';
import LatestComments from '../LatestComments/LatestComments';
import { ProductDataDisplayProps } from './types/ProductDataDisplayProps';
import './ProductDataDisplay.scss'; // Стили для компонента ProductDataDisplay
import GenerateReportButton from '../GenerateReportButton/GenerateReportButton';

const ProductDataDisplay: React.FC<ProductDataDisplayProps> = ({
  salesData, conversionData, reviewData, comments, inventoryCount,
}) => {
  const reportData = { salesData, conversionData, reviewData, comments, inventoryCount };

  return (
    <div className="ProductDataDisplay">
      <div className="ReportButton">
      <GenerateReportButton reportData={reportData}/>
      </div>
      <div className="CurrentInventory">
        <CurrentInventory inventoryCount={inventoryCount} /> 
      </div>
      <div className="SalesOverTime">
        <SalesOverTime data={salesData} />
      </div>
      <div className="ConversionRate">
        <ConversionRateOverTime data={conversionData} />
      </div>
      <div className="ReviewTrend">
        <CustomerReviewTrend data={reviewData} />
      </div>
      <div className="LatestComments">
        <LatestComments comments={comments} />
      </div>
    </div>
  );
};

export default ProductDataDisplay;  