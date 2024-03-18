<script setup>
import { onActivated, ref, onDeactivated } from 'vue';

let date = ref(null);

onActivated(() => {
    console.log('onActivated CustomerTabTwo')
    // Lógica a ser executada quando o componente é ativado
    date.value = (new Date).toISOString();
});

onDeactivated(() => {
    console.log('onDeactivated CustomerTabTwo')
 // Lógica a ser executada quando o componente é desativado
});
</script>

<template>
<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">
    <h1>CustomerTabTwo</h1>
    <h5>{{ date }}</h5>
    <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
</div>
</template>
