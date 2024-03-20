import { RenderType } from '@pap-it/system-utils';

export type ValidityStateObject = Record<keyof ValidityState, string>;
export type MessageVariant = "info" | "success" | "warning" | "danger";
export type Mode = "hug" | "fill";
export type State = "default" | "info" | "success" | "warning" | "danger";

export type PrefixSuffixRender = Partial<{
  prefix: RenderType;
  content: RenderType;
  suffix: RenderType;
}>
export type RenderArgument = {
  header?: PrefixSuffixRender;
  footer?: PrefixSuffixRender;
  main: PrefixSuffixRender;
}