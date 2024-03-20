import React from "react";

export type ReactProps<T> = T & {
  className?: string;
  children?: React.ReactNode;
};