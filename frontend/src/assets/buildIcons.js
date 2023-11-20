import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as glob from 'glob';
import { transform } from '@svgr/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.resolve(__dirname, 'novaIcons.svg/test');
const ICONS_OUTPUT_DIR = path.resolve(__dirname, 'novaIcons/test');

const iconComponentTemplate = ({ template }, opts, { imports, componentName, jsx }) =>
  template.smart({ plugins: ['typescript'] }).ast`
        ${imports}
        ${'\n'}
        export const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
    `;

const icons = glob.sync(`${ICONS_DIR}/**.svg`);

const toPascalCase = (str) => {
  return str
    .replace(/(\_|\-)(\w)/g, (m0, m1, m2) => m2.toUpperCase())
    .replace(/^\w/g, (m) => m.toUpperCase());
};

for (const icon of icons) {
  const svg = fs.readFileSync(icon, 'utf8');

  const componentName = toPascalCase(path.parse(icon).name);

  const componentCode = transform.sync(
    svg,
    {
      template: iconComponentTemplate,
      // 1. Clean SVG files using SVGO
      // 2. Generate JSX
      // 3. Format the result using Prettier
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
      // Replace hardcoded colors with `currentColor`
      svgoConfig: {
        // plugins: [{ name: 'preset-default', convertColors: { currentColor: true } }],
      },
      // Replace dimentions
      svgProps: { height: 32, width: 32, viewBox: '0 0 32 32' },
    },
    { componentName },
  );

  fs.writeFileSync(`${ICONS_OUTPUT_DIR}/${componentName}.tsx`, componentCode);
}
