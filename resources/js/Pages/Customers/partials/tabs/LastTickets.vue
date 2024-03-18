<script setup>
import { decodeEntity } from 'html-entities';
import { onActivated, ref, onDeactivated, computed } from 'vue';

import TwTabContent from '@/Pages/Customers/partials/tabs/TwTabContent.vue'

import TicketCard from '@/Pages/Customers/partials/tabs/TicketCard.vue';

const props = defineProps({
    tabContent: {
        type: Object,
        default: {},
    },
    loadOnTab: {
        default: null,
    },
})

const lastTicketsItems = computed(() => {
    if (!props.tabContent) {
        return [];
    }

    return props.tabContent[`tickets`] || [];
});

console.log('LastTickets tabContent', props.tabContent.length);
console.log('LastTickets lastTicketsItems', lastTicketsItems.value.length);
console.log('LastTickets loadOnTab', props.loadOnTab);

onActivated(() => {
    console.log('onActivated LastTickets')
    // Lógica a ser executada quando o componente é ativado
});

onDeactivated(() => {
    console.log('onDeactivated LastTickets')
 // Lógica a ser executada quando o componente é desativado
});

let parseContent = (data) => {
    return decodeEntity(data || '', {level: 'html5'});
}
</script>

<template>
<TwTabContent
    :classes="[
        //'my-class-one',
    ]"
>
    <div
        class="container w-7xl mx-auto grid p-2"
    >
        <div class="flex items-center justify-between w-full px-1 pb-3">
            <div>
                <TwRefreshButton
                    :data="{
                        algo: null,
                    }"

                    color="info"
                >
                    {{ lang('Refresh list') }}
                </TwRefreshButton>
            </div>
            <div>
                <!-- <TwButton color="indigo">See more</TwButton> -->
            </div>
            <div>
                <TwButton
                    color="green">
                    {{ lang({
                        key: 'models.Ticket.new_label.', defaultValue: 'Create new',
                    }) }}
                </TwButton>
            </div>
        </div>

        <div class="w-full overflow-hidden rounded-lg shadow-xs">
            <div class="mb-6 grid grid-cols-1 gap-x-6 gap-y-8 xl:grid-cols-3 md:grid-cols-2">
                <template
                    v-for="ticket in lastTicketsItems"
                    v-key="ticket.id"
                >
                <TicketCard
                    :ticket="ticket"
                />
                </template>
            </div>
        </div>
    </div>
</TwTabContent>
</template>
