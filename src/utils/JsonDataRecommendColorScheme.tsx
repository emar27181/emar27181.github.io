import { DataRecommendColorAmount } from "../components/ButtonSaveColorScheme";

export interface JsonDataRecommendColorScheme {
  LOAD_NUMBER: number[];
  filteredOrderUsedColorsAmount: number[] | {
    color: string;
    amount: number;
  }[]
  dataRecommendColorsAmount: DataRecommendColorAmount[]
}