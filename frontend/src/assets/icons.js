import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as glob from 'glob';
import { transform } from '@svgr/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.resolve(__dirname, 'achievementsIcons');
const ICONS_OUTPUT_DIR = path.resolve(__dirname, 'achievementsIcons');

const toPascalCase = (str) => {
  return str
    .toLowerCase()
    .replace(/(\_|\-)(\w)/g, (m0, m1, m2) => m2.toUpperCase())
    .replace(/^\w/g, (m) => m.toUpperCase())
    .replace(/\s+/g, '');
};

const files = glob.sync(`${ICONS_DIR}/**.svg`);

const filesArray = files.map((file) => {
  return {
    svg: fs.readFileSync(file, 'utf8'),
    componentName: `${toPascalCase(path.parse(file).name)}`,
  };
});

const transformToJSX = (svg, componentName) => {
  const comp = transform.sync(
    svg,
    {
      jsxRuntime: 'automatic',
      expandProps: false,
      replaceAttrValues: { none: 'currentColor' },
      svgProps: { className: '{className}', viewBox: '0 0 24 24', 'aria-hidden': 'true' },
      plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
    },
    { componentName },
  );
  return comp
    .trim('\n')
    .split('\n')
    .slice(1, -2)
    .join('\n')
    .replace(/<svg[^>]*>/gs, (s) =>
      s.replace(/(width|height)={(24)}/g, (s, s1, s2) => `${s1}={size || ${s2}}`),
    );
};

const generateIcon = ({ svg, componentName }) => {
  const component = transformToJSX(svg, componentName);
  const fileTemplate = `import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const ${componentName}: React.FC<IconProps> = ({ size, className }) => {
  return (
${component}
  );
};

export default ${componentName};`;
  return fileTemplate;
};

for (const file of filesArray) {
  const fileIcon = generateIcon(file);
  // console.log(fileIcon, file.componentName);
  fs.writeFileSync(`${ICONS_OUTPUT_DIR}/${file.componentName}.tsx`, fileIcon);
}
