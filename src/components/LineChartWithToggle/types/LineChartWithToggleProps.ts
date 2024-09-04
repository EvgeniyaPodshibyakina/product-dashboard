import { ChartData } from "../../../types";

export interface LineChartWithToggleProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  lineColor: string;
  yAxisDomain: [number, number];
  yAxisTicks: number[];
  valueFormatter?: (value: number) => string;
}
