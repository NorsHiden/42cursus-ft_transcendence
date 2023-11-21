import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as glob from 'glob';
import { transform } from '@svgr/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOLID_ICONS_DIR = path.resolve(__dirname, 'novaIcons/solid');
const OUTLINE_ICONS_DIR = path.resolve(__dirname, 'novaIcons/outline');
const INDEX_PATH = path.resolve(__dirname, 'novaIcons/index.tsx');

const solid_icons = glob.sync(`${SOLID_ICONS_DIR}/**.tsx`).map((icon) => {
  return {
    type: 'solid',
    iconPath: path.parse(icon).name,
    componentName: path.parse(icon).name + 'Solid',
  };
});
const outline_icons = glob.sync(`${OUTLINE_ICONS_DIR}/**.tsx`).map((icon) => {
  return {
    type: 'outline',
    iconPath: path.parse(icon).name,
    componentName: path.parse(icon).name + 'Outline',
  };
});

const icons = [...solid_icons, ...outline_icons];

for (const icon of icons) {
  const importLine = `import { default as ${icon.componentName} } from './${icon.type}/${icon.iconPath}';\n`;
  fs.appendFileSync(`${INDEX_PATH}`, importLine);
}

const exportLine = `\nexport {\n${icons.map((icon) => icon.componentName).join(',\n\t')}\n};\n`;
fs.appendFileSync(`${INDEX_PATH}`, exportLine);
