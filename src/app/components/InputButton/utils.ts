type Sizes = Record<'sm' | 'md' | 'lg', string>;
type States = Record<
  | 'text'
  | 'solid'
  | 'outlined'
  | 'textSecondary'
  | 'solidSecondary'
  | 'outlinedSecondary',
  string
>;

export const ICON_SIZE_VARIANTS = {
  sm: {
    width: 16,
    height: 16,
  },
  md: {
    width: 18,
    height: 18,
  },
  lg: {
    width: 24,
    height: 24,
  },
};

export const CLASSES_BUTTON_SIZE_VARIANTS: Sizes = {
  sm: `w-fit h-6 rounded text-sm`,
  md: `w-fit h-8 rounded-md text-base`,
  lg: `w-fit h-10 rounded-lg text-base`,
} as const;

export const CLASSES_STATE_VARIANTS: States = {
  text: 'bg-transparent text-gray-600 uppercase tracking-wider border-none hover:text-gray-500',
  solid: `bg-secondary border-secondary hover:bg-secondaryHover text-gray-50 transition-all duration-500 ease-in-out`,
  outlined: `bg-transparent border-gray-600 text-gray-600 hover:text-gray-500 hover:border-gray-500`,
  textSecondary: `bg-transparent text-secondary uppercase tracking-wider border-none hover:text-secondary-medium`,
  solidSecondary: `bg-secondary border-secondary-dark text-gray-50 hover:bg-secondary-medium`,
  outlinedSecondary: `bg-transparent border-[#4A5568] text-[#4A5568] hover:text-gray-900 hover:border-gray-900 transition-all duration-500 ease-in-out`,
};
