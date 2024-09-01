// src/components/ProductSelector.tsx
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ProductSelectorProps } from "./types/ProductSelectorProps";

// Component to select a product from a list of options
const ProductSelector: React.FC<ProductSelectorProps> = ({
  selectedProduct,
  onProductChange,
  options,
}) => {
  return (
    <Autocomplete
      options={options}
      value={selectedProduct}
      onChange={onProductChange}
      renderInput={(params) => <TextField {...params} label="Product" />}
    />
  );
};

export default ProductSelector;
