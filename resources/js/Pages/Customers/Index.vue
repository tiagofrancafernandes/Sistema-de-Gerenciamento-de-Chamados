<script setup>
// import { get } from 'radash';
import { __get } from '@/helpers/data-helpers';
import { Head } from "@inertiajs/vue3";
import { Link } from "@inertiajs/vue3";
import { computed, onMounted } from 'vue';
import { randomString, validStringOr } from '@/helpers/string-helpers';
import { toaster, } from '@/helpers/toast-helpers'

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Pagination from '@/Components/Pagination/Pagination.vue';
import TableTd from '@tiagof2/vuejs-crud/js/components/table/TableTd.vue';
import TableTr from '@tiagof2/vuejs-crud/js/components/table/TableTr.vue';
import AdvancedButton from '@/Pages/Customers/partials/AdvancedButton.vue';

// import {
//     getColumnLabel,
//     defaultColumnContentHandler,
//     getColumnData,
//     generateHeader,
// } from '@tiagof2/vuejs-crud/js/helpers'


// import customers from "@/static/customers.json";

const props = defineProps({
    items: {
        type: Object,
    },
    tablecolumns: {
        type: Array,
        // required: true,
    },
    hookComponents: {
        type: Object,
    },
});

onMounted(() => {
    window.addEventListener('table:header:click', ev => {
        console.log('table:header:click', ev.detail);
    })
});


let fakeTablecolumns = [
    // {
    //     key: 'id',
    //     label: 'ID',
    //     translateLabel: false,
    //     // columnContent: 'Conteudo estático aqui',
    //     // columnContent: '', // Coluna sem conteudo (não vai buscar em 'columnContentHandler')
    //     columnContent: null, // Coluna sem conteudo (vai buscar em 'columnContentHandler', e se existir, returna)
    //     columnContentHandler: null, // Vai retornar o valor (como string) do valor em 'data', baseado no 'key' do header
    //     columnContentHandler: (headerInfo, data) => { // Forma manual de apresentação do conteudo
    //         let name = data['name'] ?? null;
    //         return `Nome <strong>${name}</strong>`;
    //     }
    // },

    {
        key: 'id',
        label: 'ID',
        translateLabel: false,
    },
    {
        key: 'name',
        label: 'Name',
        translateLabel: true,
    },
    {
        key: 'created_at',
        label: 'Last update',
        translateLabel: true,
        columnContentHandler: (headerInfo, data) => {
            let key = validStringOr(__get(headerInfo, 'key'));

            if (!key) {
                return null;
            }

            let value = data[key] ?? null;

            return value ? formatDate(value) : value;
        },
    },
    {
        key: 'id',
        label: 'Actions',
        translateLabel: true,
        columnComponent: {
            component: AdvancedButton,
            componentParams: {
                goToRoute: 'customers.update',
                routeParams: {
                    customerId: 2,
                },
                routeMethod: 'post',
                routeData: {
                    name: 'Tiago',
                    email: 'teste@site.com',
                },

                // goToRoute: 'dashboard',
                // routeParams: [{
                //     term: 'algo'
                // },{
                //     filters: {
                //         types: [12, 67, 45]
                //     }
                // }]
            },
        },
        columnContentHandler: (headerInfo, data) => {
            return 'Actions vão aqui';
        },
    },
    // {
    //     key: 'id',
    //     label: 'ID',
    //     translateLabel: false,
    //     columnContentHandler: (headerInfo, data) => {
    //         let key = validStringOr(__get(headerInfo, 'key'));

    //         if (!key) {
    //             return null;
    //         }

    //         let value = data[key] ?? null;
    //         return value;
    //     },
    // },
];//TODO: remover

const tableID = 'my-table';//TODO: remover

const tableInfo = generateTableInfo({
    id: tableID,
    title: 'models.Customer.index_title',
    tanslateTitle: true,
    label: 'models.Customer.label',
    tanslateTabel: true,
    pluralLabel: 'models.Customer.pluralLabel',
    tanslateTluralLabel: true,
    pages: {
        index: generateTablePageInfo('index'),
        edit: generateTablePageInfo('edit', ['id']),
        show: generateTablePageInfo('show', ['id']),
    },
    tablecolumns: fakeTablecolumns,
    tableExtraData: {
        abc: 123, // Qualquer informação que queira compartilhar com o componente
    },
})

// const getTablecolumns = () => tablecolumns.map(item => generateHeader(tableInfo, item));

// console.log('getRouteInfo params', AppInertiaHelpers.getRouteInfo('dashboard', [{'abc': 123}, {'dgf': 123}]));
// console.log('getRouteInfo params', AppInertiaHelpers.getRouteInfo('customers.update', {customerId: 123}));
// console.log('getRouteInfo params', AppInertiaHelpers.getRouteInfo('customers.update', 456));
// console.log('getRouteInfo params', AppInertiaHelpers.getRouteInfo('customers.update', [456, 45]));

// console.log('router dashboard', router.push('dashboard'))

let title = computed(() => tableInfo.getTitle());
let customers = computed(() => props.items.data);

let getHookComponents = () => {
    let hookComponents = valueIfFilled(props.hookComponents);

    return hookComponents && isObject(hookComponents) ? hookComponents : {}
}

const beforeTable = computed(() => {
    return getHookComponents().beforeTable;
})

const afterTable = computed(() => {
    return getHookComponents().afterTable;
})
</script>

<template>
    <Head :title="title" />

    <AuthenticatedLayout>
        <template #header>
            <h2
                class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
            >
                {{ title }}
            </h2>
        </template>

        <div class="container w-7xl mx-auto px-6 grid pb-6">
            <div
                v-if="beforeTable"
                class="w-full"
            >
                <component :is="beforeTable"></component>
            </div>

            <div
                class="w-full overflow-hidden rounded-lg shadow-xs"
                :class="{
                    'mt-6': !beforeTable,
                }"
            >
                <div class="w-full overflow-x-auto">
                    <table class="w-full whitespace-no-wrap">
                        <thead>
                            <tr
                                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                            >
                                <template
                                    v-for="header in tableInfo.getColumns()"
                                    v-key="header.uid"
                                >
                                    <th
                                        class="px-4 py-3"
                                        @click="header.onClickHeader"
                                    >
                                        {{ getColumnLabel(header) }}
                                    </th>
                                </template>
                            </tr>
                        </thead>
                        <tbody
                            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                        >
                            <template
                                v-for="RECORD in customers"
                                v-key="RECORD"
                            >
                                <TableTr>
                                    <template
                                        v-for="columnConfig in tableInfo.getColumns()"
                                        v-key="columnConfig.uid"
                                    >
                                        <template
                                            v-if="columnConfig.columnComponent?.component"
                                        >
                                            <TableTd>
                                                <component
                                                    :is="columnConfig.columnComponent?.component"
                                                    :renderConfig="columnConfig"
                                                    :record="RECORD"
                                                    v-bind="columnConfig.columnComponent?.componentParams || {}"
                                                ></component>
                                            </TableTd>
                                        </template>
                                        <template
                                            v-else
                                        >
                                            <TableTd
                                                :renderConfig="columnConfig"
                                                :record="RECORD"
                                            />
                                        </template>
                                    </template>
                                </TableTr>
                            </template>
                        </tbody>
                    </table>
                </div>

                <div class="w-full">
                    <Pagination :items="items" />
                </div>
            </div>

            <div
                v-if="afterTable"
                class="w-full"
            >
                <component :is='afterTable'></component>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
