import { lang } from '@/helpers/localization';

// Criação do plugin
export const LangPlugin = {
    install(app, options) {
        app.mixin({
            methods: {
                lang: lang,
            },
        });

        let key = 'lang' in globalThis ? '__lang' : 'lang';

        globalThis[key] = lang;

        if (parseInt(app.version) > 2) {
            app.provide('lang', lang);
        }
    },
};
