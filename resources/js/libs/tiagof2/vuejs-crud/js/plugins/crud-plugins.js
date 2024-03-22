import {
    getColumnLabel,
    defaultColumnContentHandler,
    getColumnData,
    generateHeader,
    generateTablePageInfo,
    generateTableInfo,
} from '@tiagof2/vuejs-crud/js/helpers';

import RegisterComponentsPlugin from '@/libs/tiagof2/vuejs-crud/js/plugins/register-components-plugin';

/**
 * if 'loadFunctionsGlobally' is `true`, all functions do not need to be loaded manually via 'import'
 * but this can make the bundle code larger than it needs to be
 */
export const VueCrudHelpersPlugin = (loadFunctionsGlobally = false) => {
    return {
        install(app, options) {
            app.use(RegisterComponentsPlugin);

            let methods = {
                getColumnLabel,
                defaultColumnContentHandler,
                getColumnData,
                generateHeader,
                generateTablePageInfo,
                generateTableInfo,
            };

            app.mixin({
                methods: methods,
            });

            Object.entries(methods).forEach(item => {
                let [name, func] = item;

                if (loadFunctionsGlobally) {
                    let vendor = 'VueCrudHelpers';
                    let vendorKey = `${vendor}_${name}`;
                    let globalKey = name in globalThis ? vendorKey : name;

                    globalThis[vendor] = nullSafe(globalThis[vendor] ?? {});
                    globalThis[globalKey] = func;

                    if (!(name in globalThis[vendor])) {
                        globalThis[vendor][name] = func;
                    }
                }

                if (parseInt(app.version) > 2) {
                    app.provide(name, func);
                }
            })
        },
    };
};
