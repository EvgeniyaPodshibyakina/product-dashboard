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
import "./ProductDashboard.scss";

// List of available products
const products = ["Sweater", "Jacket", "Jeans", "Dress"];

const ProductDashboard: React.FC = () => {
  // State to track the currently selected product
  const [selectedProduct, setSelectedProduct] = useState<string>("Sweater");

  // Function to handle changes in product selection
  const handleProductChange = (
    _event: React.SyntheticEvent,
    value: string | null
  ) => {
    if (value) {
      setSelectedProduct(value);
    }
  };

  // Variables to hold data specific to the selected product
  let salesData, conversionData, reviewData, comments, inventoryCount;

  // Switch statement to set the appropriate data based on the selected product
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
      // Default to "Sweater" data if no product is selected or if "Sweater" is selected
      salesData = sweaterSalesData;
      conversionData = sweaterConversionData;
      reviewData = sweaterReviewData;
      comments = sweaterComments;
      inventoryCount = sweaterInventory;
      break;
  }

  return (
    <div className="ProductDashboard">
      <h1>Product Dashboard</h1>
      {/* Component for selecting a product */}
      <ProductSelector
        selectedProduct={selectedProduct}
        onProductChange={handleProductChange}
        options={products}
      />
      {/* Component for displaying data related to the selected product */}
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
