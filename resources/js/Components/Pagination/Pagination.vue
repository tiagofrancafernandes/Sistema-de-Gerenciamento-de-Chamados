<template>
<div
    class="grid px-4 py-3 text-sm font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
>
    <!-- Pagination -->

    <span class="flex items-center col-span-3">
        {{ countOfText }}
    </span>
    <span class="col-span-2"></span>
    <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="paginate navigation">
            <ul class="inline-flex items-center">
                <template
                    v-for=" (link, index) in items.links"
                    :key="index"
                >
                    <li
                        v-if="link.url"
                    >
                        <Link
                            class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                            :class="[
                                'inline-block',
                                {'hover:bg-gray-600': !link.active},
                                {'text-white': link.url},
                                {'transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple': link.active},
                            ]"
                            :aria-label="link.label"
                            :href="link.url"
                            v-html="link.label"
                        />
                    </li>
                    <span
                        v-else
                        class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        v-html="link.label"
                    ></span>
                </template>
            </ul>
        </nav>
    </span>
</div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import { computed } from "vue";
import { translate } from '@/helpers/localization';

const props = defineProps({
    items: Object,
})

const countOfText = computed(() => {
    let show = true; // WIP

    if (!show) {
        return '';
    }

    let text = localization.translate({key: 'Showing :current of :total'});

    return text.replaceAll(':current', props.items.data?.length || 0).replaceAll(':total', props.items.total);
})

// console.log(JSON.stringify(props.items))
</script>
