import {
    nullSafe,
    formatDate,
} from '@/helpers/data-validation';

// Criação do plugin
export const FormatPlugin = {
    install(app, options) {
        let methods = {
            formatDate,
        };

        app.mixin({
            methods: methods,
        });

        Object.entries(methods).forEach(item => {
            let [name, func] = item;

            let vendor = 'FormatHelpers';
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
