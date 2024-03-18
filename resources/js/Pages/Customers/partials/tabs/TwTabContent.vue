<template>
<div
    class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
    :class="props.classes"
    data-vue-tw-comp-name="TwTabContent"
>
    <slot />
</div>
</template>

<script setup>
const props = defineProps({
    classes: {
        default: {
            'my-class': true,
        },
    },
});
</script>
