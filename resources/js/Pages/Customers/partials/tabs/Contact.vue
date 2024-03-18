<template>
    <div
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        :class="{
            'hidden': !props.active,
        }"
    >
        <h1 class="text-gray-700 dark:text-white">Active: {{ props.active }}</h1>
        <h1 class="text-gray-700 dark:text-white">about</h1>
        <h5 class="text-gray-700 dark:text-white">{{ date }}</h5>
        <p class="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the
            <strong class="font-medium text-gray-800 dark:text-white"
                >Profile tab's associated content</strong
            >. Clicking another tab will toggle the visibility of this one for the next.
            The tab JavaScript swaps classes to control the content visibility and
            styling.
        </p>
        <div>
            <input type="text" placeholder="Enter your Message" />
            <input type="button" value="Send" />
        </div>
    </div>
</template>

<script setup>
import { onActivated, ref, onDeactivated } from "vue";

const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    }
});

let date = ref(null);

onActivated(() => {
    console.log("onActivated about");
    // Lógica a ser executada quando o componente é ativado
    date.value = new Date().toISOString();
});

onDeactivated(() => {
    console.log("onDeactivated about");
    // Lógica a ser executada quando o componente é desativado
});
</script>
