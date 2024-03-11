
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Firework as FireworkElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Firework as FireworkElement } from "../src";

export type Props = {
	interval?: number; // default-value: 500 [conditional]
	delay?: number;
	clusterSpawn?: number; // default-value: 3 [conditional]
	clusterSpawnRandom?: number; // default-value: 3 [conditional]
	clusterRadius?: number; // default-value: 20 [conditional]
	clusterInterval?: number;
	intervalrandom?: number; // default-value: 100 [conditional]
	intervalAmount?: number; // default-value: 2
	width?: number; // default-value: 100 [conditional]
	height?: number; // default-value: 100 [conditional]
	paused?: boolean;
	scope?: string;
	onDead?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	interval?: string; // default-value: 500 [conditional]
	delay?: string;
	"cluster-spawn"?: string; // default-value: 3 [conditional]
	"cluster-spawn-random"?: string; // default-value: 3 [conditional]
	"cluster-radius"?: string; // default-value: 20 [conditional]
	"cluster-interval"?: string;
	"interval-random"?: string; // default-value: 100 [conditional]
	"interval-amount"?: string; // default-value: 2
	width?: string; // default-value: 100 [conditional]
	height?: string; // default-value: 100 [conditional]
	paused?: string;
	scope?: string;
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