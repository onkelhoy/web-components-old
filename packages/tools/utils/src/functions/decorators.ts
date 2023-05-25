// property.ts
export interface Options {
  type: Function;
  attribute: boolean;
  rerender: boolean;
  onUpdate?: string;
}

const DefaultOptions:Options = {
  type: String,
  attribute: true,
  rerender: true,
}

export function property(options?: Partial<Options>) {
  const _options = options === undefined ? DefaultOptions : {...DefaultOptions, ...(options as Options)};

  return function (target: HTMLElement, propertyKey: string) {
    const attributeName = propertyKey.toLowerCase();
    let internal = false;

    // Observe attributes
    const observedAttributes = (target.constructor as any).observedAttributes || [];
    observedAttributes.push(attributeName);
    (target.constructor as any).observedAttributes = observedAttributes;

    // Handle attributeChangedCallback
    const attributeChanged = (target as any).attributeChangedCallback || function () { };
    (target as any).attributeChangedCallback = function (name: string, oldValue: any, newValue: any) {
      attributeChanged.call(this, name, oldValue, newValue);

      if (name === attributeName && !internal) {
        this[propertyKey] = convertFromString(newValue, _options.type);
      }
    };

    // Define property getter and setter
    Object.defineProperty(target, propertyKey, {
      get() {
        return this[`_${propertyKey}`];
      },
      set(value: any) {
        if (this[`_${propertyKey}`] === value) {
          return;
        }
        const old = this[`_${propertyKey}`];
        this[`_${propertyKey}`] = value;

        if (_options.attribute) {
          internal = true;
          this.setAttribute(attributeName, convertToString(value, _options.type).toLowerCase());
          internal = false;
        }

        if (_options.onUpdate)
        {
          this[_options.onUpdate].call(this, value, old);
        }

        if (_options.rerender)
        {
          this.debouncedRequestUpdate();
        }
      },
    });
  };
}

function convertFromString(value:string, type:Function) {
  switch (type.name) 
  {
    case "Boolean":
      return value.toLowerCase() === "true" ? true : false;
    case "Number":
      return Number(value);
    case "Object":
    case "Array":
      return JSON.parse(value);
    default:
      return type(value);
  }
}
function convertToString(value:any, type:Function) {
  switch (type.name) 
  {
    case "Object":
    case "Array":
      return JSON.stringify(value);
    default:
      return String(value);
  }
}
