// NOTE these are just for example purposes

type TB = 'top' | 'bottom';
type LR = 'left' | 'right';

export type Reveal = 'hover' | 'click';
export type Placement = `${TB}-${LR | 'center'}` | `${LR}-${TB | 'center'}`;