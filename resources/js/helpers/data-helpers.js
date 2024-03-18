import { get } from 'radash';
import {
    isArray,
    isObject,
    isString,
    filterTrueKeys,
} from '@/helpers/type-helpers'

import { valueIfFilled } from '@/helpers/data-validation';

export const ObjectGet = (item, notation, defaultValue = null) => {
    if (!isObject(item)) {
        return defaultValue;
    }

    notation = valueIfFilled(notation);

    if (!(isString(notation) || isArray(notation) || isObject(notation))) {
        return defaultValue;
    }

    if (isString(notation)) {
        return get(item, notation, defaultValue);
    }

    if (isObject(notation)) {
        notation = filterTrueKeys(notation);
    }

    notation = isArray(notation) ? notation.join('.') : notation;

    notation = valueIfFilled(notation);

    return isString(notation) ? get(item, notation, defaultValue): defaultValue;
}

export const __get = (item, notation, defaultValue = null) => ObjectGet(item, notation, defaultValue);
