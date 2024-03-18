<script setup>
import { onActivated, ref, onDeactivated } from 'vue';

import TwTabContent from '@/Pages/Customers/partials/tabs/TwTabContent.vue'
let date = (new Date).toISOString();
</script>

<template>
    <TwTabContent
        :classes="[
            //'my-class-one',
        ]"
    >
        <h1>CustomerTabOne</h1>
        <h5>{{ date }}</h5>
        <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
    </TwTabContent>
</template>
