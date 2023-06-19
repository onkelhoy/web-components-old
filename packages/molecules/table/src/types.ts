import { IOption } from '@circular/dropdown';

export interface Column {
  search: boolean;
  sortable: boolean;
  filter: boolean;
  id: string;
  value: string;
}
export interface Cell {
  id: string;
  value: string;
  options?: IOption[];
}
export interface Config {
  columns: Column[];
  data: 
}