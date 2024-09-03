import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../store/store";
import { selectProduct } from "../../reducers/productSlice";
import { useGetProductDataQuery } from "../../services/productApi";
import ProductSelector from "../../components/ProductSelector/ProductSelector";
import ProductDataDisplay from "../../components/ProductDataDisplay/ProductDataDisplay";
import "./ProductDashboard.scss";

const ProductDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state: RootState) => state.products.selectedProduct);

  const { data: productsData, error, isLoading } = useGetProductDataQuery();

  const handleProductChange = (_event: React.SyntheticEvent, value: string | null) => {
    if (value) {
      dispatch(selectProduct(value));
    }
  };

  const renderError = () => {
    if (error) {
      if ('status' in error) {
        // error is of type FetchBaseQueryError
        return <div>Error: {error.status}</div>;
      } else if ('message' in error) {
        // error is of type SerializedError
        return <div>Error: {error.message}</div>;
      }
    }
    return null;
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{renderError()}</div>;

  const productList = productsData ? Object.keys(productsData).map(product => product.charAt(0).toUpperCase() + product.slice(1)) : [];
  const productData = productsData ? productsData[selectedProduct.toLowerCase()] : null;

  return (
    <div className="ProductDashboard">
      <h1>Product Dashboard</h1>
      <ProductSelector
        selectedProduct={selectedProduct}
        onProductChange={handleProductChange}
        options={productList}
      />
      {productData && (
        <ProductDataDisplay
          salesData={productData.salesData}
          conversionData={productData.conversionData}
          reviewData={productData.reviewData}
          comments={productData.comments}
          inventoryCount={productData.inventory}
        />
      )}
    </div>
  );
};

export default ProductDashboard;