<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import ModalForm from '@/Pages/Customers/ModalForm.vue';
import { computed, ref } from 'vue';
import { Head, usePage } from '@inertiajs/vue3'

const page = usePage();
const user = computed(() => page.props.auth.user);

const props = defineProps({
    icons: {
        type: Object,
    },
    customerId: {
        type: String,
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
                                        Jitu Chauhan
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
                                    <p class="mb-0 text-gray-500">@imjituchauhan</p>
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
                                        Editar cliente
                                    </template>
                                </ModalForm>
                            </div>
                        </div>
                        <!-- nav -->
                        <div class=" ">
                            <!-- list -->
                            <ul
                                class="flex flex-no-wrap overflow-auto text-center text-gray-500 border-gray-300 border-t"
                            >
                                <template v-for="(item, index) in fakeList" v-key="index">
                                    <li class="mr-1">
                                        <a
                                            href="#!"
                                            class="p-4 font-semibold border-t-2"
                                            v-bind:class="{
                                                'block text-indigo-600 border-indigo-600 bg-indigo-100 active':
                                                    index === 0, // active

                                                // inactive
                                                'inline-block text-gray-800 dark:text-gray-100 border-transparent': !(
                                                    index === 0
                                                ),
                                                'hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-100': !(
                                                    index === 0
                                                ),
                                            }"
                                            v-bind:aria-current="
                                                index === 0 ? 'page' : null
                                            "
                                            >{{ item }}</a
                                        >
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container w-7xl mx-auto px-6 grid py-6">
            <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="mb-6 grid grid-cols-1 gap-x-6 gap-y-8 xl:grid-cols-3 md:grid-cols-2">
                    <template v-for="listItem in fakeList" v-key="listItem">
                        <!-- card -->
                        <div
                            class="p-6 bg-white text-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 md:w-full"
                        >
                            <!-- card body -->
                            <div class="card-body">
                                <!-- card title -->
                                <h4 class="mb-6 font-semibold">Sobre o cliente</h4>
                                <h5
                                    class="uppercase tracking-widest text-sm font-semibold"
                                >
                                    Bio
                                </h5>
                                <!-- text -->
                                <p class="mt-2 mb-6">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit. Suspen disse var ius enim in eros elementum
                                    tristique. Duis cursus, mi quis viverra ornare, eros
                                    dolor interdum nulla, ut commodo diam libero vitae
                                    erat.
                                </p>
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
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
