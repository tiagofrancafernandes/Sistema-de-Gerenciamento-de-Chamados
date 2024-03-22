<script setup>
import { ref, onMounted, computed } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import NavLinkDropdown from "@/Components/NavLinkDropdown.vue";
import NavLink from "@/Components/NavLink.vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import ResponsiveNavColorChange from "@/Components/ResponsiveNavColorChange.vue";
import { Link, usePage } from "@inertiajs/vue3";
import { initFlowbite } from 'flowbite';
import { lang } from '@/helpers/localization';
import { toaster, useAppToaster, processPageToasts } from '@/helpers/toast-helpers'
import { useToastify } from '@/libs/tiagof2/toastify';

import ToastList from '@/Components/prime-vue-extended/ToastList.vue';

import {
    listenSchemeChange,
    getStorageTheme,
    loadTheme,
} from '@/helpers/color-theme'

const page = usePage();
const appToaster = useAppToaster();

const appToastify = useToastify({
    defaultLife: 15000,
});

console.log('page.props?.toast', JSON.stringify(page.props?.toast, null, 4));

appToaster.onSent((ev) => appToastify.processAppToasterEvent(ev));

onMounted(() => {
    listenSchemeChange();
    loadTheme();
    initFlowbite();

    if (page.props?.toast) {
        processPageToasts(page.props?.toast);
    }
});

const showingNavigationDropdown = ref(false);

const currentRouteIn = (...routeNames) => {
    routeNames = routeNames.flat();
    return !!routeNames.find(routeName => typeof routeName === 'string' && route().current(routeName));
}

const profileNavText = computed(
    () => `
        <div class="w-full inline-flex items-center justify-between">
            <div
                class="font-medium text-base text-gray-800 dark:text-gray-100"
            >
                ${page.props.auth.user.name}
            </div>
            <div class="font-medium text-sm text-gray-500 px-2">
                ${page.props.auth.user.email}
            </div>
        </div>
    `
);

const genLink = (params = {}) => {
    const flatArray = (...items) => Array(...items).flat().flat().filter(i => i);

    let tplLink = {
        ...params,
        key: params?.key || StringHelpers.randomString(15) , // string
        route: params?.route || null , // string
        url: params?.url || '#!' , // string
        label: params?.label || '' , // string
        as: params?.as || '' , // string #WIP
        component: params?.component || null , // string
        newTab: params?.newTab || false , // boolean
        isPost: params?.isPost || false , // boolean
        activeWhen: flatArray(params?.activeWhen || []) , // [route name]
        hideOn: flatArray(params?.hideOn || []) ,// ['mobile'|'desktop' ...]
        subItems: flatArray(params?.subItems || []) , // [link]
        show: params?.show || (() => true), // () => boolean
    };

    return tplLink;
}

const links = [
    {
        key: 'dashboard',
        route: 'dashboard',
        url: null,
        label: lang('Dashboard'),
        newTab: false,
        activeWhen: [
            'dashboard'
        ],
        hideOn: [
            // 'mobile',
            // 'desktop',
        ],
        subItems: [],
        show: () => true, // false|true
    },
    {
        key: 'customers.index',
        route: 'customers.index',
        url: null,
        label: lang({key: 'models.Customer.pluralLabel', defaultValue: 'Customers'}),
        newTab: true,
        isPost: false,
        activeWhen: [
            'customers.index',
            'customers.show',
            'customers.edit',
            'customers.create',
        ],
        hideOn: [
            // 'mobile',
            // 'desktop',
        ],
        subItems: [],
        show: () => true, // false|true
        subItems: [],
    },
    genLink({
        groups: [
            'top-right',
        ],
        label: profileNavText.value,
        hideOn: [
            // 'mobile',
            // 'desktop',
        ],
        activeWhen: [
            'profile.edit',
        ],
        subItems: [
            genLink({
                url: '#!',
                as: 'button',
                label: lang('Color change'),
                component: ResponsiveNavColorChange,
                show: () => true, // false|true
            }),
            genLink({
                route: 'profile.edit',
                label: lang('Profile'),
            }),
            genLink({
                route: 'logout',
                label: lang('Log Out'),
                isPost: true,
            }),
        ],
        show: () => true, // false|true
    }),
];

