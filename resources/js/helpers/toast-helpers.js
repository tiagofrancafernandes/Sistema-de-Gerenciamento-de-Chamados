import { useToast } from 'primevue/usetoast';

export const usePrimeVueToasterHelpers = (config = null) => {
    config = config && isObject(config) ? config : {};

    let { appToaster, defaultLife } = config;

    const primeVueToaster = useToast(config);

    defaultLife = isNumeric(defaultLife) && defaultLife > 500 ? parseInt(defaultLife) : 15000;

    let SEVERITIES = {
        error: 'error',
        red: 'error',
        danger: 'error',
        success: 'success',
        green: 'success',
        secondary: 'secondary',
        info: 'info',
        blue: 'info',
        contrast: 'contrast',
        warn: 'warn',
        orange: 'warn',
        alert: 'warn',
        warning: 'warn',
    };

    return {
        primeVueToaster: primeVueToaster,
        defaultLife,
        uids: [],
        pmvAdd(options) {
            options = options && isObject(options) ? options : {};

            return this.primeVueToaster.add({
                severity: 'info',
                closable: true,
                ...options,
            })
        },
        info(options) {
            options = options && isObject(options) ? options : {};
            return this.pmvAdd({
                ...options,
                severity: 'info',
            })
        },
        success(options) {
            options = options && isObject(options) ? options : {};
            return this.pmvAdd({
                ...options,
                severity: 'info',
            })
        },
        error(options) {
            options = options && isObject(options) ? options : {};
            return this.pmvAdd({
                ...options,
                severity: 'info',
            })
        },
        default(options) {
            options = options && isObject(options) ? options : {};
            return this.pmvAdd({
                severity: 'info',
                ...options,
            })
        },
        SEVERITIES,
        get positionList() {
            return [
                'center',
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right',
            ];
        },
        getSeverityByLevel(level, defaultValue = null) {
            return matchOr(level, this.SEVERITIES, defaultValue);
        },
        processAppToasterEvent(event) {
            let severity = this.getSeverityByLevel(__get(event.detail, 'level'), 'info');
            let title = __get(event.detail, 'title', StringHelpers.ucFirst(severity));
            let closable = !__get(event.detail, 'persistent');
            let message = __get(event.detail, 'message', title);
            let uid = __get(event.detail, 'uid');

            if (this.uids.includes(uid)) {
                console.log('Duplicated UID', uid);
                return;
            }

            this.uids.push(uid);

            let life = __get(event.detail, 'timeout');
            life = isNumeric(life) && life > 500 ? parseInt(life) : this.defaultLife;

            let extra = __get(event.detail, 'extra', {});

            let position = matchOr(
                __get(event.detail, 'position', __get(extra, 'position')),
                this.positionList,
                'top-right'
            );

            let group = position ? `group-pos-${position}` : null;

            let options = {
                ...extra,
                severity,
                summary: title,
                detail: message,
                message,
                uid,
                life,
                closable,
                position,
                group,
            };
        },
    }
}

const ToastMessageSentEvent = {
    get eventName() {
        return 'APP_TOAST_SENT';
    },
    get levels() {
        return [
            'success',
            'info',
            'error',
            'danger',
            'alert',
            'warning',
        ];
    },
    get randomUid() {
        return Math.random().toString().slice(2);
    },
    resolveTarget(target) {
        if (!target || !isObject(target)) {
            return globalThis;
        }

        if (('dispatchEvent' in target) && ('addEventListener' in target)) {
            return target
        }

        return globalThis;
    },
    dispatch(options = {}) {
        options = options && isObject(options) ? options : {};

        let {
            target,
            uid,
        } = options;
        target = this.resolveTarget(target);

        uid = uid && isString(uid) && uid.trim() ? uid.trim() : this.randomUid;

        let event = new CustomEvent(
            this.eventName,
            this.generateEventDetailData({
                ...options,
                uid,
            })
        );

        let dispatchResult = target.dispatchEvent(event);

        return {
            dispatchResult,
            event,
            uid,
        }
    },
    generateEventDetailData(options) {
        options = options && isObject(options) ? options : {};

        let {
            title,
            message,
            level,
            persistent,
            weight,
        } = options;

        level = level && isString(level) && this.levels.includes(level) ? level : 'info';

        return {
            detail: {
                ...options,
                title,
                message,
                level,
                weight,
                persistent: Boolean(persistent),
            }
        }
    },
    dispatchHelper(level, title, message, options = {}) {
        options = options && isObject(options) ? options : {};
        level = level && this.levels.includes(level) ? level : 'info';

        message = message ?? title;

        options = {
            ...{
                level,
                title,
                message,
            },
            ...options,
        };

        return this.dispatch(options);
    },
}

export const toaster = {
    success(title, message, options = {}) {
        return ToastMessageSentEvent.dispatchHelper('success', title, message, options);
    },
    info(title, message, options = {}) {
        return ToastMessageSentEvent.dispatchHelper('info', title, message, options);
    },
    error(title, message, options = {}) {
        return ToastMessageSentEvent.dispatchHelper('error', title, message, options);
    },
    danger(title, message, options = {}) {
        return ToastMessageSentEvent.dispatchHelper('danger', title, message, options);
    },
    warning(title, message, options = {}) {
        return ToastMessageSentEvent.dispatchHelper('warning', title, message, options);
    },
    default(title, message, options = {}) {
        return ToastMessageSentEvent.dispatchHelper('default', title, message, options);
    },
}

export const useAppToaster = (options) => {
    options = options && isObject(options) ? options : {};

    let {target} = options;

    target = ToastMessageSentEvent.resolveTarget(target);

    return {
        target,
        toaster,
        onSent(callable, listenerId = 'global') {
            if (!callable || !isFunction(callable)) {
                throw `callable param of onSent method must be a valid function.`;
            }

            let attrKey = ['listenerId', listenerId, ToastMessageSentEvent.eventName].join('-');

            if (!this.target[attrKey]) {
                this.target.addEventListener(ToastMessageSentEvent.eventName, callable);
                this.target[attrKey] = ToastMessageSentEvent.eventName;
            }
        },
    };
}

export const processPageToasts = (toasts) => {
    const sendToast = (options) => {
        console.log('sendToast', options);
        let type = options.type ? options.type : 'info';
        let title = __get(options, 'title');
        let message = __get(options, 'message', title);
        let messageOptions = __get(options, 'options', {});
        title = title ? title : message;

        messageOptions = isObject(messageOptions) ? messageOptions : {};

        type = type && isString(type) && (type in toaster) ? type : 'default';

        toaster[type](title, message, {
            ...messageOptions,
            ...options,
        });
    }

    for (let [type, value] of Object.entries(toasts)) {
        if (!(value['readed_on'])) {
            sendToast({type, ...value});
            value['readed_on'] = new Date();
        }

        toasts[type] = value;
    }
}
