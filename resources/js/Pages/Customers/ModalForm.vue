<script setup>
import { computed, ref, reactive } from "vue";
import { usePage, useForm, router } from "@inertiajs/vue3";
import InputText from "@/Components/FormBlocks/InputText.vue";

const page = usePage();
const user = computed(() => page.props.auth.user);

const props = defineProps({
    modalInfo: {
        type: Object,
        required: true,
    },
    routeName: {
        type: String,
        required: true,
    },
    routeParams: {
        type: Object,
    },
    triggerClass: {
        default: null,
    },
});

let form = useForm({
    name: null,
    email: null,
});

let modalId = computed(() => props.modalInfo.id);

let triggerClass = computed(() => {
    let classList = [
        'px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white',
        'bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-0 focus:outline-none',
        'focus:ring-none dark:bg-indigo-600 dark:hover:bg-indigo-700',
        'dark:focus:ring-none md:visible invisible',
        props.triggerClass,
    ];

    let uniqueClasses = [...new Set(classList)];

    return uniqueClasses;
});

let submit = () => {
    let routeParams = props.routeParams || null;

    let formOptions = {
        preserveScroll: true,
        // onSuccess: () => form.reset('email'),
        // onStart
        // onFinish
    };

    let onStart = props.modalInfo?.formHooks?.onStart || null;
    let onSuccess = props.modalInfo?.formHooks?.onSuccess || null;
    let onFinish = props.modalInfo?.formHooks?.onFinish || null;
    let onBefore = props.modalInfo?.formHooks?.onBefore || null;
    let onProgress = props.modalInfo?.formHooks?.onProgress || null;
    let onCancel = props.modalInfo?.formHooks?.onCancel || null;
    let onError = props.modalInfo?.formHooks?.onError || null;

    if (onStart) { formOptions.onStart = () => onStart(form); }
    if (onSuccess) { formOptions.onSuccess = () => onSuccess(form); }
    if (onFinish) { formOptions.onFinish = () => onFinish(form); }
    if (onBefore) { formOptions.onBefore = () => onBefore(form); }
    if (onProgress) { formOptions.onProgress = () => onProgress(form); }
    if (onCancel) { formOptions.onCancel = () => onCancel(form); }
    if (onError) { formOptions.onError = () => onError(form); }

    form.post(
        route(props.routeName, routeParams),
        formOptions,
    );
};

let handleInputChange = (event) => {
    let { itemId, value } = event;

    if (!itemId || !(itemId in form)) {
        return;
    }

    form[itemId] = value;
    console.log("eventChange", "event", event, itemId, value);
};
</script>

<template>
    <!-- Modal toggle -->
    <div class="flex justify-center m-5">
        <button
            id="updateProductButton"
            :data-modal-target="modalId"
            :data-modal-toggle="modalId"
            :class="triggerClass"
            type="button"
        >
            <slot name="trigger"></slot>
        </button>
    </div>

    <!-- Main modal -->
    <div
        :id="modalId"
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
    >
        <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">
            <!-- Modal content -->
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <!-- Modal header -->
                <div
                    class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
                >
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ modalInfo.title }}
                    </h3>
                    <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        :data-modal-toggle="modalId"
                    >
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form @submit.prevent="submit">
                    <div class="w-full p-5 text-white dark:text-dark">
                        {{ form.name }}
                    </div>

                    <div
                        class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 md:grid-cols-4"
                    >
                        <InputText
                            :itemValue="form.name"
                            :form="form"
                            itemId="name"
                            placeholder="Name"
                            label="Name"
                            colSpan="2"
                            :class="{
                                //'col-span-2' : false,
                            }"
                            v-on:input-changed="handleInputChange"
                        />

                        <InputText
                            :itemValue="form.email"
                            :form="form"
                            itemId="email"
                            type="email"
                            label="E-mail"
                            colSpan="2"
                            v-on:input-changed="handleInputChange"
                        />

                        <div class="col-span-2">
                            <label
                                for="category"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Área de atuação</label
                            >
                            <select
                                id="category"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="">Selecione uma área</option>
                                <option value="industria">Indústria</option>
                                <option value="tecnologia">Tecnologia</option>
                                <option value="alimenticio">Alimentício</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                        <div class="col-span-4">
                            <label
                                for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Description</label
                            >
                            <textarea
                                id="description"
                                rows="5"
                                class="block p-2.5 min-h-24 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Write a description..."
                            ></textarea>
                        </div>
                    </div>
                    <div class="flex justify-between space-x-4">
                        <button
                            :disabled="form.processing"
                            type="button"
                            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                            <svg
                                class="mr-1 -ml-1 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            Delete
                        </button>

                        <button
                            :disabled="form.processing"
                            type="submit"
                            class="text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-200 dark:hover:text-green-100 dark:bg-green-600 dark:hover:bg-transparent dark:focus:ring-green-900"
                        >
                            <svg
                                class="mr-1 -ml-1 w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
