<template>
    <!-- <Toast
        v-on:life-end="onLifeEnd"
    /> -->
    <template
        v-for="position in positionList"
        v-key="position"
    >
        <Toast
            :position="position"
            :group="`group-pos-${position}`"
            v-on:life-end="onLifeEnd"
        />
    </template>
</template>

<script setup>
import Toast from 'primevue/toast';

let positionList = [
    'center',
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
];

const onLifeEnd = (event) => {
    console.log('life-end', event);
}
</script>
