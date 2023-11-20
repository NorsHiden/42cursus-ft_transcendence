import fs from 'fs';
import path from 'path';
// import glob from 'glob';
import svgr from '@svgr/core';

const ICONS_DIR = path.resolve('../src/assets/novaIcons.svg');
const ICONS_OUTPUT_DIR = path.resolve('../src/assets/novaIcons');

console.log(ICONS_DIR, ICONS_OUTPUT_DIR);
