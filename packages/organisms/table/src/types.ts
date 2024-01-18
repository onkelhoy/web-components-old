import { Size } from "@pap-it/system-utils";

// Basic
export type Alignment = "left" | "center" | "right";

// Cell
export type Cell = {
  id: string;
  editable?: boolean;
  locked?: boolean;
  visible?: boolean;
  align?: Alignment;
  size?: Size;

  // functions
  search?: (value: string) => boolean;
  render?: () => void;
}

export const DefaultCell: Cell = {
  id: "",
  editable: false,
  locked: false,
  visible: true,
  align: "left",
  size: "medium",
}

// Column
export type Column = Cell & {
  title?: string;
  subtitle?: string;
  order: number;

  // functions
  cellRender?: () => void;
}

// Sheet
export type Sheet = {
  id: string;
  name: string;
  locked: boolean;
  hidden: boolean;
}

// Config
export type Config = {
  edit: boolean;
  pagination: boolean;
  search: boolean;
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
export const DefaultConfig: StrictConfig = {
  edit: false,
  pagination: false,
  search: false,
  actions: {},
}

// Filter
export type FilterTypes = `${"" | "not "}${"contains" | "equals" | "empty"}` | "starts with" | "ends with";
export type Filter = {
  type: FilterTypes;
  value?: string;
}
export type FilterChangeEvent = { column: string, filters: Filter[] };

export type Manage = {
  readonly: boolean;
}

// Header
export type HeaderActionClick = {
  type: string;
}
export type HeaderSearch = {
  value: string;
}