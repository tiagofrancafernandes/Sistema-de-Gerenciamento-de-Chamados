// import IndexBeforeTable from '@/Pages/Customers/partials/blocks/IndexBeforeTable.vue';

/**
 * Allow call function without manual import
 */
const AutoLoader = {
    /**
     * Components registration
     */
    components: {
        // 'IndexBeforeTable': IndexBeforeTable,
        // 'TesteIndexBeforeTable': IndexBeforeTable, // Alias
    },

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
        //
    },

    /**
     * myFunction: (...params) => {}, // Can call `myFunction('any value')`
     */
    globalFunctions: {
        //
    },

    /**
     * Global Prefix
     * If value like 'pl_', need call `pl_myFunction('any value')`
     */
    prefix: '',
};

export default AutoLoader
