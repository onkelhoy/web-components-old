type CommonVariantNames = 'C'|'T'|'H'|'copy'|'title'|'heading';
export type Variant = `${CommonVariantNames|'B'|'button'}${1|2}`|`${CommonVariantNames}${3|4}`|'H5';
export type Alignment = "center" | "justify" | "start" | "end" | "left" | "right" | "unset" | "inherit" | "initial";