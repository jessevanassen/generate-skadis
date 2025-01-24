/**
 * @param {never} arg
 * @returns {never}
 */
export function unreachable(arg) {
	throw new Error('unreachable');
}
