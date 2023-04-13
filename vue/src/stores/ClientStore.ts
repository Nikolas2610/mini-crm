import { acceptHMRUpdate, defineStore } from "pinia";
import Client from "../types/Client";
import router from "../router";

export const useClientStore = defineStore("ClientStore", {
    state: () => {
        return {
            newClient: {
                form: {
                    firstName: '',
                    lastName: '',
                    email: '',
                },
                loading: false,
                isModalOpen: false
            },
            clients: [
                { id: 1, firstName: 'Nikolas', lastName: 'Psyllou', email: 'nikolas@psillovits.com' },
                { id: 2, firstName: 'Nikolas2', lastName: 'Psyllou', email: 'nikolas@psillovits.com' },
                { id: 3, firstName: 'Nikolas3', lastName: 'Psyllou', email: 'nikolas@psillovits.com' },
                { id: 4, firstName: 'Nikolas4', lastName: 'Psyllou', email: 'nikolas@psillovits.com' },
            ] as Client[]
        }
    },
    getters: {},
    actions: {
        async _addClient() {
            this.$state.newClient.loading = true;
            const id = this.$state.clients[this.$state.clients.length - 1].id;
            if (id) {
                this.$state.clients.push({ id: id + 1, ...this.$state.newClient.form })
                this.eraseForm();
                this.$state.newClient.isModalOpen = false;
            }
            this.$state.newClient.loading = false;
        },
        _getClient(id: number) {
            const client = this.$state.clients.find(client => client.id === id);
            if (client) {
                this.$state.newClient.form = { firstName: client.firstName, lastName: client.lastName, email: client.email };
            }
            return client;
        },
        _updateClient(id: number) {
            console.log("Update client: " + id);
            router.push({ name: 'clients' })
        },
        _deleteClient(id: number) {
            this.$state.clients = this.$state.clients.filter(client => client.id !== id);
        },
        eraseForm() {
            this.$state.newClient.form = {
                firstName: '',
                lastName: '',
                email: '',
            }
        }
    }
});

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot))
}