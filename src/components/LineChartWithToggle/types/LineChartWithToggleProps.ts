import {
  CommentData,
  ConversionData,
  ReviewData,
  SalesData,
} from "../../../mockData/types";

export type ChartData = SalesData | ConversionData | ReviewData | CommentData;

export interface LineChartWithToggleProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  lineColor: string;
  yAxisDomain: [number, number];
  yAxisTicks: number[];
  valueFormatter?: (value: number) => string;
}
