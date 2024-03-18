export const getTagClasses = (color = null) => {
    color = color ? `${color}` : 'default';

    if (['dark'].includes(color)) {
        return 'bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-gray-300';
    }

    if (['gray'].includes(color)) {
        return 'bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300';
    }

    if (['red', 'danger'].includes(color)) {
        return 'bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300';
    }

    if (['green', 'success'].includes(color)) {
        return 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300';
    }

    if (['yellow', 'warning'].includes(color)) {
        return 'bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300';
    }

    if (['indigo'].includes(color)) {
        return 'bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300';
    }

    if (['purple'].includes(color)) {
        return 'bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300';
    }

    if (['pink'].includes(color)) {
        return 'bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300';
    }

    if (['default'].includes(color)) {
        return 'bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300';
    }

    if (['info'].includes(color)) {
        return 'text-xs font-semibold mr-2 px-2.5 py-0.5 rounded md:inline bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800';
    }

    return 'bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300';
}

/**
 * getBgColor()
 */
export const getBgColor = (color) => {
    if (['dark'].includes(color)) {
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-gray-100';
    }

    if (['gray'].includes(color)) {
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-gray-100';
    }

    if (['red', 'danger'].includes(color)) {
        return 'bg-red-200 hover:bg-red-300 text-red-800 dark:bg-red-700 dark:hover:bg-red-800 dark:text-red-100';
    }

    if (['green', 'success'].includes(color)) {
        return 'bg-green-200 hover:bg-green-300 text-green-800 dark:bg-green-700 dark:hover:bg-green-800 dark:text-green-100';
    }

    if (['yellow', 'warning'].includes(color)) {
        return 'bg-yellow-200 hover:bg-yellow-300 text-yellow-800 dark:bg-yellow-700 dark:hover:bg-yellow-800 dark:text-yellow-100';
    }

    if (['indigo'].includes(color)) {
        return 'bg-indigo-200 hover:bg-indigo-300 text-indigo-800 dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:text-indigo-100';
    }

    if (['purple'].includes(color)) {
        return 'bg-purple-200 hover:bg-purple-300 text-purple-800 dark:bg-purple-700 dark:hover:bg-purple-800 dark:text-purple-100';
    }

    if (['pink'].includes(color)) {
        return 'bg-pink-200 hover:bg-pink-300 text-pink-800 dark:bg-pink-700 dark:hover:bg-pink-800 dark:text-pink-100';
    }

    if (['default'].includes(color)) {
        return 'bg-blue-200 hover:bg-blue-300 text-blue-800 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-blue-100';
    }

    if (['info'].includes(color)) {
        return 'md:inline bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800';
    }

    return 'bg-blue-200 hover:bg-blue-300 text-blue-800 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-blue-100';
}
