import { OptionType } from "@pap-it/select";
import { Size } from "@pap-it/system-utils";

// Basic
export type Alignment = "left" | "center" | "right";
export type Sorting = "none" | "desc" | "asc";

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
  render?(): void;
}

export interface DataCell extends ICell {
  value: string;
  options?: (string | OptionType)[];
}

export const DefaultCell: ICell = {
  id: "",
  editable: false,
  locked: false,
  visible: true,
  align: "left",
  size: "medium",
}

// Column
export interface IColumn extends ICell {
  title?: string;
  subtitle?: string;
  order: number;
  sort?: Sorting | boolean;
  width?: string;

  // functions
  cellRender?: () => void;
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

// Config
export type Config = {
  edit: boolean | "request";
  pagination: boolean | {
    total: number,
    page?: number
  };
  sort: boolean;
  search: boolean | "fixed";
  actions: Record<string, Action>;
}
export type StrictConfig = Config & {
  actions: Record<string, CustomAction>;
}
export type CustomAction = {
  name?: string;
  icon?: string;
  callback?: Function;
  setting?: any;
}
export type Action = boolean | string | CustomAction;
export type ConfigKeys = keyof Config;
export function DefaultConfig(): StrictConfig {
  return {
    edit: false,
    pagination: false,
    search: false,
    sort: false,
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