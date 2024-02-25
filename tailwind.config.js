import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import flowbite from 'flowbite/plugin';
// import typography from ' @tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: [
        'class',
        // 'media',
    ], // Enable both class and media query based dark mode
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        './resources/js/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        flowbite,
        require('@tailwindcss/typography'),
        forms,
    ],
};
