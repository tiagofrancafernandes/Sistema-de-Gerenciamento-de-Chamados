export const validStringOr = (value = null, defaultValue = '') => {
    defaultValue = defaultValue && (typeof defaultValue === 'string') && `${defaultValue}`.trim()
        ? `${defaultValue}`.trim() : '' ;

    if (!value) {
        return defaultValue;
    }

    return value && (typeof value === 'string') && `${value}`.trim()
        ? `${value}`.trim() : defaultValue;
}

export const lcFirst = (value) => {
    value = validStringOr(value);
    return value.substr(0, 1).toLowerCase() + value.substr(1);
}

export const ucFirst = (value) => {
    value = validStringOr(value);
    return value.substr(0, 1).toUpperCase() + value.substr(1);
}

export const toTitle = (value) => {
    value = validStringOr(value);

    return value
        .trim()
        .split(' ')
        .filter(item => item)
        .map(item => ucFirst(item.toLowerCase()))
        .join(' ')
}

export const randomString = (lenght = 15, options = {
    fromChars: null,
    salt: null,
    numbersOnly: false,
}) => {
    options = options && (typeof options === 'object') && !Array.isArray(options) ? options : {};

    let {
        fromChars,
        salt,
        numbersOnly,
    } = options;

    fromChars = validStringOr(fromChars);

    let result = '';
    let time = () => (new Date).getTime();
    let numbers = '0123456789';
    let azUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let azLower = 'abcdefghijklmnopqrstuvwxyz';
    let randomNumbers = (Math.random() + '').split('.')[1] + '' + time();

    salt = !numbersOnly && salt ? `${salt}`.trim() : randomNumbers;
    fromChars = numbersOnly ? `${randomNumbers}` : validStringOr(fromChars);

    let chars = validStringOr(fromChars)
        ? validStringOr(fromChars) : [
            azUpper,
            numbers,
            azLower,
            time(),
            salt,
        ].join('');

    let caracteresLength = chars.length;

    lenght = !isNaN(Number(lenght)) && Number(lenght) > 0 ? Number(lenght) : 15;

    for (let i =  0; i < lenght; i++) {
        result += chars.charAt(Math.floor(Math.random() * caracteresLength));
    }

    return result;
}

export const randomNumbers = (lenght = 15) => randomString(lenght, {
    numbersOnly: true,
});
