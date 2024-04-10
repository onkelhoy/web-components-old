
import React from "react";

// web components & utils
import { papHOC } from "@pap-it/system-react";
import { Pagination } from "@pap-it/pagination";


// local
import { Config, DataCell, InputColumn, Table as TableElement } from "../src";
import "../src/register.js";

// exporting
export { Table as TableElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  tableTitle?: string; // [conditional]
  config?: Config;
  columns?: Array<string | InputColumn>;
  data?: (string | DataCell)[][];
  edit?: boolean;
  size?: number;
  scope?: string; // [conditional]
  onSearch?: (e: React.SyntheticEvent<TableElement, CustomEvent>) => void; // detail: { value (note this is early and can be wrong)
  onFilterApply?: (e: React.SyntheticEvent<TableElement, CustomEvent>) => void; // detail: {  (note this is early and can be wrong)
  onFilterReset?: (e: React.SyntheticEvent<TableElement, Event>) => void;
  onPagination?: (e: React.SyntheticEvent<TableElement, Event>) => void;
  onExport?: (e: React.SyntheticEvent<TableElement, CustomEvent>) => void; // detail: { value (note this is early and can be wrong)
  onSort?: (e: React.SyntheticEvent<TableElement, CustomEvent>) => void; // detail: { value (note this is early and can be wrong)
  onChecklistAction?: (e: React.SyntheticEvent<TableElement, CustomEvent>) => void; // detail: { selected (note this is early and can be wrong)
  onContextData?: (e: React.SyntheticEvent<TableElement, Event>) => void;
  onSave?: (e: React.SyntheticEvent<TableElement, Event>) => void;
  onSelect?: (e: React.SyntheticEvent<TableElement, CustomEvent>) => void; // detail: { value (note this is early and can be wrong)
  children?: React.ReactNode;
  className?: string;
  // these are more fields for reference object.. (NOT PROPS)
  // SelectedRows: IterableIterator<DataCell[]>;
  // total: number;
  // pagination: Pagination;
  // addData<T>(data: T[], convertor: (d: T) => DataCell[]): void;
  // save(): void;
  // cancel(): void;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  "table-title"?: string; // [conditional]
  "edit"?: string;
  "size"?: string;
  "scope"?: string; // [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<TableElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-table
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-table>
  );
});

export const Table = papHOC<TableElement, Props, Attributes>(Component);