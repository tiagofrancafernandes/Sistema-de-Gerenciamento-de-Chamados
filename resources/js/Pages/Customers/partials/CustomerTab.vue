<script setup>
import { computed, ref, shallowRef, onMounted } from 'vue';
import { usePage, useForm, router } from "@inertiajs/vue3";
import * as inertiaHelpers from '@/helpers/inertia-helpers'

import About from "@/Pages/Customers/partials/tabs/About.vue";
import Contact from "@/Pages/Customers/partials/tabs/Contact.vue";
import CustomerTabOne from '@/Pages/Customers/partials/CustomerTabOne.vue';
import LastTickets from '@/Pages/Customers/partials/tabs/LastTickets.vue';
import TwButton from '@/Components/Tw/TwButton.vue';

const props = defineProps({
    activeTab: {
        default: 'about',
    },
    loadOnTab: {
        default: null,
    },
    tabContent: {
        type: Object,
        default: {},
    },
})

const handleTabChange = (data) => {
    inertiaHelpers.reloadCurrentGet(data);
}

const tabs = computed(() => [
    {
        id: 'about',
        component: About,
        label: {
            key: 'models.Customer.about_tab_label.',
            defaultValue: 'About',
        },
    },
    {
        id: 'contact',
        component: Contact,
        label: {
            key: 'models.Customer.contact_tab_label.',
            defaultValue: 'Contact',
        },
    },
    {
        id: 'customer-tab-one',
        component: CustomerTabOne,
        label: 'CustomerTabOne',
        show: false,
    },
    {
        id: 'last-tickets',
        component: LastTickets,
        label: {
            key: 'models.Ticket.last_tickets.',
            defaultValue: 'Last tickets',
        },
    },
]);

let defaultTab = 'about';

const getActiveTab = (id = null) => {
    return tabs.value.find(item => item.id == (id || props.activeTab || defaultTab));
};

let currentTab = shallowRef(getActiveTab());

onMounted(() => {
    if (!currentTab.value) {
        currentTab.value = getActiveTab(props.activeTab || defaultTab);
    }
})

router.on('navigate', (event) => {
  console.log(`Navigated to ${event.detail.page.url}`)
})

router.on('finish', (event) => {
  console.log(`The route changed to ${event.detail.visit.url}`);
  console.log('props.activeTab', props.activeTab);
  currentTab.value = getActiveTab(props.activeTab)
});

</script>

<template>
<div class="">
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
            <template
                v-for="(tab, tabIndex) in tabs"
                :key="tabIndex"
            >
                <li
                    v-if="tab.show !== false"
                    class="me-2"
                    role="presentation"
                >
                    <button
                        __click="currentTab = tab"
                        @click="handleTabChange({tab: tab.id})"
                        :class="{
                            'text-lg inline-block p-4 border-b-2 rounded-t-lg': true,
                            'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500': currentTab && currentTab.component == tab?.component,
                            'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700': !currentTab || currentTab?.component != tab.component,
                        }"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="true"
                    >
                        {{ lang(tab.label) }}
                    </button>
                </li>
            </template>
        </ul>
    </div>
    <div v-if="currentTab">
        <keep-alive>
            <component
                :is="currentTab.component"
                :active="true"
                :loadOnTab="loadOnTab"
                :tabContent="tabContent"
            />
        </keep-alive>
    </div>
</div>
</template>
