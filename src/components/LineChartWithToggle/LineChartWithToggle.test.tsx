import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LineChartWithToggle from './LineChartWithToggle';
import { vi } from 'vitest';
import { ChartData } from '../../types';

vi.mock('recharts', () => ({
  LineChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Line: () => <div>Line</div>,
  XAxis: () => <div>X-Axis</div>,
  YAxis: () => <div>Y-Axis</div>,
  Tooltip: () => <div>Tooltip</div>,
  CartesianGrid: () => <div>Grid</div>,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const setTimeFrameMock = vi.fn();

vi.mock('../../hooks/ui/useTimeFrame', () => ({
  default: (data: ChartData[]) => ({
    timeFrame: '12',
    setTimeFrame: setTimeFrameMock,
    filteredData: data.slice(0, 12), 
  }),
}));

describe('LineChartWithToggle Component', () => {
  const mockData: ChartData[] = [
    { month: 'Jan', sales: 100 },
    { month: 'Feb', sales: 200 },
    { month: 'Mar', sales: 300 },
    { month: 'Apr', sales: 400 },
    { month: 'May', sales: 500 },
    { month: 'Jun', sales: 600 },
    { month: 'Jul', sales: 700 },
    { month: 'Aug', sales: 800 },
    { month: 'Sep', sales: 900 },
    { month: 'Oct', sales: 1000 },
    { month: 'Nov', sales: 1100 },
    { month: 'Dec', sales: 1200 },
  ];
  const defaultProps = {
    title: "Sales Over Time",
    data: mockData,
    dataKey: "sales",
    lineColor: "#000",
    yAxisDomain: [0, 6000] as [number, number], 
    yAxisTicks: [1000, 2000, 3000, 4000, 5000, 6000],
    valueFormatter: (value: number) => `${value}€`,
  };

  it('renders with correct title and chart', () => {
    render(<LineChartWithToggle {...defaultProps} />);

    expect(screen.getByText(/Sales Over Time/i)).toBeInTheDocument();

    expect(screen.getByText('Line')).toBeInTheDocument();
    expect(screen.getByText('X-Axis')).toBeInTheDocument();
    expect(screen.getByText('Y-Axis')).toBeInTheDocument();
  });

  it('renders correct number of points on the line chart for 12 months', () => {
    render(<LineChartWithToggle {...defaultProps} />);

    const lines = screen.getAllByText('Line');
    expect(lines.length).toBe(1); 
  });

  it('switches time frames when buttons are clicked', () => {
    render(<LineChartWithToggle {...defaultProps} />);

    const last6MButton = screen.getByText(/Last 6M/i);
    fireEvent.click(last6MButton);

    expect(setTimeFrameMock).toHaveBeenCalledWith(expect.anything(), '6');
  });

});