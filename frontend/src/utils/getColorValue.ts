import resolveConfig from 'tailwindcss/resolveConfig';
// @ts-ignore
import tailwindConfig from '../../tailwind.config.js';

const { theme } = resolveConfig(tailwindConfig);

export const getColorValue = (colorName: string, shade: string) => {
  // console.log(theme.colors[colorName][shade]);
  return theme.colors[colorName][shade];
};
