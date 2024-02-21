import React, { forwardRef, useEffect, useRef } from "react";

import { loadAll, unloadAll, add, extractName, EventMap, EventHandler } from "@pap-it/system-react";

// web components

import { Message as MessageElement } from "@pap-it/chat";
import "@pap-it/chat/wc";

// we also want to export our element's
export { Message as MessageElement } from "@pap-it/chat";

export type Props = PapReactElement<MessageAttributes> & {
  onClick?: EventHandler;
}

export const Message = forwardRef<MessageElement, Props>((props, forwardref) => {
  const { children, onClick, ...restprops } = props;

  const internalref = useRef<MessageElement>(null);
  const eventmap = useRef<EventMap>({});

  useEffect(() => {
    loadAll(internalref, forwardref, eventmap);

    return () => {
      unloadAll(internalref, eventmap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalref.current]);

  useEffect(() => {
    const propnames = Object.keys(props) as Array<keyof Props>;
    for (const name of propnames) {
      if (typeof props[name] === "function") {
        const eventname = extractName(name);
        if (eventname) {
          add(internalref, eventmap, name, eventname, props[name] as unknown as EventListener);
        }
        else {
          console.log(`[warn]: (pap-react: button) inserting event failed - ${String(name)} not a event`);
        }
      }
      else if (props[name] instanceof Object) {
        // conver to string ? 
      }
    }
  }, [props]);

  return (
    <pap-message
      {...restprops}
      class={props.className}
      ref={internalref}
    >
      {children}
    </pap-message>
  )
})