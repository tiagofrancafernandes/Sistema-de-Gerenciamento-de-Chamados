import {
    isArray,
    isObject,
    isNumeric,
    isString,
    typeofIs,
} from '@/helpers/type-helpers'

import { getLocale } from '@/helpers/localization';

export {
    isArray,
    isObject,
    isNumeric,
    isString,
};

export const itemIsFilled = (value = null) => {
    if (!value && value !== false) {
        return false;
    }

    if (isArray(value)) {
        return Boolean(value.length);
    }

    if (isObject(value) && typeofIs(value, 'Object')) {
        return Boolean(Object.keys(value).length);
    }

    if (isNumeric(value)) {
        return true;
    }

    if (isString(value)) {
        return Boolean((`${value}`).trim());
    }

    return Boolean(value);
}

export const isDateValid = (dateOrStr) => {
    // Exemplos de uso
    // isDateValid("2024/03/17"); // true
    // isDateValid("2024/13/17"); // false
    // isDateValid(new Date()); // true

    return !isNaN(new Date(dateOrStr));
}

export const getAsDateIfIsValid = (dateOrStr, defaultValue = null) => {
    if (!itemIsFilled(dateOrStr) || !isDateValid(dateOrStr)) {
        return defaultValue;
    }

    return new Date(dateOrStr);
}

export const formatDate = (date, locale = null) => {
    date = valueIfFilled(date);

    if (!date || !(isString(date) || typeofIs(date, 'Date'))) {
        return null;
    }

    locale = locale ? locale : getLocale('en');
    locale = (`${locale}`).replace('_', '-');

    let generators = {
        now() {
            return (new Date());
        },
    };

    if (Object.keys(generators).includes(date)) {
        date = generators[`${date}`](date);
    }

    let newDate = getAsDateIfIsValid(date);

    return newDate ? newDate.toLocaleString(locale) : null;
}

export const nullSafe = (...values) => {
    let value = null;
    let place = '#NV#';
    for (let i = 0; i < values.length; i++) {
        let nVal = values[i] ?? place;
        nVal = (nVal === place) ? null : nVal;

        if (nVal) {
            return nVal;
        }

        if (!nVal && !(isNaN(nVal) || nVal === null)) {
            return nVal;
        }

        value = nVal;
    }

    return value;
}

export const filled = (value) => itemIsFilled(value);
export const notFilled = (value) => !itemIsFilled(value);
export const empty = (value) => !itemIsFilled(value);
export const valueIfFilled = (value, defaultValue = null) => {
    if (!itemIsFilled(value)) {
        return defaultValue;
    }

    if (isString(value) && !Boolean((`${value}`).trim())) {
        return defaultValue;
    }

    return value;
};
