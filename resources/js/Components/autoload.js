import { toaster, } from '@/helpers/toast-helpers'
import IndexBeforeTable from '@/Pages/Customers/partials/blocks/IndexBeforeTable.vue';

const components = {
    'IndexBeforeTable': IndexBeforeTable,
};

/**
 * Allow call function without manual import
 */
const AutoLoader = {
    /**
     * Components registration
     */
    components: components,

    /**
     * Prefix of autoloaded components
     * If value like 'Abc', 'MyButton' component will be called of 'AbcMyButton'
     */
    componentsPrefix: '',

    /**
     * Plugins [WIP]
     *
     * Vue3Toastify, // Basic
     * [Vue3Toastify, { autoClose: 1000 }], // With params/config
     */
    plugins: [
        //
    ],

    /**
     * Method used on `app.mixin` and `app.provide`
     */
    methods: {
        toast: toaster.default,
    },

    /**
     * myFunction: (...params) => {}, // Can call `myFunction('any value')`
     */
    globalFunctions: {
        toast: toaster.default,
    },

    /**
     * Global Prefix
     * If value like 'pl_', need call `pl_myFunction('any value')`
     */
    prefix: '',
};

export default AutoLoader
