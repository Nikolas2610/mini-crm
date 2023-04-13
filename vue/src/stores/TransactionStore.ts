import { acceptHMRUpdate, defineStore } from "pinia";
import { Transaction } from "../types/Transaction";
import { useClientStore } from "./ClientStore";
const clientStore = useClientStore()

export const useTransactionStore = defineStore("TransactionStore", {
    state: () => {
        return {
            newTransaction: {
                form: {
                    amount: null as number | null,
                    clientId: null as number | null,
                },
                loading: false,
                isModalOpen: false
            },
            transactions: [
                { id: 1, client_id: 1, amount: 1000, created_at: new Date() },
                { id: 2, client_id: 2, amount: 1000, created_at: new Date() },
                { id: 3, client_id: 3, amount: 1000, created_at: new Date() },
                { id: 4, client_id: 4, amount: 1000, created_at: new Date() },
            ] as Transaction[]
        }
    },
    getters: {},
    actions: {
        async _addTransaction() {
            // this.$state.newClient.loading = true;
            // const id = this.$state.clients[this.$state.clients.length - 1].id;
            // if (id) {
            //     this.$state.clients.push({ id: id + 1, ...this.$state.newClient.form })
            //     this.eraseForm();
            //     this.$state.newClient.isModalOpen = false;
            // }
            // this.$state.newClient.loading = false;
        },
        _getTransaction(id: number) {
            const transaction = this.$state.transactions.find(transaction => transaction.id === id);
            if (transaction) {
                this.$state.newTransaction.form = { amount: transaction.amount, clientId: transaction.client_id };
            }
            return transaction;
        },
        _updateTransaction(id: number) {
            // console.log("Update client: " + id);
            // router.push({ name: 'clients' })
        },
        _deleteTransaction(id: number) {
            this.$state.transactions = this.$state.transactions.filter(transaction => transaction.id !== id);
        },
        getClientName(id: number) {
            const client = clientStore.clients.find(client => client.id === id);
            return `${client?.firstName} ${client?.lastName}`
        },
        eraseForm() {
            this.$state.newTransaction.form = {
                amount: null,
                clientId: null,
            }
        }
    }
});

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTransactionStore, import.meta.hot))
}