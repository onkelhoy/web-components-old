import { NextParent } from '../functions/helpers';

// query
export interface QueryOption<T> {
  onload?: string;
  selector: string;
}
type queryParam<T> = string | QueryOption<T>;

export function query<T extends Element = HTMLElement>(options: queryParam<T>) {
  const selector = typeof options === "string" ? options : options.selector;

  return function (target: HTMLElement, propertyKey: string) {
    const renderattemptsKey = propertyKey + 'rerender_attempts_';
    const timeoutattemptsKey = propertyKey + 'timeout_attempts_';

    // Store the original connectedCallback, if it exists
    const originalConnectedCallback = (target as any).connectedCallback || function () { };

    // Override connectedCallback
    (target as any).connectedCallback = function () {
      // Call the original connectedCallback
      originalConnectedCallback.call(this);

      // init the search
      initsearch.call(this);
    };
    function initsearch(this: any) {
      if (!search.call(this)) {
        rendersearch.call(this);
      }
    }
    function rendersearch(this: any) {
      let attempts = this[renderattemptsKey] || 0;
      attempts++;
      if (!search.call(this) && attempts < 5) {
        this[timeoutattemptsKey] = 0;
        this[renderattemptsKey] = attempts;
        setTimeout(() => timeoutsearch.call(this), 100);

        if (this.callAfterUpdate) this.callAfterUpdate.push(() => rendersearch.call(this));
      }
    }
    function timeoutsearch(this: any) {
      let attempts = this[timeoutattemptsKey] || 0;
      attempts++;
      if (!search.call(this) && attempts < 3) {
        this[timeoutattemptsKey] = attempts;
        setTimeout(() => timeoutsearch.call(this), 100);
      }
    }
    function search(this: HTMLElement) {
      if ((this as any)[propertyKey]) return true;

      if (this.shadowRoot) {
        const element = this.shadowRoot.querySelector<T>(selector);
        if (element) {
          (this as any)[propertyKey] = element;

          if (typeof options === "object" && options.onload) {
            if ((this as any)[options.onload]) {
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

// context.ts
export interface ContextOption {
  name?: string;
  attribute?: string;
  rerender?: boolean;
  verbose?: boolean;
  onUpdate?: string;
  // You can add more options here as needed
}

const DefaultContextOption: ContextOption = {
  rerender: true,
  verbose: false,
}

export function context(options?: ContextOption) {
  const _options = JSON.parse(JSON.stringify(options === undefined ? DefaultContextOption : { ...DefaultContextOption, ...(options as ContextOption) }));

  return function (target: any, propertyKey: string) {
    // assign default values 
    if (!_options.name) _options.name = propertyKey;
    if (!_options.attribute) _options.attribute = propertyKey;


    // Storing original connectedCallback if it exists
    const originalConnectedCallback = target.connectedCallback;

    // Override the connectedCallback to set up context subscription
    target.connectedCallback = function () {
      const me = this;
      const contextname = _options.name + "_subcontext";
      me[contextname] = true;

      // Call original connectedCallback if it exists
      if (originalConnectedCallback) originalConnectedCallback.call(me);

      if (_options.verbose) console.log("connected-callback", _options)

      let parent = NextParent(me) as any;

      while (parent) {
        // check if parent is our selector
        if (_options.verbose) console.log('finding parent', parent);

        // NOTE we need to find the orignal parent so we need to make sure it does not have the name with "{name}_subcontext" also
        if (_options.name as string in parent && !(contextname in parent)) {
          break;
        }
        if (_options.attribute && parent.hasAttribute(_options.attribute) && !(contextname in parent)) {
          break;
        }

        if (_options.verbose) {
          console.log('did not find', _options.name, 'in', parent)
        }

        if (parent === document.documentElement) {
          parent = null;
          break;
        }
        parent = NextParent(parent);
      }

      if (_options.verbose) console.log('final parent', parent);

      if (parent) {

        const operation = () => {
          if (_options.verbose) console.log('context-update', _options.name, _options.attribute)

          const old = me[_options.name as string];
          if (_options.name as string in parent) {
            me[_options.name as string] = parent[_options.name as string];
          }
          else if (_options.attribute && parent.hasAttribute(_options.attribute)) {
            me[_options.name as string] = parent.getAttribute(_options.attribute);
          }

          if (_options.onUpdate) {
            me[_options.onUpdate + "_attempts"] = 0;
            tryupdate.call(me, _options.onUpdate, me[_options.name as string], old, !!_options.verbose);
          }

          if (_options.rerender) {
            me.debouncedRequestUpdate();
          }
        }

        // init value
        operation();

        // Subscribe to context changes
        parent.addEventListener(`context-${_options.name}`, operation);
        // if (DEV_MODE) parent.addEventListener('context-manual-change', operation);
        parent.addEventListener('context-manual-change-banana', operation);
      } else {
        console.warn(`Context provider for '${_options.name}' not found.`);
      }
    }
  }
}

// property.ts
export enum Spread {
  BREAKOUT = 1,
}
export interface PropertyOption {
  type: Function;
  attribute: boolean | string;
  rerender: boolean;
  onUpdate?: string;
  context?: boolean;
  verbose?: boolean;
  spread?: string | Spread | boolean;
  set?: (value: any) => any;
  get?: (value: any) => any;
}

const DefaultPropertyOptions: PropertyOption = {
  type: String,
  attribute: true,
  rerender: true,
  verbose: false,
}

export function property(options?: Partial<PropertyOption>) {
  const _options = options === undefined ? DefaultPropertyOptions : { ...DefaultPropertyOptions, ...(options as PropertyOption) };

  return function (target: HTMLElement, propertyKey: string) {
    const attributeName = (typeof _options.attribute === "string" ? _options.attribute : propertyKey).toLowerCase();
    const spreadAttributeNames: Record<string, boolean> = {};
    let internal = false;

    // Observe attributes
    const observedAttributes = (target.constructor as any).observedAttributes || [];

    // NOTE spread is not working, at this point the objedct havent been defined yet, 
    // we need to keep track if we defined this and in the setter we should do this work 
    // if not done already - so keep track if we did this setup (setup being to add to 'observedAttributes')
    if (_options.spread) {
      console.log('spread yes!', (target.constructor as any)[propertyKey])
      spreadAttributes(
        _options.spread === Spread.BREAKOUT ? "" : typeof _options.spread === "string" ? _options.spread : attributeName,
        (target.constructor as any)[propertyKey],
        (name) => {
          console.log('adding spread', name)
          observedAttributes.push(name);
          spreadAttributeNames[name] = true;
        }
      )
    }
    else {
      observedAttributes.push(attributeName);
    }
    (target.constructor as any).observedAttributes = observedAttributes;

    // Handle attributeChangedCallback
    const attributeChanged = (target as any).attributeChangedCallback || function () { };
    (target as any).attributeChangedCallback = function (name: string, oldValue: any, newValue: any) {
      // how many times is the same code going to be called?
      attributeChanged.call(this, name, oldValue, newValue);

      if ((name === attributeName || spreadAttributeNames[name]) && !internal && newValue !== oldValue) {
        if (_options.verbose) console.log('attribute is set', attributeName);

        // NOTE spread is not working, perhaps with the attribute changes updated this part should work
        if (_options.spread) {
          const keys = name.split("-");
          let newobject = this[propertyKey];

          let target = newobject;
          for (let i = 0; i < keys.length; i++) {
            if (i !== keys.length - 1) {
              target = target[keys[i]];
            }
            else {
              target[keys[i]] = convertFromStringPrimitive(newValue);
            }
          }
          this[propertyKey] = newobject;
        }
        else {
          this[propertyKey] = convertFromString(newValue, _options.type);
        }
      }
    };

    // Define property getter and setter
    Object.defineProperty(target, propertyKey, {
      get() {
        const data: any = this[`_${propertyKey}`];
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
          // we want to use spread over attribute (I guess?)
          if (_options.spread) {
            if (_options.verbose) console.log('property is set, setting attribute', attributeName);
            // NOTE for spread we need to assign each attribute 
          }
          else if (_options.attribute) {

            internal = true;
            if (value === undefined) {
              // TODO need to check if this would cause issues with type:boolean = true values - is value true or undefined?
              this.removeAttribute(attributeName);
            }
            else {
              this.setAttribute(attributeName, valuestring);
            }
            internal = false;
          }

          if (_options.onUpdate) {
            this[_options.onUpdate + "_attempts"] = 0;
            tryupdate.call(this, _options.onUpdate, value, old, !!_options.verbose);
          }

          if (_options.rerender) {
            this.debouncedRequestUpdate();
          }

          if (_options.verbose) console.log('update')

          if (_options.context) {
            this.dispatchEvent(new Event(`context-${propertyKey}`));
          }
        }

        if (!this.connected) {
          this._pendingOperations.push(operation)
          return;
        }

        operation();
      },
    });
  };
}

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
  if (this[update]) {
    ans = await this[update](value, old);
  }

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
function convertFromString(value: string | null, type: Function) {
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
function spreadAttributes(parentKey: string, object: Record<string, any>, callback: (name: string) => void) {
  console.log('spread object?', object)
  for (let key in object) {
    console.log('spead jey', key)
    let nextname = parentKey === "" ? key : `${parentKey}-${key}`;

    if (object[key] instanceof Array) {
      // like wtf.. 
      throw new Error("[LAZY] since I dont know yet what case this could be I will throw a error until I meet it and fix it then... your're welcome future Henry!");
    }
    else if (object[key] instanceof Object) {
      spreadAttributes(nextname, object[key], callback);
    }
    else {
      callback(nextname);
    }
  }
}

