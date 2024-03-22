import './bootstrap';
import '../css/app.css';
import '@/helpers/_global-helpers';
// import 'primevue/resources/themes/aura-light-green/theme.css'
// import 'primevue/resources/themes/aura-light-indigo/theme.css'
// import 'primevue/resources/themes/aura-light-teal/theme.css'
// import 'primevue/resources/themes/aura-dark-green/theme.css'
import 'primevue/resources/themes/luna-blue/theme.css'

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import { createApp, h } from 'vue';
import { createInertiaApp, Link, Head } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import { LangPlugin } from '@/plugins/lang'
import { FormatPlugin } from '@/plugins/format-helpers'
import { F2Helpers } from '@/plugins/f2-plugins'
import { VueCrudHelpersPlugin } from '@tiagof2/vuejs-crud/js/plugins/crud-plugins'

import TwButton from '@/Components/Tw/TwButton.vue';
import TwRefreshButton from '@/Components/Tw/TwRefreshButton.vue';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const components = {
            'TwButton': TwButton,
            'TwRefreshButton': TwRefreshButton,
        };

        const pluginsToLoad = [
            FormatPlugin,
            LangPlugin,
            F2Helpers,
            VueCrudHelpersPlugin(/* loadFunctionsGlobally */ true),
        ];

        let inertiaApp = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(PrimeVue, {
                // unstyled: false,
            })
            .use(ToastService);

        Object.entries(components).forEach(item => {
            let [name, component] = item;
            inertiaApp = inertiaApp.component(name, component);
        });

        pluginsToLoad.forEach(_plugin => {
            inertiaApp = inertiaApp.use(_plugin);
        });

        return inertiaApp
            .component('Link', Link)
            .component('Head', Head)
            .mount(el);
    },
    progress: {
        // The delay after which the progress bar will appear, in milliseconds...
        delay: 0,

        // The color of the progress bar...
        //   color: '#4B5563',
        color: '#5850ec',

        // Whether to include the default NProgress styles...
        includeCSS: true,

        // Whether the NProgress spinner will be shown...
        showSpinner: true,
    },
    // progress: false,
});
