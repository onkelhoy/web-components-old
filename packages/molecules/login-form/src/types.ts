import { OptionType } from '@circular/dropdown'

export type FieldConfig = {
  type: "input"|"dropdown"|"checkbox"|"textarea",
  properties: Record<string, any>;
  options?: OptionType[];
}
export type RegisterModel = Record<string, FieldConfig>;