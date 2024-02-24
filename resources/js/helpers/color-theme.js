export const getStorageTheme = () => {
    return ['dark', 'light', 'system'].find(item => item === localStorage.getItem('color-theme')) || 'dark';
};

export const getCurrentTheme = () => {
    if (localStorage.getItem('color-theme') === 'system') {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    if (
        localStorage.getItem('color-theme') === 'dark'
        || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        return 'dark';
    }

    return 'light';
}

export const loadTheme = () => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (getCurrentTheme() === 'dark') {
        document.documentElement.classList.add('dark');
        return;
    }

    document.documentElement.classList.remove('dark')
}

export const setTheme = (theme = null) => {
    theme = ['dark', 'light', 'system'].includes(theme) ? theme : 'system';
    localStorage.setItem('color-theme', theme);
    loadTheme();
}

export const switchTheme = () => {
    let themes = [
        'dark',
        'light',
        // 'system',
    ];

    let newColorIndex = themes.findIndex(item => item === getStorageTheme()) +1;

    newColorIndex = newColorIndex >= themes.length || newColorIndex < 0 ? 0 : newColorIndex;

    let newColor = themes.at(newColorIndex) || 'dark';

    setTheme(newColor);
}

export const listenSchemeChange = () => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        // console.log('changed', window.matchMedia('(prefers-color-scheme: dark)').matches, event.matches);
        setTheme(event.matches ? 'dark' : 'light');
    });
}
