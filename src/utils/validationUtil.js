/**
 * Method to check if a value is null, undefined, an empty string, an empty array, or an empty object.
 *
 * @param {*} value - The value to be checked.
 * @returns {boolean} - Returns true if the value is null, undefined, an empty string, an empty array, or an empty object; otherwise, returns false.
 */
const isNullOrEmpty = (value) => {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === 'string' && value.trim() === '') {
        return true;
    }

    if (Array.isArray(value) && value.length === 0) {
        return true;
    }

    if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
        return true;
    }

    return false;
};

export { isNullOrEmpty };
