// query
export interface QueryOption<T> {
  onload?: string;
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
            if ((this as any)[options.onload])
            {
              (this as any)[options.onload].call(this, element);
            }
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
  verbose?: boolean;
  set?: (value:any)=>any;
  get?: (value:any)=>any;
}

const DefaultOptions:PropertyOption = {
  type: String,
  attribute: true,
  rerender: true,
  verbose: false,
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

      if (name === attributeName && !internal && newValue !== oldValue) {
        this[propertyKey] = convertFromString(newValue, _options.type);
      }
    };

    // Define property getter and setter
    Object.defineProperty(target, propertyKey, {
      get() {
        const data:any = this[`_${propertyKey}`];
        return options?.get ? options.get(data) : data;
      },
      set(value: any) {
        const valuestring = convertToString(value, _options.type);
        const oldvaluestring = convertToString(this[`_${propertyKey}`], _options.type)
        if (oldvaluestring === valuestring) {
          return;
        }

        const old = this[`_${propertyKey}`];
        this[`_${propertyKey}`] = options?.set ? options.set(value) : value;

        const operation = () => {
          if (_options.attribute) {
            internal = true;
            this.setAttribute(attributeName, valuestring);
            internal = false;
          }
  
          if (_options.onUpdate)
          {
            this[_options.onUpdate+"_attempts"] = 0;
            tryupdate.call(this, _options.onUpdate, value, old, !!_options.verbose);
          }
  
          if (_options.rerender)
          {
            this.debouncedRequestUpdate();
          }
        }

        if (!this.connected)
        {
          this._pendingOperations.push(operation)
          return;
        }

        operation();
      },
    });
  };
}

async function tryupdate(this:any, update:string, value:any, old:any, verbose:boolean) {
  if (verbose) 
  {
    console.log({
      message: 'calling update', 
      property: update, 
      value: this[update],
      attempt: this[update+"_attempts"]
    })
  }

  let ans:number|undefined = 10;
  if (this[update])
  {
    ans = await this[update](value, old);
  }

  if (typeof ans === "number")
  {
    if (this[update+"_attempts"] < ans)
    {
      this[update+"_attempts"]++;
      setTimeout(() => {
        tryupdate.call(this, update, value, old, verbose);
      }, 100)
    }
  }
}

function convertFromString(value:string|null, type:Function) {
  switch (type.name) 
  {
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
