import { reactive, readonly } from 'vue';

const state = reactive({
    toasts: []
});

const addToast = ({ message, variant = ToastVariant.DEFAULT }) => {
    state.toasts.push({
        message,
        color: ToastVariantMap.get(variant).color,
        textColor: ToastVariantMap.get(variant).textColor
    });
};

const removeToast = (id) => {
    const index = state.toasts.findIndex(t => t.id === id);
    if (index !== -1) {
        state.toasts.splice(index, 1);
    }
};

export const ToastVariant = Object.freeze({
    DEFAULT: 'DEFAULT',
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
});

export const ToastVariantMap = new Map([
    [ToastVariant.DEFAULT, { color: undefined, textColor: undefined }],
    [ToastVariant.SUCCESS, { color: undefined, textColor: 'success' }],
    [ToastVariant.WARNING, { color: undefined, textColor: 'warning' }],
    [ToastVariant.ERROR, { color: undefined, textColor: 'danger' }],
]);

export default {
    state: readonly(state),
    addToast,
    removeToast
};