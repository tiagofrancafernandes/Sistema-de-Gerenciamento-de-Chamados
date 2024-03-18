<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import ModalForm from '@/Pages/Customers/ModalForm.vue';
import { computed, ref, onMounted } from 'vue'
import { Head, usePage } from '@inertiajs/vue3'
import { lang } from '@/helpers/localization';
// import { get } from 'radash';
import { __get } from '@/helpers/data-helpers';

import CustomerTab from '@/Pages/Customers/partials/CustomerTab.vue'
const page = usePage();
const user = computed(() => page.props.auth.user);

const props = defineProps({
    icons: {
        type: Object,
    },
    customerId: {
        type: String,
    },
    activeTab: {
        type: String,
        default: 'about',
    },
    customer: {
        type: Object,
    },
    tabContent: {
        default: [],
    },
    loadOnTab: {
        default: null,
    },
})

let customerId = ref(props.customerId);

const getAsset = (asset) => {
    let assetUrl = page.props.url?.assetUrl;

    if (!assetUrl) {
        return null;
    }

    assetUrl = assetUrl.replace(/(\/)$/, '');

    if (!asset) {
        return assetUrl;
    }

    return `${assetUrl}/${asset}`;
}

const getCustomer = (key = null, defaultValue = null) => {
    return key ? __get(props.customer || {}, key, defaultValue = null) : customer;
}

const fakeList = ["dolore", "asperiores", "possimus", "quisquam", "placeat", "illo"];

const getIcon = (icon, classes = 'w-5 h-4') => {
    if (!icon) {
        return null;
    }

    let iconData = (icon in props.icons) ? props.icons[icon] : null;

    iconData = (`${iconData}`).trim();

    if (!iconData) {
        return null;
    }

    if (!classes) {
        return iconData;
    }

    classes = Array(classes);

    if (Array.isArray(classes)) {
        classes = classes.filter(item => item && typeof item === 'string');
    }

    classes = Array(classes).join(' ').trim();

    return iconData.replace('<svg ', `<svg class="${classes}" `);
};

let modalInfo = ref({
    id: 'customerEdit',
    title: 'Customer Edit',
    triggerLabel: 'Edit',
    actions: {
        delete: true,
        submit: true,
    },
    formHooks: {
        onSuccess: (form) => console.log('onSuccess', form),
        // onSuccess: (form) => form.reset('email'),
        onStart: (form) => console.log('onStart', form),
        onFinish: (form) => console.log('onFinish', form),
    },
    extra: {
        customerId: customerId.value,
    }
})

const getActiveTab = computed(() => props.activeTab);
</script>

<template>
    <Head title="Customer Seu Fulano" />

    <AuthenticatedLayout>
        <template #header>
            <h2
                class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
            >
                Customer Seu Fulano
            </h2>
        </template>

        <div class="container w-7xl mx-auto px-6 grid py-6">
            <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="block">
                    <div
                        class="flex items-center p-5 rounded-t-md shadow bg-cover bg-no-repeat pt-28"
                        v-bind:style="{
                            'background-image': 'url(' + getAsset('images/profile-cover.png') + ')',
                        }"
                    ></div>
                    <div class="bg-white rounded-b-md shadow mb-6 dark:bg-gray-800">
                        <div class="flex items-center justify-between pt-4 pb-6 px-4">
                            <div class="flex items-center">
                                <!-- avatar -->
                                <div
                                    class="w-24 h-24 mr-2 relative flex justify-end items-end -mt-10"
                                    :class="[
                                        'hidden', // Ocultar enquando desenvolvo as novas funcionalidades
                                    ]"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                        class="rounded-full border-4 border-white w-24 h-24"
                                        alt=""
                                    />
                                    <a
                                        href="#!"
                                        class="absolute top-0 right-0 mr-2"
                                        data-bs-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Verified"
                                        data-bs-original-title=""
                                    >
                                        <span v-html="getIcon(
                                            'check-badge',
                                            'w-8 h-8 fill-blue-500 stroke-white hover:stroke-blue-200'
                                        )"></span>
                                    </a>
                                </div>
                                <!-- text -->
                                <div class="leading-4">
                                    <h2
                                        class="mb-2 text-lg text-gray-900 whitespace-nowrap dark:text-gray-100"
                                    >
                                        {{ getCustomer('name') }}
                                        <a
                                            href="#!"
                                            class="text-decoration-none"
                                            data-bs-toggle="tooltip"
                                            data-placement="top"
                                            title=""
                                            data-original-title="Beginner"
                                            data-bs-original-title=""
                                        ></a>
                                    </h2>
                                    <p class="mb-0 text-gray-500">
                                    <!-- Acho que aqui é um bom lugar para mostrar o telefone, email etc -->
                                    </p>
                                </div>
                            </div>
                            <div>
                                <ModalForm
                                    :modalInfo="modalInfo"
                                    routeName="customers.update"
                                    :routeParams="{
                                        customerId: customerId,
                                    }"
                                    :triggerClass="'aaa'"
                                >
                                    <template v-slot:trigger>
                                        <span v-html="getIcon('pencil', 'w-3 h-3 text-white me-2')"></span>
                                        {{ lang('Edit customer') }}
                                    </template>
                                </ModalForm>
                            </div>
                        </div>
                        <!-- nav -->
                        <div class="w-full">
                            <CustomerTab
                                :activeTab="props.activeTab"
                                :tabContent="tabContent"
                                :loadOnTab="loadOnTab"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
