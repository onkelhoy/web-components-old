export type FunctionCallback = { callback: Function, args: any[] };

type RenderTypeIndividual = string | DocumentFragment;
export type RenderType = RenderTypeIndividual[] | RenderTypeIndividual;
export type Config = ShadowRootInit & {
  nofocus?: boolean;
  noblur?: boolean;
}
export type PropertyConfig = {
  propertyKey: string;
  type: Function;
}