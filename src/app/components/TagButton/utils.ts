
export type Status = `default` | `inactive` | `selectPrimary`;
export type Sizes = `sm` | `md` | `lg`;

export const COLOR_BG: Record<Status, string> = {
  default: `bg-gray-100 border-gray-300`,
  inactive: `bg-gray-200 border-gray-300`,
  selectPrimary: `bg-primary border-gray-100`,
} as const;

export const COLOR_FONT: Record<Status, string> = {
  default: `text-gray-600`,
  inactive: `text-gray-500`,
  selectPrimary: `text-gray-50 font-bold`,
} as const;

export const BUTTON_SIZE_VARIANTS: Record<Sizes, string> = {
  sm: `rounded py-1 px-4`,
  md: `rounded-md py-1 px-4`,
  lg: `rounded-lg py-2 px-4`,
} as const;
export const TEXT_SIZE_VARIANTS: Record<Sizes, string> = {
  sm: `text-sm `,
  md: `text-base `,
  lg: `text-lg `,
} as const;
