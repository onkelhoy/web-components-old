
import React from 'react';

// TODO EventHandler should be types to we extend EventMap and check keyof blabla..
// https://stackoverflow.com/questions/43001679/how-do-you-create-custom-event-in-typescript
import { EventMap, EventInfo, EventHandler } from './types';

export function extractName(prop: string) {
  if (prop.startsWith('on')) {
    return prop
      .replace(/^on/, '')
      .replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  return null;
}
export function add<T extends HTMLElement>(ref: React.RefObject<T>, eventmap: React.MutableRefObject<EventMap>, prop: string, eventname: string, handler: EventHandler) {
  if (!handler) {
    if (eventmap.current[prop]) {
      deregisterEvent<T>(ref, eventmap.current[prop]);
      delete eventmap.current[prop];
    }
    return;
  }

  if (!eventmap.current[prop]) {
    eventmap.current[prop] = {
      name: eventname,
      handler
    }
  }
  else if (eventmap.current[prop].handler === handler) {
    // the function is the same
    return;
  }
  else {
    deregisterEvent<T>(ref, eventmap.current[prop]);
    eventmap.current[prop].handler = handler;
  }

  registerEvent<T>(ref, eventmap.current[prop])
}
export function loadAll<T extends HTMLElement>(internalref: React.RefObject<T>, forwardref: React.ForwardedRef<any>, eventmap: React.MutableRefObject<EventMap>) {
  if (internalref.current) {
    for (let prop in eventmap.current) {
      const info = eventmap.current[prop];
      internalref.current.addEventListener(info.name, info.handler);
    }
  }

  if (typeof forwardref === "function") {
    forwardref(internalref.current)
  }
  else if (forwardref) {
    forwardref.current = internalref.current;
  }
}
export function unloadAll<T extends HTMLElement>(ref: React.RefObject<T>, eventmap: React.MutableRefObject<EventMap>) {
  if (ref.current) {
    for (let prop in eventmap.current) {
      const info = eventmap.current[prop];
      ref.current.removeEventListener(info.name, info.handler);
    }
  }
}

// helper functions
function registerEvent<T extends HTMLElement>(ref: React.RefObject<T>, info: EventInfo) {
  if (ref.current) {
    ref.current.addEventListener(info.name, info.handler);
  }
}
function deregisterEvent<T extends HTMLElement>(ref: React.RefObject<T>, info: EventInfo) {
  if (ref.current) {
    ref.current.removeEventListener(info.name, info.handler);
  }
}