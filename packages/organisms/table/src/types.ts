import { OptionType } from "@pap-it/select";
import { RenderType, Size } from "@pap-it/system-utils";

// Basic
export type Alignment = "left" | "center" | "right";
export type SortDirection = "asc" | "desc";
export type Sorting = "false" | "none" | SortDirection;
export type Sort = {
  id: string;
  direction: SortDirection;
}

type PrefixSuffix = {
  content: string;
  suffix?: string;
  prefix?: string;
}
export type IEdit = {
  slot?: string | {
    id?: string;
    save?: boolean | string | PrefixSuffix;
    cancel?: boolean | string | PrefixSuffix;
  }
}

// Cell
export interface ICell {
  id: string;
  editable?: boolean | IEdit;
  locked?: boolean;
  visible?: boolean;
  align?: Alignment;
  size?: Size;

  // functions
  search?(value: string): boolean;
  render?(): RenderType;
}

export interface DataCell extends ICell {
  value: string;
  options?: (string | OptionType)[];
}

export const DefaultCell: ICell = {
  id: "",
  locked: false,
  visible: true,
  align: "left",
  size: "medium",
}

export interface CellComponent {
  rowindex: number;
  colindex: number;
  cellData: DataCell;
  columnData: IColumn;
}

// Column
export interface IColumn extends ICell {
  title?: string;
  subtitle?: string;
  order: number;
  sort?: Sorting | boolean;
  width?: string;
  fixed?: boolean | "left" | "right"; // true will be considered as left (or maybe automatically deterimined based on median point)

  // functions
  cellRender?(cell: CellComponent): RenderType;
}

export type InputColumn = IColumn & {
  width?: number | string;
  id?: string;
}

// Sheet
export type ISheet = {
  id: string;
  name: string;
  locked: boolean;
  hidden: boolean;
}

// selected rows 
export type RowIdentifier = {
  row: DataCell[];
  id: string;
  index: number;
}

// Config
export type ChecklistToolbarConfig = {
  icon: string;
  callback?: Function;
}
type ChecklistConfig = {
  toolbar: boolean | Record<string, boolean | ChecklistToolbarConfig>;
}
export type CustomAction = {
  name: string;
  icon: string;
  callback?: Function;
  setting?: any;
}
export type Action = boolean | string | Partial<CustomAction>;
export type Config = {
  edit: boolean | "request";
  pagination: boolean | {
    total: number,
    page?: number
  };
  sort: boolean | "multiple";
  checklist: boolean | ChecklistConfig;
  accordion: boolean;
  search: boolean | "fixed";
  actions: Record<string, Action>;
}
export type StrictConfig = Omit<Config, 'actions' | 'checklist'> & {
  actions: Record<string, CustomAction>;
  checklist?: {
    toolbar?: Record<string, ChecklistToolbarConfig>;
  };
}
export type ConfigKeys = keyof Config;
export function DefaultConfig(): StrictConfig {
  return {
    edit: false,
    pagination: false,
    search: false,
    sort: false,
    accordion: false,
    actions: {},
  }
}

// Filter
export type FilterTypes = `${"" | "not "}${"contains" | "equals" | "empty"}` | "starts with" | "ends with";
export type IFilter = {
  type: FilterTypes;
  value?: string;
}
export type FilterChangeEvent = { column: string, filters: IFilter[] };

export type IManage = {
  readonly: boolean;
}

// Header
export type HeaderActionClick = {
  type: string;
}
export type HeaderSearch = {
  value: string;
}