import React from "react";
import "./CurrentInventory.scss"; 
import { CurrentInventoryProps } from "./types/CurrentInventoryProps";

const CurrentInventory: React.FC<CurrentInventoryProps> = ({
  inventoryCount,
}) => {
  return (
    <div className="CurrentInventory">
      <div className="current-inventory-content">
        <div className="current-inventory-title">Current Inventory</div>
        <div className="current-inventory-count">{inventoryCount}</div>
      </div>
    </div>
  );
};

export default CurrentInventory;
