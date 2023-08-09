import { IOption } from '@onkelhoy/dropdown';

// data related types
type CellObject = {
  value: string;
  header?: boolean;
}
export type Cell = CellObject & { header: false } & Partial<{
  options: IOption[];
  canEdit: boolean;
}>;
export type HeaderCell = CellObject & { header: true } & Partial<{
  search: boolean;
  sorting: boolean;
  filter: boolean;
}>;
export type Data = string | Cell | HeaderCell;

// config related types
export type Pagination = {
  size: number;
  page: number;
  rowcount: number;
}
export type Direction = "horizontal" | "vertical";
export type Config = Partial<{
  ordering: boolean;
  sorting: boolean;
  direction: Direction;
  canEdit: boolean;
  pagination?: Pagination;
}>