const navigationLinks = computed(() => {
    return links.filter(item => {
        if (!item.show || !item.show()) {
            return false;
        }

        if (!item.key || !(item.route || item.url)) {
            return false;
        }

        return true;
    }) || [];
});

const getNavUrl = (link) => {
    if (!link  || !(link.route || link.url)) {
        return null;
    }

    if (link.route && typeof link.route === 'string') {
        return route(link.route);
    }

    return link.url || null;
}

const isActive = (link) => {
    if (!(link.activeWhen || link.route)) {
        return false;
    }

    let activeWhen = Array(link.activeWhen);
    activeWhen.push(link.route);

    activeWhen = activeWhen.filter(item => item && typeof item === 'string');

    return activeWhen && Array(activeWhen).length && currentRouteIn(activeWhen || []);
}

const navLinksForGroup = (group = null) => {
    let navLinks = Array(navigationLinks.value).flat();

    if (!group) {
        return navLinks.filter(item => !Array(item.groups || []).flat().flat().length);
    }

    return navLinks.filter(item => Array(item.groups || []).flat().flat().includes(group));
}

const getLinks = (linksFor = null, group = null) => {
    let navLinks = navLinksForGroup(group);

    linksFor = (typeof linksFor === 'string') ? (`${linksFor}`).trim() : null;

    if (!linksFor || !linksFor.length) {
        return navLinks || [];
    }

    return navLinks.filter(
        item => !Array(item.hideOn).flat().includes(linksFor)
    ) || [];
};
</script>

