import { useState, useMemo } from 'react';
import { ChartData } from '../../types';

const useTimeFrame = (data: ChartData[]) => {
  const [timeFrame, setTimeFrame] = useState<string>('12');

  const handleTimeFrameChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTimeFrame: string | null
  ) => {
    if (newTimeFrame !== null) {
      setTimeFrame(newTimeFrame);
    }
  };

  const filteredData = useMemo(() => {
    switch (timeFrame) {
      case '12':
        return data; 
      case '6':
        return data.slice(-6); 
      case '3':
        return data.slice(-3); 
      case '1':
        return data.slice(-1); 
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