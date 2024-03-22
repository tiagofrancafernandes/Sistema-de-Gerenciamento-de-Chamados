<template>
    <template
        v-if="!slots.default"
    >
        <TwButton
            type="button"
            @click="compomentClickHandler"
        >button</TwButton>
        </template>
    <template v-else>
        <TwButton
            type="button"
            @click="compomentClickHandler"
        ><slot/></TwButton>
    </template>
</template>

<script setup>
import { useSlots, useAttrs } from 'vue';
const attrs = useAttrs();
const slots = useSlots();

const routeHandler = (params) => {
    params = isObject(params) ? params : {};
    let routeName = __get(params, 'routeName');
    let routeParams = __get(params, 'routeParams');
    let method = __get(params, 'method');
    let data = __get(params, 'data');

    if (!routeName || !isString(routeName)) {
        console.error(`Invalid routeName`);
        return;
    }

    params = {
        ...params,
        routeName,
        routeParams,
        method,
        data,
    }

    if (routeParams.length) {
        return AppInertiaHelpers.advancedGoToRoute(params);
    }

    return AppInertiaHelpers.advancedGoToRoute(params);
}

const compomentClickHandler = (event) => {
    let clickHandler = __get(attrs, 'clickHandler');

    if (__get(attrs, 'goToRoute')) {
        routeHandler({
            routeName: __get(attrs, 'goToRoute'),
            routeParams: __get(attrs, 'routeParams', []),
            method: __get(attrs, 'routeMethod', 'get'),
            data: __get(attrs, 'routeData', {}),
        });
    }

    if (clickHandler) {
        clickHandler = TypeHelpers.isFunction(clickHandler) ? clickHandler : __get(globalThis, validStringOr(clickHandler));
    }

    if (TypeHelpers.isFunction(clickHandler)) {
        return clickHandler(event, slots, attrs);
    }
}
</script>
