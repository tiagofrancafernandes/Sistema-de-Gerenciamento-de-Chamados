import {
    filled,
    notFilled,
    empty,
    valueIfFilled,
    itemIsFilled,
    nullSafe,
    isArray,
    isObject,
    isNumeric,
    isString,
} from '@/helpers/data-validation';

import { typeofIs } from '@/helpers/type-helpers';

import { ObjectGet } from '@/helpers/data-helpers';

import { validStringOr } from '@/helpers/string-helpers';

// Criação do plugin
export const F2Helpers = {
    install(app, options) {
        let methods = {
            nullSafe,
            null_safe: nullSafe,
            __get: ObjectGet,
            ObjectGet: ObjectGet,
            filled,
            notFilled,
            empty,
            valueIfFilled,
            itemIsFilled,
            isArray,
            isObject,
            isNumeric,
            isString,
            validStringOr,
            typeofIs,
        };

        app.mixin({
            methods: methods,
        });

        Object.entries(methods).forEach(item => {
            let [name, func] = item;

            let vendor = 'F2Helpers';
            let vendorKey = `${vendor}_${name}`;
            let globalKey = name in globalThis ? vendorKey : name;

            globalThis[vendor] = nullSafe(globalThis[vendor] ?? {});
            globalThis[globalKey] = func;
            globalThis[vendor][name] = func;

            if (parseInt(app.version) > 2) {
                app.provide(name, func);
            }
        })
    },
};
