
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Firework as FireworkElement } from "../src";
import "../src/register.js";

// exporting
export { Firework as FireworkElement } from "../src";

export type Props = {
	interval?: number; // default-value: 500
	delay?: number; // [conditional]
	clusterSpawn?: number; // default-value: 3
	clusterSpawnRandom?: number; // default-value: 3
	clusterRadius?: number; // default-value: 20
	clusterInterval?: number;
	intervalrandom?: number; // default-value: 100
	intervalAmount?: number; // default-value: 2 [conditional]
	width?: number; // default-value: 100
	height?: number; // default-value: 100
	paused?: boolean;
	scope?: string; // [conditional]
	onDead?: (e: React.SyntheticEvent<FireworkElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	interval?: string; // default-value: 500
	delay?: string; // [conditional]
	"cluster-spawn"?: string; // default-value: 3
	"cluster-spawn-random"?: string; // default-value: 3
	"cluster-radius"?: string; // default-value: 20
	"cluster-interval"?: string;
	"interval-random"?: string; // default-value: 100
	"interval-amount"?: string; // default-value: 2 [conditional]
	width?: string; // default-value: 100
	height?: string; // default-value: 100
	paused?: string;
	scope?: string; // [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<FireworkElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-firework
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-firework>
  );
});

export const Firework = papHOC<FireworkElement, Props, Attributes>(Component);