<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";

const props = defineProps({
    label: {
        type: String,
    },
    active: {
        type: Boolean,
    },
});

const classes = computed(() =>
    props.active
        ? 'text-gray-900 dark:text-gray-100 border-b-2 border-indigo-400 dark:border-indigo-600'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
);
</script>

<template>
    <div
        class="hidden sm:flex sm:items-center sm:ms-6"
        :class="classes"
    >
        <!-- Settings Dropdown -->
        <div class="ms-3 relative">
            <Dropdown
                align="right"
                width="48"
                :closeOnClick="false"
            >
                <template #trigger>
                    <span class="inline-flex rounded-md">
                        <button
                            type="button"
                            :class="[
                                'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4',
                                'font-medium rounded-md bg-white dark:bg-gray-800',
                                'focus:outline-none transition ease-in-out duration-150',
                            ]"
                        >
                            <slot name="label" />
                            <svg
                                class="ms-2 -me-0.5 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>
                </template>

                <template #content>
                    <slot name="items" />
                </template>
            </Dropdown>
        </div>
    </div>
</template>
