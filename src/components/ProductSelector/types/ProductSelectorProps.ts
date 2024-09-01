export interface ProductSelectorProps {
  selectedProduct: string;
  onProductChange: (event: React.SyntheticEvent, value: string | null) => void;
  options: string[];
}
