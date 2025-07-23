import React, { useMemo } from "react";
import { ProductDataDisplayProps } from "../ProductDataDisplay/types/ProductDataDisplayProps";
import { GenerateReportButtonProps } from "./types/GenerateReportButtonProps";
import "./GenerateReportButton.scss";

const GenerateReportButton: React.FC<GenerateReportButtonProps> = ({
  reportData,
}) => {
 
  const generateCSV = (data: ProductDataDisplayProps): string => {
    const headers = ["Metric", "Value"];
    const rows = [
      ["Sales Data", JSON.stringify(data.salesData)],
      ["Conversion Rate Data", JSON.stringify(data.conversionData)],
      ["Review Data", JSON.stringify(data.reviewData)],
      [
        "Comments",
        data.comments
          .map((comment) => `${comment.author}: ${comment.text}`)
          .join("\n"),
      ],
      ["Current Inventory", data.inventoryCount.toString()],
    ];

    const csvRows = [headers.join(","), ...rows.map((row) => row.join(","))];

    return csvRows.join("\n");
  };

  const csvContent = useMemo(() => generateCSV(reportData), [reportData]);

  const downloadCSV = (csvContent: string, fileName: string) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    link.click();
  };

  const handleGenerateReport = () => {
    downloadCSV(csvContent, "product_report.csv");
  };

  return (
    <div className="GenerateReportButton">
      <button className="generate-report-button" onClick={handleGenerateReport}>
        Generate Report
      </button>
    </div>
  );
};

export default GenerateReportButton;