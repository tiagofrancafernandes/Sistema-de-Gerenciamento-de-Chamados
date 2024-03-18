<template>
<TwTabContent>
    <!-- row -->
    <div class="mb-5">
        <!-- text -->
        <h5
            class="uppercase tracking-widest text-sm font-semibold"
        >
            Position
        </h5>
        <p class="mb-0">Theme designer at Bootstrap.</p>
    </div>
    <!-- content -->
    <div class="flex flex-row justify-between mb-5">
        <div class="flex-1">
            <h5
                class="uppercase tracking-widest text-sm font-semibold"
            >
                Phone
            </h5>
            <p class="mb-0">+32112345689</p>
        </div>
        <div class="flex-1">
            <h5
                class="uppercase tracking-widest text-sm font-semibold"
            >
                Date of Birth
            </h5>
            <p class="mb-0">01.10.1997</p>
        </div>
    </div>
    <div class="flex flex-row justify-between mb-5">
        <div class="flex-1">
            <h5
                class="uppercase tracking-widest text-sm font-semibold"
            >
                Email
            </h5>
            <p class="mb-0">dashui@gmail.com</p>
        </div>
        <div class="flex-1">
            <h5
                class="uppercase tracking-widest text-sm font-semibold"
            >
                Location
            </h5>
            <p class="mb-0">Ahmedabad, India</p>
        </div>
    </div>

    <p
        class="text-sm text-gray-500 dark:text-gray-400"
    >
        Cliente pacote
        <strong class="font-medium text-gray-800 dark:text-white uppercase">premium</strong>
        desde
        <strong class="font-medium text-gray-800 dark:text-white uppercase">2023</strong>.
    </p>
</TwTabContent>
</template>

<script setup>
import TwTabContent from '@/Pages/Customers/partials/tabs/TwTabContent.vue'
import { onActivated, ref, onDeactivated } from 'vue';

const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    }
});

let date = ref(null);

onActivated(() => {
    console.log('onActivated about')
    // Lógica a ser executada quando o componente é ativado
    date.value = (new Date).toISOString();
});

onDeactivated(() => {
    console.log('onDeactivated about')
 // Lógica a ser executada quando o componente é desativado
});
</script>
