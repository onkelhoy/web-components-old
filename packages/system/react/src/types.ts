
export type EventHandler = (event: Event | CustomEvent) => void;
export type EventInfo = { name: string; handler: EventHandler };
export type EventMap = Record<string, EventInfo>;