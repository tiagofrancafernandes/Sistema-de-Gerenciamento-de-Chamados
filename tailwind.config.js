import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import flowbite from 'flowbite/plugin';
import colors from 'tailwindcss/colors';
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
        'resources/js/helpers/**/*.{vue,js,ts,jsx,tsx}',
        './resources/js/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
        // colors: {
        //     ...colors,
        //     transparent: 'transparent',
        //     current: 'currentColor',
        //     black: colors.black,
        //     white: colors.white,
        //     gray: colors.gray,
        //     emerald: colors.emerald,
        //     indigo: colors.indigo,
        //     yellow: colors.yellow,
        // },
    },
    plugins: [
        flowbite,
        require('@tailwindcss/typography'),
        forms,
    ],
};
