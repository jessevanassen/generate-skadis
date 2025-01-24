#!/usr/bin/env node

import { generateSkadis, gridFromDimensions } from '#lib/index.js';
import { exit, argv } from 'node:process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const width = Number(argv[2]);
const height = Number(argv[3]);

if (Number.isNaN(width) || Number.isNaN(height)) {
	const { description } = JSON.parse(readFileSync(resolve(import.meta.dirname, '../package.json'), 'utf-8'));

	console.error(`${description}

The generated board might be smaller than the given dimensions, in case the
dimensions wouldn't match with the rows and column dimensions.

Usage: generate-skadis <WIDTH> <HEIGHT>

Options:
  <WIDTH>  The maximum width of the board, in mm.
  <HEIGHT> The maximum height of the board, in mm.`);
	exit(1);
}

const { rows, columns } = gridFromDimensions(width, height);
const skadis = generateSkadis({ rows, columns });

console.log(skadis);
