const SPACING = 20;

/** @typedef {'full' | 'even' | 'uneven' } Fill */

/**
 * @typedef {object} Options
 * @property {number} rows
 * @property {number} columns
 * @property {Fill} [fill]
 **/

/**
 * @param {Options} options
 * @returns {string}
 */
export function generateSkadis({ rows, columns, fill = 'uneven' }) {
	if (
		!Number.isSafeInteger(rows) || rows < 1 ||
		!Number.isSafeInteger(columns) || columns < 1
	) {
		throw new Error('Rows and columns should be integers, and at least 1');
	}

	const width = (columns + 1) * SPACING;
	const height = (rows + 1) * SPACING;

	const slots = [];
	for (let row = 0; row < rows; row++) {
		for (let column = 0; column < columns; column++) {
			const even = (row % 2 == 0) == (column % 2 == 0);

			if (fill === 'full' || even == (fill == 'even')) {
				const x = (column + 1) * SPACING;
				const y = (row + 1) * SPACING;
				slots.push(slot(x, y));
			}
		}
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}mm" height="${height}mm">
	<path d="${board(width, height)} ${slots.join(' ')}"/>
</svg>`;
}

/**
 * @param {number} width
 * @param {number} height
 * @returns {string}
 */
function board(width, height) {
	const R = 8;

	return `M 0 8 ` +
		`a ${R} ${R} 90 0 1 ${R} -${R} ` +
		`h ${width - 2 * R} ` +
		`a ${R} ${R} 90 0 1 ${R} ${R} ` +
		`v ${height - 2 * R} ` +
		`a ${R} ${R} 90 0 1 -${R} ${R} ` +
		`h -${width - 2 * R} ` +
		`a ${R} ${R} 90 0 1 -${R} -${R} ` +
		'z';
}

/**
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
function slot(x, y) {
	const W = 5;
	const H = 15;
	const R = W / 2;

	return `M ${x + R} ${y - H / 2 + R} ` +
		`a ${R} ${R} 180 0 0 -${W} 0 ` +
		`v ${H - R * 2} ` +
		`a ${R} ${R} 180 0 0 ${W} 0 ` +
		'z';
}

/**
 * @param {number} width  - The target width, in mm
 * @param {number} height - The target height, in mm
 * @returns {{ rows: number, columns: number }}
 */
export function gridFromDimensions(width, height) {
	const columns = Math.floor(width / 20 - 1);
	const rows = Math.floor(height / SPACING - 1);
	return { rows, columns };
}
