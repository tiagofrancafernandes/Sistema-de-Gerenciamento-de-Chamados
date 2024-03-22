import '@/libs/tiagof2/toastify/style';

import Toastify from 'toastify-js';

export default Toastify;

export const AppToastifyHelper = (config = {}) => {
    return {
        config: config,
        Toastify: Toastify,
        get styles() {
            return {
                warning: {
                    background: "#f59e0b",
                },
                error: {
                    background: "#dc2626",
                },
                success: {
                    background: "#22c55e",
                },
                danger: {
                    background: "#f59e0b",
                },
                info: {},
                default: {},
            };
        },
        getConfig(options = {}) {
            return {
                ...(isObject(this.config) ? this.config : {}),
                ...(isObject(options) ? options : {}),
            };
        },
        toastIt(options = {}) {
            // https://github.com/apvarun/toastify-js/blob/master/README.md#api
            options = this.getConfig(options);

            let { style } = options;

            style = style && (isString(style) || isObject(style)) ? style : null;

            style = style && isObject(style) ? style : (this.styles[style] ?? null);

            return Toastify({
                // text: `This is a toast alguma coisa aqui bem longa\npara testar o toast longo`,
                // text: `toast curto`,
                // className: 'app-custom-toast error with-icon',
                // className: 'app-custom-toast warning with-icon',
                // className: 'app-custom-toast success with-icon',
                // className: 'app-custom-toast info with-icon',
                style,
                close: true,
                close: true,
                stopOnFocus: true, // Prevents dismissing of toast on hover
                onClick: function() {}, // Callback after click
                ...options,
            }).showToast();

            /*
            Toastify({
                text: "This is a toast",
                duration: 30000,
                // destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function() {} // Callback after click
            }).showToast();
            */
        },
        toastAs(type, message, duration = null, withIcon = true, options = {}) {
            options = this.getConfig(options);

            let { className, persistent } = options;

            duration = duration ?? options?.duration;

            duration = isNumeric(duration) ? parseInt(duration) : 5000;

            if (persistent ?? false) {
                duration = -1;
            }

            let trimIt = (value) => (value && isString(value) ? value : '').trim()

            className = trimIt(className);
            type = matchOr(trimIt(type), ['error', 'warning', 'success', 'info']);

            className = [className, 'app-custom-toast', type, (type && withIcon ? 'with-icon' : '')].join(' ');

            return this.toastIt({
                ...options,
                duration,
                text: `${message}`,
                className,
            });
        },
        error(message, duration, withIcon = true, options = {}) {
            return this.toastAs('error', message, duration, withIcon, options);
        },
        warning(message, duration, withIcon = true, options = {}) {
            return this.toastAs('warning', message, duration, withIcon, options);
        },
        success(message, duration, withIcon = true, options = {}) {
            return this.toastAs('success', message, duration, withIcon, options);
        },
        info(message, duration, withIcon = true, options = {}) {
            return this.toastAs('info', message, duration, withIcon, options);
        },
        get types() {
            return {
                error: 'danger',
                red: 'danger',
                danger: 'danger',
                success: 'success',
                green: 'success',
                info: 'info',
                blue: 'info',
                default: 'info',
                warn: 'warning',
                orange: 'warning',
                alert: 'warning',
                warning: 'warning',
            };
        },
        getTypeByLevel(level, defaultValue = null) {
            return matchOr(level, this.types, defaultValue);
        },
        processAppToasterEvent(event) {
            let type = this.getTypeByLevel(__get(event.detail, 'level'), 'info');
            let title = __get(event.detail, 'title', StringHelpers.ucFirst(type));
            let closable = !__get(event.detail, 'persistent');
            let message = __get(event.detail, 'message', title) ?? title;
            let uid = __get(event.detail, 'uid');

            let withIcon = Boolean(__get(event.detail, 'withIcon', true));
            let style = __get(event.detail, 'style');
            let duration = __get(event.detail, 'duration');

            let extra = __get(event.detail, 'extra', {});
            let onClick = __get(event.detail, 'onClick', () => {});

            /*
            // WIP
            let position = matchOr(
                __get(event.detail, 'position', __get(extra, 'position')),
                this.positionList,
                'top-right'
            );
            */
           console.log('message', message);
           console.log('event.detail', event.detail);

            let options = {
                extra: {
                    ...(isObject(extra) ? extra : {}),
                    ...event.detail,
                },
                message,
                close: closable,
                // gravity: "top", // `top` or `bottom`
                // position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
            };

            if (isObject(style)) {
                options['style'] = style;
            }

            if (isFunction(onClick)) {
                options['onClick'] = onClick;
            }

            return this[type](
                message,
                duration,
                withIcon,
                options
            );
        },
    };
}

export const useToastify = (config = {}) => {
    return AppToastifyHelper(config);
}
