<template>
    <template
        v-if="!slots.default"
    >
        <tr
            :data-vue-crud-comp="crudElId"
            :class="classes"
            v-html="content"
        />
    </template>
    <template v-else>
        <tr
            :data-vue-crud-comp="crudElId"
            :class="classes"
        >
            <slot/>
        </tr>
    </template>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
const slots = useSlots()

const props = defineProps({
    content: {
        type: String,
    },
});

const crudElId = 'TableTr';

const classes = computed(() => [
    'text-gray-700 dark:text-gray-400',
]);

const content = computed(() => props.content);
</script>

<style scoped>

</style>
