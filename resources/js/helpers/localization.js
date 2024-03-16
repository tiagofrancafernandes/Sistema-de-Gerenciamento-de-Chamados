import { get } from 'radash';
import { usePage } from '@inertiajs/vue3'

const page = usePage();

export const getPageAppProps = (key = null, defaultValue = null) => {
    let appProps = page.props.app || {};

    if (!appProps) {
        return defaultValue;
    }

    return  (key === null) ? appProps: get(appProps, key, defaultValue);
}

export const getLocale = (defaultValue = 'en') => {
    return getPageAppProps('locale', defaultValue);
}

export const getTranslations = () => {
    return getPageAppProps('translations', {});
}

export const translate = (
    params = {
        key: null,
        replacers: {},
        locale: null,
        defaultValue: null,
    },
) => {
    let {
        key,
        locale,
        replacers,
        defaultValue,
    } = (params || {});

    defaultValue = (defaultValue !== null) ? defaultValue : null;

    if (!key) {
        return defaultValue;
    }

    locale = locale ? locale : getLocale();

    let originalKey = key;
    key = !(`${key}`).includes('.') ? `*.${key}` : key;

    let splitedKey = (`${key}`).split('.');
    let namespace = splitedKey.slice(0, 1);
    let restOfKeys = splitedKey.slice(1);

    let newKey = [
        namespace,
        locale,
        ...restOfKeys,
    ].filter(item => item).join('.');

    return get(getTranslations(), newKey, (defaultValue || originalKey));
}

export const lang = (
    key = null,
    replacers = null,
    locale = null,
    defaultValue = null,
) => {
    let params = (typeof key === 'object') ? key : {
        key: (key && (typeof key === 'string')) ? key : null,
        replacers: (replacers && (typeof replacers === 'object')) ? replacers : {},
        locale: (locale && (typeof locale === 'string')) ? locale : null,
        defaultValue: (defaultValue && (typeof defaultValue === 'string')) ? defaultValue : null,
    };

    return localization.translate(params)
}
