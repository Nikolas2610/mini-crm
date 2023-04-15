import { acceptHMRUpdate, defineStore } from "pinia";
import Client from "../types/Client";
import { AxiosResponse } from "axios";
import axiosAuth from "../plugins/axiosAuth";
import { useToast } from "vue-toastification";
import { handleValidationErrors, notificationAxiosError } from "../utils/helpers.functions";
import { ClientForm } from "../types/ClientForm";
import { Pagination } from "../types/Pagination";

const toast = useToast();

export const useClientStore = defineStore("ClientStore", {
    state: () => {
        return {
            newClient: {
                form: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    imageName: '',
                    imageFile: null,
                } as ClientForm,
                loading: false as boolean,
                isModalOpen: false as boolean
            },
            pagination: {
                current_page: 1,
                last_page: undefined,
                per_page: undefined
            } as Pagination,
            clients: [] as Client[],
            loading: false as boolean
        }
    },
    getters: {
        disableSubmit: (state) => state.newClient.form.firstName === '' || state.newClient.form.lastName === '' || state.newClient.form.email === '' || !state.newClient.form.imageFile,
    },
    actions: {
        /**
         * Get Clients
         */
        async _getPaginateClients() {
            // Set loading state to true
            this.$state.loading = true;
            try {
                // Fetch clients from API
                const response: AxiosResponse = await axiosAuth.get(`/client?page=${this.$state.pagination.current_page}`);
                const { data } = response;

                // Update state with clients data
                this.$state.clients = data.data;
                
                // Update state for pagination
                const { current_page, last_page, per_page } = data.meta;
                this.$state.pagination = { current_page, last_page, per_page };
            } catch (error) {
                // Handle errors silently
                console.log('Error fetching clients:', error);
            } finally {
                // Set loading state to false, regardless of success or failure
                this.$state.loading = false;
            }
        },
        /**
         * Add new client to the database
         */
        async _addClient() {
            this.$state.newClient.loading = true;
            try {
                // Create form data
                const formData = this.createFormData()
                // Send post request to the server
                const response = await axiosAuth.post('/client', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Check the response status code
                if (response.status === 201) {
                    // Refresh the client list
                    this._getPaginateClients();
                    // Close the modal
                    this.$state.newClient.isModalOpen = false;
                    // Show success message
                    toast.success("Client created successfully");
                }

                // Check if there is any validation error
                if (response.status === 200) {
                    // Show validation error message
                    const errors = handleValidationErrors(response.data.errors);
                    if (errors) {
                        toast.error(errors[0]);
                    }
                }
            } catch (error: any) {
                // Show error message
                toast.error(notificationAxiosError(error));
            } finally {
                // Set loading state to false, regardless of success or failure
                this.$state.newClient.loading = false;
            }
        },
        /**
         * Update Client
         */
        async _updateClient(id: number) {
            // Set the loading state to true to indicate that the request is in progress
            this.$state.newClient.loading = true;

            try {
                // Create a new FormData object with the client data
                const formData = this.createFormData();

                // Send a POST request to the update endpoint with the client ID as a parameter and the form data. 
                // Method put not working with the content-type: multipart/form-data so we make post request and add ?_method=PUT and the end of the request
                const response = await axiosAuth.post(`/client/${id}?_method=PUT`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // If there are validation errors, show them as a toast message
                const { data } = response;
                if (data.errors) {
                    const errors = handleValidationErrors(data.errors);
                    if (errors) {
                        toast.error(errors[0]);
                    }
                } else {
                    // If the update was successful, show a success toast message
                    toast.success("Client updated successfully");
                }
            } catch (error) {
                // If an error occurs show an error toast message
                toast.error(notificationAxiosError(error));
            } finally {
                // Set loading state to false, regardless of success or failure
                this.$state.newClient.loading = false;
            }
        },
        /**
         * Delete Clients
         */
        async _deleteClient(id: number) {
            try {
                const response: AxiosResponse = await axiosAuth.delete(`/client/${id}`);
                // If client is deleted successfully, refresh the clients list
                if (response.status === 200) {
                    toast.success("Client deleted successfully");
                    this._getPaginateClients();
                }
            } catch (error: any) {
                toast.error(notificationAxiosError(error));
            }
        },
        /**
         * Get specific Client from clients array
         */
        getClient(id: number) {
            // Search for the client with the specified id in the list of clients in the state
            const client = this.$state.clients.find(client => client.id === id);
            if (client) {
                // If the client is found, update the form in the newClient state with the client's details
                this.$state.newClient.form = {
                    firstName: client.firstName,
                    lastName: client.lastName,
                    email: client.email,
                    imageFile: client.avatar,
                    imageName: client.avatar
                };
            }
            // Return the client object
            return client;
        },
        /**
         * Create form data for content type: multipart/form-data
         */
        createFormData() {
            // Create a new FormData object
            const formData = new FormData();

            // Append the first name, last name, and email fields to the form data
            formData.append('firstName', this.$state.newClient.form.firstName);
            formData.append('lastName', this.$state.newClient.form.lastName);
            formData.append('email', this.$state.newClient.form.email);

            // If an image file exists and is an object, append it to the form data with its name
            if (this.$state.newClient.form.imageFile && typeof this.$state.newClient.form.imageFile === 'object') {
                formData.append('avatar', this.$state.newClient.form.imageFile, this.$state.newClient.form.imageName);
            }

            // Return the form data object
            return formData;
        },
        /**
         * Erase the client form
         */
        eraseForm() {
            this.$state.newClient.form = {
                firstName: '',
                lastName: '',
                email: '',
                imageFile: null,
                imageName: ''
            }
        }
    }
});

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot))
}