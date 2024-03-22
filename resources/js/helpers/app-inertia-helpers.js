import { router } from "@inertiajs/vue3";

// https://inertiajs.com/manual-visits

export const getRouteInfo = (...params) => route(...params);
export const getRouteUrl = (...params) => {
    try {
        return route(...params);
    } catch (error) {
        console.error(error); // TODO: toast it
        return null;
    }
};

export const goToRoute = (...params) => {
    return router.visit(route(...params));
}

export const advancedGoToRoute = (params = {
    routeName,
    routeParams: [],
    method: 'get',
    data: {},
}) => {
    params = isObject(params) ? params : {};

    let routeName = __get(params, 'routeName');
    let routeParams = __get(params, 'routeParams');
    let data = __get(params, 'data', {});
    let method = __get(params, 'method', 'get');

    let options = __get(params, 'options', {});

    options = {
        ...(isObject(options) ? options : {}),
        ...{
            method: method,
            data: (data || {}),
        },
    };

    return router.visit(
        route(routeName, routeParams),
        options,
    );
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
