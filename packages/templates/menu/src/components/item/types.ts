import { RenderType } from "@pap-it/system-utils";

export type PrefixSuffixRender = Partial<{
  prefix: RenderType;
  content: RenderType;
  suffix: RenderType;
}>