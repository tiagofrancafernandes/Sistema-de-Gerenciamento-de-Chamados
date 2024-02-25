<script setup>
import { computed, ref, reactive } from "vue";
const emit = defineEmits([
    'inputChanged',
]);
const props = defineProps({
    itemValue: {
        required: true,
    },
    itemId: {
        required: true,
        type: String,
    },
    label: {
        type: String,
    },
    placeholder: {
        type: String,
    },
    required: {
        type: String,
    },
    readonly: {
        type: String,
    },
    disabled: {
        type: String,
    },
    type: {
        type: String,
    },
    form: {
        required: true,
        type: Object,
    },
    colSpan: {
        default: 2,
    },
    class: {
        default: 'input-text-dot-vue',
    },
});

let itemValue = ref(props.itemValue);
let itemError = computed(() => props.form.errors[props.itemId]);
let classes = computed(() => {
    let colSpan = props.colSpan ? `col-span-${props.colSpan}` : '';
    let classList = [
        colSpan,
        props.class,
    ];

    classList = classList.filter(item => item && typeof item === 'string').join(' ').trim().split(' ');

    let uniqueClasses = [...new Set(classList)];

    return uniqueClasses.join(' ');
});

const handleInputChange = (event) => {
    emit('inputChanged', {
        itemId: props.itemId,
        value: event.target.value,
    });
}
</script>

<template>
    <div
        :class="classes"
    >
        <label
            for="username-error"
            class="block mb-2 text-sm font-medium"
            :class="{
                'text-red-700 dark:text-red-500': itemError,
                'text-gray-900 dark:text-white': !itemError,
                'mt-7': !props.label,
            }"
        > {{ props.label }}</label>
        <input
            id="username-error"
            class="border text-sm rounded-lg dark:bg-gray-700 block w-full p-2.5"
            :class="{
                'ring-1 bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500': itemError,
                'focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500': itemError,

                'block w-full bg-gray-50': !itemError,
                'border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600': !itemError,
                'p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white': !itemError,
                'focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500': !itemError,
            }"
            :placeholder="props.placeholder || props.label"
            :required="props.required"
            :readonly="props.readonly"
            :disabled="props.disabled"
            :type="props.type || 'text'"
            @input="handleInputChange"
            v-model="props.itemValue"
        />

        <p
            v-if="itemError"
            class="mt-0 text-sm text-red-600 dark:text-red-500"
        >
            {{ itemError }}
        </p>
    </div>
</template>
