<script setup>
import { ref, computed } from 'vue';
import { getTagClasses } from '@/helpers/theme-helpers';
// import { lang } from '@/helpers/localization';

const props = defineProps({
    ticket: {
        type: Object,
    },
})

let options = ref({
    topMenuOpen: false,
});

let cardRef = ref();

window.addEventListener('click', ev => {
    // console.log('Click', ev.target == cardRef)
    let optionsValue = options.value;
    if (optionsValue.topMenuOpen === true) {
        optionsValue.topMenuOpen = false;
    }

    options.value = optionsValue;
});

const justCloseTopMenu = () => {
    let optionsValue = options.value;
    if (optionsValue.topMenuOpen !== true) {
        return;
    }

    optionsValue.topMenuOpen = false;

    options.value = optionsValue;
}

const componentClickHandle = (event) => {
    justCloseTopMenu();
    // return;
    // event.preventDefault();
    // event.stopPropagation();
}

const toggleTopMenuOpen = (event) => {
    let optionsValue = options.value;
    optionsValue.topMenuOpen = !optionsValue.topMenuOpen;
    options.value = optionsValue;
    event.stopPropagation();
    // event.preventDefault();
}

const lastTags = computed(() => {
    let lastTags = props.ticket.lastTags || [];

    ;

    return lastTags.map(tag => {
        tag['classes'] = getTagClasses(tag.color);

        return tag;
    });
});
</script>

<template>
<!-- card -->
<div
    class="px-4 py-3 pt-0 bg-white text-gray-900 border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 md:w-full"
    v-if="ticket"
    @click="componentClickHandle"
    ref="cardRef"
>
    <div class="flex justify-end px-4 pt-4">
        <div class="inline-block">
            <template
                v-for="tag in lastTags"
                v-key="tag"
            >
                <span
                    :class="tag.classes"
                >
                    {{ tag.name }}
                </span>
            </template>
        </div>
        <button
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:none focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            @click="toggleTopMenuOpen"
        >
            <span class="sr-only">Open dropdown</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        <!-- Dropdown menu -->
        <div
            class="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            style="position: absolute;margin: 0px;transform: translate(15px, 38px);"
            :class="{
                'hidden': !options.topMenuOpen,
                'block': options.topMenuOpen,
            }"
        >
            <ul class="p-0 shadow" aria-labelledby="dropdownButton">
                <li>
                    <a
                        href="#"
                        class="rounded-t-lg w-full text-left block px-4 py-2 text-sm text-white bg-sky-800 hover:bg-sky-700 dark:hover:bg-sky-700"
                    >
                        Edit
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        class="w-full text-left block px-4 py-2 text-sm text-white bg-indigo-800 hover:bg-indigo-700 dark:hover:bg-indigo-700"
                    >Export Data</a>
                </li>
                <li>

                    <TwButton
                        classes="rounded-b-lg w-full text-left block px-4 py-2 text-sm text-white bg-red-800 hover:bg-red-700 dark:hover:bg-red-700"
                    >
                        Delete
                    </TwButton>
                </li>
            </ul>
        </div>
    </div>
    <!-- card body -->
    <div class="card-body">
        <!-- card title -->
        <div class="mb-6">
            <h4 class="my-2 font-semibold text-lg">{{ ticket.title }}</h4>
            <ul class="grid grid-flow-row my-2 text-md">
                <li>
                    <span class="pr-2 font-semibold">Status: </span>
                    <span
                        :class="getTagClasses(ticket.statusEnum?.color)"
                    >{{ ticket.statusEnum?.label }}
                    </span>
                </li>
                <li>
                    <span class="pr-2 font-semibold">{{ lang({key: 'Category', defaultValue: 'Category'}) }}:</span>
                    <a
                        href="#!"
                        class="inline-flex font-medium items-center text-blue-600 hover:underline"
                    >
                        {{ ticket.category?.name }}
                    </a>
                </li>
                <li>
                    <span class="pr-2 font-semibold">{{ lang({key: 'Responsible'}) }}:</span>
                    <a
                        href="#!"
                        class="inline-flex font-medium items-center text-blue-600 hover:underline"
                    >
                        <!-- Aqui vai o nome de quem está atendendo  -->
                    </a>
                </li>
                <li>
                    <span class="pr-2 font-semibold">Created at:</span>
                    <a
                        :href="'#!user=' + ticket.user?.id"
                        class="inline-flex font-medium items-center text-blue-600 hover:underline"
                    >
                        {{ formatDate(ticket.created_at) }}
                    </a>
                </li>
                <li>
                    <span class="pr-2 font-semibold">Created to:</span>
                    <a
                        :href="'#!user=' + ticket.user?.id"
                        class="inline-flex font-medium items-center text-blue-600 hover:underline"
                    >
                        {{ ticket.user?.name }}
                    </a>
                </li>
                <li>
                    <template
                        v-if="ticket.opened_to && ticket.opened_to != ticket.created_by"
                    >
                        <span class="pr-2 font-semibold">Created by:</span>
                        <a
                            :href="'#!user=' + ticket.creator?.id"
                            class="inline-flex font-medium items-center text-blue-600 hover:underline"
                        >
                            {{ ticket.creator?.name }}
                        </a>
                    </template>
                    <template v-else>
                        <span class="p-2"></span>
                    </template>
                </li>
            </ul>
        </div>
        <!-- text -->
        <div>
            <h5 class="pr-2">Content:</h5>
            <div
                :class="[
                    'px-3 py-2 mt-2 mb-6 max-h-80 overflow-y-auto overflow-x-hidden',
                    'border border-gray-200 rounded-lg shadow dark:border-gray-700',
                ]"

                v-html="(ticket.decodedContent + ticket.decodedContent + ticket.decodedContent)"
            ></div>
        </div>

        <div class="flex items-center justify-between">
            <div>
                <TwButton
                    :class="'cursor-wait'"
                    disabled
                >See more</TwButton>
            </div>
            <div>
                <TwButton color="indigo">See more</TwButton>
            </div>
        </div>
    </div>
</div>
</template>
