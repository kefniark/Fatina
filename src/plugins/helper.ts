/**
 * Get Root object
 *
 * @ignore
 * @private
 * @param {*} obj
 * @param {string} property
 * @returns
 */
export function getRoot(obj: any, property: string) {
	const path = property.split('.');
	let ret = obj;
	for (let i = 0; i < path.length - 1; i++) {
		ret = ret[path[i]];
	}
	return ret;
}

/**
 * Get Object Property
 *
 * @ignore
 * @private
 * @param {string} property
 * @returns
 */
export function getProp(property: string) {
	const path = property.split('.');
	return path[path.length - 1];
}

/**
 * Get Object Property object
 *
 * @ignore
 * @private
 * @param {string} property
 * @param {*} value
 * @returns
 */
export function getData(property: string, value: any) {
	const data = {} as any;

	data[getProp(property)] = value;
	return data;
}
