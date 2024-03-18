<template>
    <template
        v-if="!slots.default"
    >
        <TwButton
            type="button"
            @click="clickHandler"
        >button</TwButton>
        </template>
    <template v-else>
        <TwButton
            type="button"
            @click="clickHandler"
        ><slot/></TwButton>
    </template>
</template>

<script setup>
import { useSlots, useAttrs } from 'vue';
const slots = useSlots();
const attrs = useAttrs();

const clickHandler = (event) => {
    console.log(
        'Clicado no botao',
        attrs.renderConfig,
        attrs.record,
    );
}
</script>
