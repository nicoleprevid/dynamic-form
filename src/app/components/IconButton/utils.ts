export type Modes = Record<
  | 'default'
  | 'active'
  | 'hover'
  | 'click',
  string
>;

export const BUTTON_STATE_VARIANTS: Modes = {
  default: `bg-transparent p-[5px]`,
  active: `bg-white p-[5px]`,
  hover: `bg-secundary p-[5px]`,
  click: `bg-gray-400 p-[5px]`,
} as const;

export const LABEL_STATE_VARIANTS: Modes = {
  default: `text-secondary font-normal`,
  active: `text-secondary font-normal`,
  hover: `text-secondary font-medium`,
  click: `text-secondary font-medium`,
} as const;