<template>
    <ToastList />
    <div>
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav
                class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"
            >
                <!-- Primary Navigation Menu -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center">
                                <Link :href="route('dashboard')">
                                    <ApplicationLogo
                                        class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"
                                    />
                                </Link>
                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <template
                                    v-for="link in getLinks('desktop')"
                                    v-key="link.key"
                                >
                                    <template v-if="link.component">
                                        <component :is="link.component" />
                                    </template>
                                    <template v-else>
                                        <template
                                            v-if="link.subItems && link.subItems.length"
                                        >
                                            <NavLinkDropdown
                                                :active="isActive(link)"
                                            >
                                                <template
                                                    #label
                                                >
                                                    <span v-html="link.label"></span>
                                                </template>

                                                <template #items>
                                                    <template
                                                        v-for="subLink in link.subItems"
                                                        v-key="subLink.key"
                                                    >
                                                        <template v-if="subLink.component">
                                                            <component :is="subLink.component" />
                                                        </template>
                                                        <template v-else>
                                                            <DropdownLink
                                                                v-if="subLink.isPost"
                                                                :href="getNavUrl(subLink)"
                                                                :active="isActive(subLink)"
                                                                method="post"
                                                                as="button"
                                                                v-html="subLink.label"
                                                            />

                                                            <ResponsiveNavLink
                                                                v-else
                                                                :href="getNavUrl(subLink)"
                                                                :active="isActive(subLink)"
                                                                v-html="subLink.label"
                                                            />
                                                        </template>
                                                    </template>


                                                    <!-- <ResponsiveNavColorChange />
                                                    <DropdownLink :href="route('profile.edit')">
                                                        Profile
                                                    </DropdownLink>
                                                    <DropdownLink
                                                        :href="route('logout')"
                                                        method="post"
                                                        as="button"
                                                    >
                                                        Log Out
                                                    </DropdownLink> -->
                                                </template>
                                            </NavLinkDropdown>
                                        </template>

                                        <template v-else>
                                            <NavLink
                                                v-if="link.isPost"
                                                :href="getNavUrl(link)"
                                                :active="isActive(link)"
                                                method="post"
                                                as="button"
                                                v-html="link.label"
                                            />

                                            <NavLink
                                                v-else
                                                :href="getNavUrl(link)"
                                                :active="isActive(link)"
                                                :newTab="!!link.newTab"
                                            >
                                                {{ link.label }}
                                            </NavLink>
                                        </template>
                                    </template>
                                </template>
                            </div>
                        </div>

                        <!-- Settings Dropdown -->
                        <template
                            v-for="link in getLinks('mobile', 'top-right')"
                            v-key="link.key"
                        >
                            <template v-if="link.component">
                                <component :is="link.component" />
                            </template>
                            <template v-else>
                                <template
                                    v-if="link.subItems && link.subItems.length"
                                >
                                    <NavLinkDropdown
                                        :active="isActive(link)"
                                    >
                                        <template
                                            #label
                                        >
                                            <span v-html="link.label"></span>
                                        </template>

                                        <template #items>
                                            <template
                                                v-for="subLink in link.subItems"
                                                v-key="subLink.key"
                                            >
                                                <template v-if="subLink.component">
                                                    <component :is="subLink.component" />
                                                </template>
                                                <template v-else>
                                                    <DropdownLink
                                                        v-if="subLink.isPost"
                                                        :href="getNavUrl(subLink)"
                                                        :active="isActive(subLink)"
                                                        method="post"
                                                        as="button"
                                                        v-html="subLink.label"
                                                    />

                                                    <ResponsiveNavLink
                                                        v-else
                                                        :href="getNavUrl(subLink)"
                                                        :active="isActive(subLink)"
                                                        v-html="subLink.label"
                                                    />
                                                </template>
                                            </template>


                                            <!-- <ResponsiveNavColorChange />
                                            <DropdownLink :href="route('profile.edit')">
                                                Profile
                                            </DropdownLink>
                                            <DropdownLink
                                                :href="route('logout')"
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </DropdownLink> -->
                                        </template>
                                    </NavLinkDropdown>
                                </template>

                                <template v-else>
                                    <NavLink
                                        v-if="link.isPost"
                                        :href="getNavUrl(link)"
                                        :active="isActive(link)"
                                        method="post"
                                        as="button"
                                        v-html="link.label"
                                    />

                                    <NavLink
                                        v-else
                                        :href="getNavUrl(link)"
                                        :active="isActive(link)"
                                        :newTab="!!link.newTab"
                                    >
                                        {{ link.label }}
                                    </NavLink>
                                </template>
                            </template>
                        </template>

                        <!-- <NavLinkDropdown>
                            <template #label>
                                {{ $page.props.auth.user.name }}
                            </template>

                            <template #items>
                                <ResponsiveNavColorChange />
                                <DropdownLink :href="route('profile.edit')">
                                    <span class="text-center inline-flex items-center">
                                        <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                    Profile
                                </DropdownLink>
                                <DropdownLink
                                    :href="route('logout')"
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </DropdownLink>
                            </template>
                        </NavLinkDropdown> -->

                        <!-- Hamburger -->
                        <div class="-me-2 flex items-center sm:hidden">
                            <button
                                @click="
                                    showingNavigationDropdown = !showingNavigationDropdown
                                "
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg
                                    class="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        :class="{
                                            hidden: showingNavigationDropdown,
                                            'inline-flex': !showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        :class="{
                                            hidden: !showingNavigationDropdown,
                                            'inline-flex': showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div
                    :class="{
                        block: showingNavigationDropdown,
                        hidden: !showingNavigationDropdown,
                    }"
                    class="sm:hidden"
                >
                    <template
                        v-for="link in getLinks('mobile')"
                        v-key="link.key"
                    >
                        <div
                            :class="[
                                'pt-2 pb-3 space-y-1',
                                'border-t border-gray-200 dark:border-gray-600',
                            ]"
                        >
                            <DropdownLink
                                v-if="link.isPost"
                                :href="getNavUrl(link)"
                                :active="isActive(link)"
                                method="post"
                                as="button"
                                v-html="link.label"
                            />

                            <ResponsiveNavLink
                                v-else
                                :href="getNavUrl(link)"
                                :active="isActive(link)"
                                v-html="link.label"
                            />
                        </div>
                    </template>

                    <!-- Responsive Settings Options -->
                    <div
                        class="py-2 border-t border-gray-200 dark:border-gray-600 border-b-2"
                    >
                            <ResponsiveNavColorChange />
                    </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header class="bg-white dark:bg-gray-800 shadow" v-if="$slots.header">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
