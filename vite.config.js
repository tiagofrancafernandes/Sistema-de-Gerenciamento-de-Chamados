import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            '@assets': path.resolve(__dirname, './resources/js/assets'),
            '@libs': path.resolve(__dirname, './resources/js/libs'),
            '@public': path.resolve(__dirname, './public'),
            '@components': path.resolve(__dirname, './resources/js/components'),
            '@tiagof2': path.resolve(__dirname, './resources/js/libs/tiagof2'),
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
