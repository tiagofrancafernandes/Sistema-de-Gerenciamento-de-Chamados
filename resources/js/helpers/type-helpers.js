export const filterObject = (objectItem, onlyKeys = false) => {
    if (!objectItem || typeof objectItem !== 'object' || Array.isArray(objectItem)) {
        return defaultValue;
    }

    let result = Object.fromEntries(Object.entries(objectItem).filter(item => item[1]));

    return onlyKeys ? Object.keys(result) : result;
};

export const filterTrueKeys = (objectItem, defaultValue = []) => {
    if (!objectItem || typeof objectItem !== 'object') {
        return defaultValue;
    }

    if (Array.isArray(objectItem)) {
        return objectItem.filter(item => item);
    }

    return filterObject(objectItem, true);
}

export const isArray = (value) => {
    return value && Array.isArray(value);
}

export const isObject = (value) => {
    return value && (typeof value === 'object') && !Array.isArray(value);
}

export const isString = (value) => {
    return (typeof value === 'string');
}

export const isNumeric = (value) => {
    return !isNaN(Number(value));
}

export const isFunction = (value) => {
    return value && typeof value === 'function' && value.constructor.name === 'Function';
}

export const getConstructorName = (value) => {
    if (!isObject(value)) {
        return null;
    }

    return value.constructor.name;
}

export const typeofIs = (value, toCheck) => {
    if (!toCheck) {
        return false;
    }

    try {
        if (isString(toCheck) && typeof value === toCheck) {
            return true;
        }

        if (!isString(toCheck) && typeof toCheck === 'function' && toCheck.name) {
            return [toCheck.name, `${toCheck.name}`.toLowerCase()].includes(value.constructor.name);
        }

        return value.constructor.name === (toCheck.substr(0, 1).toUpperCase() + toCheck.substr(1));
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const matchOr = (value, collection, defaultValue = null) => {
    if (typeof collection !== 'object') {
        return defaultValue;
    }

    if (Array.isArray(collection)) {
        return collection.includes(value) ? value : defaultValue;
    }

    value = ['string', 'number'].includes(typeof value) ? value : 'NO_VAL';

    if (value === 'NO_VAL') {
        return defaultValue;
    }

    return (value in collection) ? collection[value] : defaultValue;
}
