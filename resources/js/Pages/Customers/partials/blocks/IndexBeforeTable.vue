<template>
    <div class="py-6">
        <div>
            <div v-if="$page.props.flash?.message" class="alert">
                {{ $page.props.flash?.message }}
            </div>
        </div>
        <div>
            <div class="card flex justify-content-center">
                <Button
                    label="Check"
                    icon="pi pi-check"
                >My Button</Button>
            </div>
            <div class="card flex justify-content-center text-white py-5">
                <Toast />
                <Button label="Show" @click="show()" />
            </div>
        </div>

        <AdvancedButton
            :clickHandler="testeRedirOnClick"
            v-bind="getNotificationPayload('info', 'Meu teste info', null, {algo: '12fef'})"
        >Teste de notificação info</AdvancedButton>

        <AdvancedButton
            :clickHandler="testeRedirOnClick"
            v-bind="getNotificationPayload('success', 'Meu teste success', null, {algo: '12fef'})"
        >Teste de notificação success</AdvancedButton>

        <AdvancedButton
            :clickHandler="testeRedirOnClick"
            v-bind="getNotificationPayload('success', 'Meu teste success -1', null, {duration: -1})"
        >Teste de notificação success duration -1</AdvancedButton>
    </div>
</template>

<script setup>
import AdvancedButton from '@/Pages/Customers/partials/AdvancedButton.vue';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

let getNotificationPayload = (type, message, title, options) => {
    return {
        goToRoute: 'toast-test',
        routeParams: {
            type,
        },
        routeMethod: 'get',
        routeData: {
            type,
            message,
            title,
            options: {
                ...(isObject(options) ? options : {}),
            },
        }
    };
}

const testeRedirOnClick = (event, attrs = {}, slots = {}) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('goToRoute');
    // goToRoute
    // AppInertiaHelpers.goToRoute('dashboard');

    // toast.info('toastify success');
}
</script>
