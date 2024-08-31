// src/components/ProductDashboard/ProductDashboard.tsx
import React, { useState } from "react";
import ProductSelector from "../../components/ProductSelector/ProductSelector";
import ProductDataDisplay from "../../components/ProductDataDisplay/ProductDataDisplay";
import {
  sweaterSalesData,
  sweaterConversionData,
  sweaterReviewData,
  sweaterComments,
  sweaterInventory,
  jacketSalesData,
  jacketConversionData,
  jacketReviewData,
  jacketComments,
  jacketInventory,
  jeansSalesData,
  jeansConversionData,
  jeansReviewData,
  jeansComments,
  jeansInventory,
  dressSalesData,
  dressConversionData,
  dressReviewData,
  dressComments,
  dressInventory,
} from "../../mockData";
import "./ProductDashboard.scss"; // Стили для компонента ProductDashboard

const products = ["Sweater", "Jacket", "Jeans", "Dress"];

const ProductDashboard: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("Sweater");

  const handleProductChange = (
    event: React.SyntheticEvent,
    value: string | null
  ) => {
    if (value) {
      setSelectedProduct(value);
    }
  };

  let salesData, conversionData, reviewData, comments, inventoryCount;

  // Обновление значений на основе выбранного продукта
  switch (selectedProduct) {
    case "Jacket":
      salesData = jacketSalesData;
      conversionData = jacketConversionData;
      reviewData = jacketReviewData;
      comments = jacketComments;
      inventoryCount = jacketInventory;
      break;
    case "Jeans":
      salesData = jeansSalesData;
      conversionData = jeansConversionData;
      reviewData = jeansReviewData;
      comments = jeansComments;
      inventoryCount = jeansInventory;
      break;
    case "Dress":
      salesData = dressSalesData;
      conversionData = dressConversionData;
      reviewData = dressReviewData;
      comments = dressComments;
      inventoryCount = dressInventory;
      break;
    default:
      salesData = sweaterSalesData;
      conversionData = sweaterConversionData;
      reviewData = sweaterReviewData;
      comments = sweaterComments;
      inventoryCount = sweaterInventory;
      break;
  }

  return (
    <div className="ProductDashboard">
      <ProductSelector
        selectedProduct={selectedProduct}
        onProductChange={handleProductChange}
        options={products}
      />
      <ProductDataDisplay
        salesData={salesData}
        conversionData={conversionData}
        reviewData={reviewData}
        comments={comments}
        inventoryCount={inventoryCount}
      />
    </div>
  );
};

export default ProductDashboard;