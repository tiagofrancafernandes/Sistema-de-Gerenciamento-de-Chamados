import {
    nullSafe,
} from '@/helpers/data-validation';

import { typeofIs, isFunction } from '@/helpers/type-helpers';

import { ObjectGet } from '@/helpers/data-helpers';

import AutoLoader from '@/Components/autoload'

// WIP

let AutoLoader_components = ObjectGet(AutoLoader, ['components'], {});
let AutoLoader_methods = ObjectGet(AutoLoader, ['methods'], {});
let AutoLoader_globalFunctions = ObjectGet(AutoLoader, ['globalFunctions'], {});
let AutoLoader_prefix = ObjectGet(AutoLoader, ['prefix'], '');
let AutoLoader_componentsPrefix = ObjectGet(AutoLoader, ['componentsPrefix'], AutoLoader_prefix);
let AutoLoader_plugins = ObjectGet(AutoLoader, ['plugins'], []);
let registerOnVendor = false;

const RegisterComponentsPlugin = {
    install(app, options) {
        let methods = {
            ...AutoLoader_methods,
        };

        app.mixin({
            methods,
        });

        Object.entries(methods).forEach(item => {
            let [name, func] = item;

            if (!isFunction(func)) {
                return;
            }

            name = `${AutoLoader_prefix}${name}`;

            let provides = app?._context?.provides || false;

            if (provides && name in provides) {
                return;
            }

            if (parseInt(app.version) > 2) {
                app.provide(name, func);
            }
        });

        // Global functions [WIP]
        Object.entries({
            ...(AutoLoader_globalFunctions || {}),
        }).forEach(item => {
            let [name, func] = item;
            let vendor = 'F2Sys';

            if (!isFunction(func)) {
                return;
            }

            name = `${AutoLoader_prefix}${name}`;

            if (!(name in globalThis)) {
                globalThis[name] = func;
            }

            if (registerOnVendor && vendor) {
                globalThis[vendor] = nullSafe(globalThis[vendor] ?? {});

                if (!(name in globalThis[vendor])) {
                    globalThis[vendor][name] = func;
                }
            }
        });

        // Components [WIP]
        Object.entries({
            ...(AutoLoader_components || {}),
        }).forEach(item => {
            let [componentName, component] = item;

            if (!component || !ObjectGet(component, '__name')) {
                return;
            }

            componentName = `${AutoLoader_componentsPrefix}${componentName}`;

            app.component(componentName, component);
        });

        // Plugins [WIP]
        (isArray(AutoLoader_plugins) ? AutoLoader_plugins : []).forEach(_plugin => {
            if (isArray(_plugin)) {
                app.use(..._plugin);
                return;
            }

            app.use(_plugin);
        });
    },
}

export default RegisterComponentsPlugin;
