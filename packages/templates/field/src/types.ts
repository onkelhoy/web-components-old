export type MessageType = ""
export type Message = {
  type: MessageType;
  message: string;
}

export type FieldValidityStateName = "badInput" | "customError" | "patternMismatch" | "rangeOverflow" | "rangeUnderflow" | "stepMismatch" | "tooLong" | "tooShort" | "typeMismatch" | "valid" | "valueMissing";

export type FieldValidityState = {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/badInput) */
  badInput: string;
  customError: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/patternMismatch) */
  patternMismatch: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/rangeOverflow) */
  rangeOverflow: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/rangeUnderflow) */
  rangeUnderflow: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/stepMismatch) */
  stepMismatch: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/tooLong) */
  tooLong: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/tooShort) */
  tooShort: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/typeMismatch) */
  typeMismatch: string;
  valid: string;
  valueMissing: string;
}

export const ValidationAttributes = ["min", "max", "pattern", "type", "minlenght", "maxlenght", "required", "multiple", "novalidate", "formnovalidate", "autofocus"]