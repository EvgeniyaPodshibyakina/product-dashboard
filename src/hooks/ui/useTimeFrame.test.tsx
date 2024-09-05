import { renderHook, act } from '@testing-library/react';
import useTimeFrame from './useTimeFrame';
import { ChartData } from '../../types';

// Data example
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

describe('useTimeFrame hook', () => {
  it('returns all data when time frame is set to 12 months', () => {
    const { result } = renderHook(() => useTimeFrame(mockData));

    expect(result.current.timeFrame).toBe('12');
    expect(result.current.filteredData).toEqual(mockData);
  });

  it('returns last 6 months of data when time frame is set to 6 months', () => {
    const { result } = renderHook(() => useTimeFrame(mockData));

    // Change the time frame to 6 months
    act(() => {
        result.current.setTimeFrame({} as React.MouseEvent<HTMLElement>, '6');
      });

    expect(result.current.timeFrame).toBe('6');
    expect(result.current.filteredData).toEqual(mockData.slice(-6));
  });

  it('returns last 3 months of data when time frame is set to 3 months', () => {
    const { result } = renderHook(() => useTimeFrame(mockData));

    // Change the time frame to 3 months
    act(() => {
        result.current.setTimeFrame({} as React.MouseEvent<HTMLElement>, '3');
      });

    expect(result.current.timeFrame).toBe('3');
    expect(result.current.filteredData).toEqual(mockData.slice(-3));
  });

  it('returns last 1 month of data when time frame is set to 1 month', () => {
    const { result } = renderHook(() => useTimeFrame(mockData));

    // Change the time frame to 1 month
    act(() => {
        result.current.setTimeFrame({} as React.MouseEvent<HTMLElement>, '1');
      });

    expect(result.current.timeFrame).toBe('1');
    expect(result.current.filteredData).toEqual(mockData.slice(-1));
  });

  it('does not change time frame if setTimeFrame is called with null', () => {
    const { result } = renderHook(() => useTimeFrame(mockData));

    act(() => {
        result.current.setTimeFrame({} as React.MouseEvent<HTMLElement>, null); // Testing the `null` argument
      });

    // The time frame and data should remain the same
    expect(result.current.timeFrame).toBe('12');
    expect(result.current.filteredData).toEqual(mockData);
  });
});