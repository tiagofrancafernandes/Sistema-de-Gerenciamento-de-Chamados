<template>
<TwButton
    :classes="props.classes"
    :color="props.color"
    @click="callRefreshHandler(props.data)"
>
    <slot/>
</TwButton>
</template>

<script setup>
// import { computed, ref, shallowRef, onMounted } from 'vue';
// import { usePage, useForm, router } from "@inertiajs/vue3";
import * as inertiaHelpers from '@/helpers/inertia-helpers'
import TwButton from '@/Components/Tw/TwButton.vue';

const props = defineProps({
    data: {
        type: Object,
    },
    refreshHandler: {
        default: null,
    },
    classes: {
        default: null,
    },
    color: {
        type: String,
    },
})

const defaultRefreshHandler = (data) => {
    inertiaHelpers.reloadCurrentGet(data);
}

const callRefreshHandler = (data) => {
    let refreshHandler = props.refreshHandler || defaultRefreshHandler;
    return refreshHandler(data || {});
}
</script>
