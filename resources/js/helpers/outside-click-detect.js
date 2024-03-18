import { onBeforeUnmount, onMounted } from 'vue'

export default function useDetectOutsideClick(component, callback) {
    if (!component) return
    const listener = (event) => {
        if (event.target !== component.value && !component.value.contains(event.target)) {
            return
        }
        if (typeof callback === 'function') {
            callback()
        }
    }
    onMounted(() => { window.addEventListener('click', listener) })
    onBeforeUnmount(() => { window.removeEventListener('click', listener) })

    return { listener }
}
