<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    href: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <Link
        :href="href"
        _class="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
        :class="[
            'block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium',
            'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50',
            'dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none',
            'focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700',
            'focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out',
            'text-center inline-flex items-center',
        ]"
    >
        <slot />
    </Link>
</template>
