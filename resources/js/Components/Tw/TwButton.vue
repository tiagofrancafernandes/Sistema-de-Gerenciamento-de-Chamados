<template>
    <button
        :type="type"
        :class="getClasses"
    ><slot /></button>
</template>

<script setup>
import { computed, ref, shallowRef, onMounted } from 'vue';
import { getBgColor } from '@/helpers/theme-helpers'

const props = defineProps({
    classes: {
        default: null,
    },
    type: {
        type: String,
        default: 'button',
    },
    rounded: {
        type: Boolean,
        default: true,
    },
    color: {
        type: String,
    },
})

const prefixedItem = (value, prefix = '') => {
    value = Array.isArray(value) ? value.filter(item => item).join(' ') : value;
    value = value ? (`${value}`).trim() : null;

    if (!value) {
        return value;
    }

    return value.trim().split(' ')
        .filter(item => item)
        .map(item => {
            item = `${item}`.trim();
            return prefix && !item.startsWith(prefix) ? `${prefix}${item}` : item;
        })
        .join(' ');
}

const getDarkedClass = (value) => prefixedItem(value, 'dark:');

const getClasses = computed(() => {
    let color = props.color || 'indigo';

    return props.classes ? props.classes : [
        {
            'px-3 py-2 text-xs font-medium text-center inline-flex items-center': true,
            'rounded-lg': props.rounded,
        },
        getBgColor(color),
    ]
})
</script>
