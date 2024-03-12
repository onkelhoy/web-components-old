import React from "react";

export function papHOC<TElement extends HTMLElement, TProps = {}, TAttributes = {}>(
  WebComponent: React.ComponentType<TAttributes>,
) {
  type Props = React.JSX.LibraryManagedAttributes<typeof WebComponent, TProps> & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
  }

  const InternalComponent = React.forwardRef<TElement, Props>((props, forwardedRef) => {
    const internalRef = React.useRef<TElement>(null);
    const eventsAdded = React.useRef<Set<string>>(new Set());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
      if (typeof forwardedRef === "function") {
        forwardedRef(internalRef.current)
      }
      else if (forwardedRef) {
        forwardedRef.current = internalRef.current;
      }

      if (internalRef.current) setLoaded(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [internalRef.current]);


    const attributes: TAttributes = {
      class: props.className,
    } as TAttributes;

    // TODO use this to get property info later
    // const propertyConfig = internalRef.current.getProperties();

    if (internalRef.current) {
      for (let name in props) {
        if (name === "children") continue;

        if (typeof props[name as keyof Props] === "function") {
          // check if its event 
          if (name.startsWith('on')) // NOTE it would suck for functions that do in fact start with on..
          {
            if (eventsAdded.current.has(name)) {
              // we already added it !
              continue;
            }
            const eventname = extractEventName(name);
            if (eventname) {
              internalRef.current.addEventListener(eventname, props[name as keyof Props] as EventListenerOrEventListenerObject);
              eventsAdded.current.add(name);
              continue;
            }
          }

          // else we add this function directly to ref 
          internalRef.current[name as keyof TElement] = props[name as keyof Props];
        }
        else if (typeof props[name as keyof Props] === "object") {
          internalRef.current[name as keyof TElement] = props[name as keyof Props];
        }
        else {
          // primitive 
          // we should check if its available in the properties and if attribute is not false
          // internalRef.current[name as keyof TElement] = props[name as keyof Props];
          attributes[name as keyof TAttributes] = props[name as keyof Props];
        }
      }
    }

    return (
      <WebComponent
        ref={internalRef}
        {...attributes}
      >
        {props.children}
      </WebComponent>
    )
  });

  return React.memo(InternalComponent);
}

function extractEventName(name: string) {
  if (name.startsWith('on')) {
    return name
      .replace(/^on/, '')
      .replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  return null;
}