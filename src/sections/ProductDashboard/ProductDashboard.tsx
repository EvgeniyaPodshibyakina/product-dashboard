import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks";
import { RootState } from "../../store/store";
import { selectProduct } from "../../reducers/productSlice";
import { useGetProductDataQuery } from "../../services/productApi";
import ProductSelector from "../../components/ProductSelector/ProductSelector";
import ProductDataDisplay from "../../components/ProductDataDisplay/ProductDataDisplay";
import { getErrorMessage } from "../../utils/errorHandler"; // Импорт утилитарной функции
import "./ProductDashboard.scss";

const ProductDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state: RootState) => state.products.selectedProduct);

  const { data: productsData, error, isLoading } = useGetProductDataQuery();

  // Product List memoization to prevent unnecessary re-renders 
  const productList = useMemo(
    () => productsData ? Object.keys(productsData).map(product => product.charAt(0).toUpperCase() + product.slice(1)) : [],
    [productsData]
  );
  const productData = useMemo(
    () => productsData ? productsData[selectedProduct.toLowerCase()] : null,
    [productsData, selectedProduct]
  );

  const handleProductChange = (_event: React.SyntheticEvent, value: string | null) => {
    if (value) {
      dispatch(selectProduct(value));
    }
  };

  const errorMessage = getErrorMessage(error);

  if (isLoading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

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