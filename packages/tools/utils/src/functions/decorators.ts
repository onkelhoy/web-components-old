// query
export interface QueryOption<T> {
  onload?(element:T):void;
  selector: string;
}
type queryParam<T> = string|QueryOption<T>;

export function query<T extends Element = HTMLElement>(options:queryParam<T>) {
  const selector = typeof options === "string" ? options : options.selector;

  return function (target:HTMLElement, propertyKey: string) {
    const renderattemptsKey = propertyKey+'rerender_attempts_';
    const timeoutattemptsKey = propertyKey+'timeout_attempts_';

    // Store the original connectedCallback, if it exists
    const originalConnectedCallback = (target as any).connectedCallback || function() {};

    // Override connectedCallback
    (target as any).connectedCallback = function() {
      // Call the original connectedCallback
      originalConnectedCallback.call(this);

      // init the search
      initsearch.call(this);
    };


    function initsearch(this:any) {
      if (!search.call(this)) 
      {
        rendersearch.call(this);
      }
    }
    function rendersearch(this:any) {
      let attempts = this[renderattemptsKey] || 0;
      attempts++;
      if (!search.call(this) && attempts < 5)
      {
        this[timeoutattemptsKey] = 0;
        this[renderattemptsKey] = attempts;
        setTimeout(() => timeoutsearch.call(this), 100);

        if (this.callAfterUpdate) this.callAfterUpdate.push(() => rendersearch.call(this));
      }
    }
    function timeoutsearch(this:any) {
      let attempts = this[timeoutattemptsKey] || 0;
      attempts++;
      if (!search.call(this) && attempts < 3)
      {
        this[timeoutattemptsKey] = attempts;
        setTimeout(() => timeoutsearch.call(this), 100);
      }
    }
    function search(this:HTMLElement) {
      if ((this as any)[propertyKey]) return true;

      if (this.shadowRoot)
      {
        const element = this.shadowRoot.querySelector<T>(selector);
        if (element)
        {
          (this as any)[propertyKey] = element;

          if (typeof options === "object" && options.onload)
          {
            options.onload(element);
          }

          return true;
        }
      }

      return false;
    }
  }
}

// property.ts
export interface PropertyOption {
  type: Function;
  attribute: boolean;
  rerender: boolean;
  onUpdate?: string;
}

const DefaultOptions:PropertyOption = {
  type: String,
  attribute: true,
  rerender: true,
}

export function property(options?: Partial<PropertyOption>) {
  const _options = options === undefined ? DefaultOptions : {...DefaultOptions, ...(options as PropertyOption)};

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
