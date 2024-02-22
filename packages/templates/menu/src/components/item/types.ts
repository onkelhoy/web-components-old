import { RenderType } from "@pap-it/system-base";

export type PrefixSuffixRender = Partial<{
  prefix: RenderType;
  content: RenderType;
  suffix: RenderType;
}>