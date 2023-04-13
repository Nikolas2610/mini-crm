import { acceptHMRUpdate, defineStore } from "pinia";
import type LoginForm from '../types/LoginForm'

export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            login: {
                form: {
                    email: '',
                    password: ''
                } as LoginForm,
                loading: false
            }
        }
    },
    getters: {},
    actions: {}
});

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}