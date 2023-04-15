import { acceptHMRUpdate, defineStore } from "pinia";
import type LoginForm from '../types/LoginForm'
import { User } from "../types/User";
import axiosClient from "../plugins/axiosClient";
import { AxiosResponse } from "axios";
import { useToast } from "vue-toastification";
import router from "../router";
import { notificationAxiosError } from "../utils/helpers.functions";

const toast = useToast();

export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            login: {
                form: {
                    email: 'admin@admin.com',
                    password: 'password'
                } as LoginForm,
                loading: false
            },
            user: {
                id: null,
                name: null,
                admin: false,
                email: null,
                token: null
            } as User
        }
    },
    getters: {
        getToken: (state) => state.user.token,
        isUserLog: (state) => state.user.token === null ? false : true,
        disableLogin: (state) => state.login.form.email === '' || state.login.form.password === '',
        isAdmin: (state) => state.user.admin
    },
    actions: {
        async _login() {
            try {
                this.$state.login.loading = true;
                const { email, password } = this.$state.login.form;
                // Make POST request to the login endpoint
                const response: AxiosResponse = await axiosClient.post("/login", { email, password });

                // Update state with user data and token
                const { data } = response;
                this.$state.user = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    admin: data.user.admin,
                    token: data.token
                }

                // Save the token to local storage for later use
                localStorage.setItem("token", data.token);

                // Show success message and redirect to clients page
                this.$state.login.loading = false;
                toast.success("Your login was successful");
                router.push({ name: 'clients' });
            } catch (error: unknown) {
                // Show error message if there was an error with the request
                this.$state.login.loading = false;
                toast.error(notificationAxiosError(error))
            }
        },
        async _getUser(token: string) {
            // Make the API call with authorization header
            const response: AxiosResponse = await axiosClient.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Destructure user data from response
            const { id, name, email, admin } = response.data;

            // Set user data in state
            this.$state.user = { id, name, email, admin, token };
        },
        async _logout() {
            try {
                const { token } = this.$state.user;

                // Send a POST request to the server to log out the user.
                const response: AxiosResponse = await axiosClient.post('/logout', null, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // If the logout was successful, remove the token from localStorage and redirect the user to the login page.
                if (response) {
                    localStorage.removeItem("token");
                    router.push({ name: 'login' });
                    toast.success("You have successfully logged out.");
                }

                // Reset the state of the login form.
                this.$reset();
            } catch (error: any) {
                // If an error occurs, display a toast message with the error details.
                toast.error(notificationAxiosError(error));
            }
        }
    }
});

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}