import * as dataValidationHelpers from '@/helpers/data-validation';

import { typeofIs } from '@/helpers/type-helpers';

import { ObjectGet } from '@/helpers/data-helpers';

import { validStringOr } from '@/helpers/string-helpers';

// Criação do plugin
export const F2Helpers = {
    install(app, options) {
        let methods = {
            null_safe: dataValidationHelpers.nullSafe,
            __get: ObjectGet,
            ObjectGet: ObjectGet,
            validStringOr,
            ...dataValidationHelpers,
        };

        app.mixin({
            methods: methods,
        });

        Object.entries(methods).forEach(item => {
            let [name, func] = item;

            let vendor = 'F2Helpers';
            let vendorKey = `${vendor}_${name}`;
            let globalKey = name in globalThis ? vendorKey : name;

            globalThis[vendor] = dataValidationHelpers.nullSafe(globalThis[vendor] ?? {});

            if (!(globalKey in globalThis)) {
                globalThis[globalKey] = func;
            }

            if (!(name in globalThis[vendor])) {
                globalThis[vendor][name] = func;
            }

            let provides = app?._context?.provides || false;

            if (provides && name in provides) {
                return;
            }

            if (parseInt(app.version) > 2) {
                app.provide(name, func);
            }
        })
    },
};
