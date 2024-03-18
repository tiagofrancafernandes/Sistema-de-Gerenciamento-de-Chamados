import { router } from "@inertiajs/vue3";

// https://inertiajs.com/manual-visits

export const goToRoute = (...params) => {
    return router.visit(route(...params));
}

export const goToPath = (path, options = {}) => {
    return router.visit(path, options || {});
}

export const goToUrl = (url, options = {}) => {
    return router.visit(url, options || {});
}

export const visitGet = (url, data = {}) => {
    let options = {
        method: 'get',
        data: (data || {}),
    };

    console.log('options', options);

    return router.visit(url, options);
}

export const reloadCurrentGet = (data = {}) => {
    let options = {
        // method: 'get',
        data: (data || {}),
    };

    console.log('options', options);

    return router.reload(options);
}

export const reloadCurrent = (data = {}) => reloadCurrentGet(data);
