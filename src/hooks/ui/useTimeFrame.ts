import { useState, useMemo } from 'react';
import { ChartData } from '../../types';

const useTimeFrame = (data: ChartData[]) => {
  const [timeFrame, setTimeFrame] = useState<string>('12');

  const handleTimeFrameChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTimeFrame: string | null
  ) => {
    console.log("Новая временная рамка:", newTimeFrame);
    if (newTimeFrame !== null) {
      setTimeFrame(newTimeFrame);
    }
  };

  const filteredData = useMemo(() => {
    switch (timeFrame) {
      case '12':
        return data; // Last 12 months (default, shows all data)
      case '6':
        return data.slice(-6); // Last 6 months
      case '3':
        return data.slice(-3); // Last 3 months
      case '1':
        return data.slice(-1); // Last month
      default:
        return data;
    }
  }, [timeFrame, data]);

  return {
    timeFrame,
    setTimeFrame: handleTimeFrameChange,
    filteredData,
  };
};

export default useTimeFrame;