import { NextParent } from '../functions/helpers';

async function tryupdate(this: any, update: string, value: any, old: any, verbose: boolean) {
  if (verbose) {
    console.log({
      message: 'calling update',
      property: update,
      value: this[update],
      attempt: this[update + "_attempts"]
    })
  }

  let ans: number | undefined = 10;
  if (this[update]) ans = await this[update](value, old);

  if (typeof ans === "number") {
    if (this[update + "_attempts"] < ans) {
      this[update + "_attempts"]++;
      setTimeout(() => {
        tryupdate.call(this, update, value, old, verbose);
      }, 100)
    }
  }
}

function convertFromStringPrimitive(value: string | null) {
  if (value === null) return null;

  if (["true", "false"].includes(value.toLowerCase())) return Boolean(value);

  const number_value = Number(value);
  if (!Number.isNaN(number_value)) return number_value;

  return value;
}
export function convertFromString(value: string | null, type: Function) {
  switch (type.name) {
    case "Boolean":
      if (value === null) return false;
      return value === "" || value.toLowerCase() === "true" ? true : false;
    case "Number":
      return Number(value);
    case "Object":
    case "Array":
      if (value === null) return null;
      return JSON.parse(value);
    default:
      return type(value);
  }
}
function convertToString(value: any, type: Function) {
  switch (type.name) {
    case "Object":
    case "Array":
      return JSON.stringify(value);
    default:
      return String(value);
  }
}

