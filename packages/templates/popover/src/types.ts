// NOTE these are just for example purposes

type TB = 'top' | 'bottom';
type LR = 'left' | 'right';

export type Reveal = 'hover' | 'click';
export type Placement = `${TB}-${LR | 'center'}` | `${LR}-${TB | 'center'}`;
export type Box = { x: number; y: number; w: number; h: number };

export type TBLR = TB | LR;
export const OPPOSITE: Record<TBLR, TBLR> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};