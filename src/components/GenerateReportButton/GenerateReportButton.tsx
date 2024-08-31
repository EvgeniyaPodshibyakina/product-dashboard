import React from 'react';
import './GenerateReportButton.scss'; // Подключаем стили для кнопки
import { ProductDataDisplayProps } from '../ProductDataDisplay/types/ProductDataDisplayProps'; // Assuming you have this type
import { GenerateReportButtonProps } from './types/GenerateReportButtonProps';

const GenerateReportButton: React.FC<GenerateReportButtonProps> = ({ reportData }) => {

  const handleGenerateReport = () => {
    const csvContent = generateCSV(reportData);
    downloadCSV(csvContent, 'product_report.csv');
  };

  const generateCSV = (data: ProductDataDisplayProps): string => {
    const headers = [
      'Metric', 'Value'
    ];
    const rows = [
      ['Sales Data', JSON.stringify(data.salesData)],
      ['Conversion Rate Data', JSON.stringify(data.conversionData)],
      ['Review Data', JSON.stringify(data.reviewData)],
      ['Comments', data.comments.map(comment => `${comment.author}: ${comment.text}`).join('\n')],
      ['Current Inventory', data.inventoryCount.toString()],
    ];

    const csvRows = [
      headers.join(','), // Header row
      ...rows.map(row => row.join(',')) // Data rows
    ];

    return csvRows.join('\n');
  };

  const downloadCSV = (csvContent: string, fileName: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    link.click();
  };

  return (
    <div className="generate-report-container">
      <button className="generate-report-button" onClick={handleGenerateReport}>
        Generate Report
      </button>
    </div>
  );
};

export default GenerateReportButton;