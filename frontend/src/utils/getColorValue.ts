import resolveConfig from 'tailwindcss/resolveConfig';
// @ts-ignore
import tailwindConfig from '../../tailwind.config.js';

const { theme } = resolveConfig(tailwindConfig);

export const getColorValue = (colorName: string, shade?: string) => {
  if (shade) return theme.colors[colorName][shade];
  else return theme.colors[colorName];
};
