<template>
    <template
        v-if="!slots.default"
    >
        <td
            :data-vue-crud-comp="crudElId"
            :class="classes"
            v-html="content"
        />
    </template>
    <template v-else>
        <td
            :data-vue-crud-comp="crudElId"
            :class="classes"
        >
            <slot/>
        </td>
    </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()

const props = defineProps({
    record: {
        type: Object,
    },
    renderConfig: { // like headerInfo
        type: Object,
    },
    textSize: {
        type: String,
        default: 'sm'
    },
    attribute: {
        type: String,
    },
    content: {
        type: String,
    },
})

const crudElId = 'TableTd';

const renderConfigData = computed(() => {
    return {
        ...(props.renderConfig || {}),
        key: (props.renderConfig?.key || props.attribute || null),
        attribute: (props.renderConfig?.attribute || props.attribute || null),
    };
})

const content = computed(() => getColumnData(
    renderConfigData.value,
    props.record,
));

const classes = computed(() => {
    let textSizes = {
        'sm': 'text-sm',
        'md': 'text-md',
        'lg': 'text-lg',
        'xl': 'text-xl',
    };

    let textSize = props.textSize ? (textSizes[props.textSize] ?? 'text-sm') : 'text-sm';

    return [
        'px-4 py-3',
        textSize,
    ];
})

</script>

<style scoped>

</style>
