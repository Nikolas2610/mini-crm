import { acceptHMRUpdate, defineStore } from "pinia";
import { Transaction } from "../types/Transaction";
import { AxiosResponse } from "axios";
import axiosAuth from "../plugins/axiosAuth";
import { notificationAxiosError } from "../utils/helpers.functions";
import { SelectClient } from "../types/SelectClient";
import { useToast } from "vue-toastification";
import { handleValidationErrors } from "../utils/helpers.functions";
import router from "../router";
import { TransactionForm } from "../types/TransactionForm";

const toast = useToast();

export const useTransactionStore = defineStore("TransactionStore", {
    state: () => {
        return {
            newTransaction: {
                form: {
                    amount: null,
                    client_id: null,
                    transaction_date: null,
                } as TransactionForm,
                loading: false as boolean,
                isModalOpen: false as boolean
            },
            transactions: [] as Transaction[],
            clientList: [] as SelectClient[],
            loading: false as boolean
        }
    },
    getters: {
        disableSubmit: (state) => !state.newTransaction.form.amount || !state.newTransaction.form.client_id || !state.newTransaction.form.transaction_date,
    },
    actions: {
        /**
         * Get transactions
         */
        async _getPaginateTransactions(clientId: number | undefined = undefined) {
            try {
                // Set loading state to true
                this.$state.loading = true;

                // Set URL based on whether or not clientId is defined
                let url = '';
                clientId ? url = `/client/${clientId}/transactions` : url = '/transaction'

                // Make GET request to API
                const response: AxiosResponse = await axiosAuth.get(url);

                // Destructure data from response
                const { data } = response;

                // Set transactions state to data from API response
                this.$state.transactions = data.data;
            } catch (error) {
                // Log error to console
                console.log(error);
            } finally {
                // Set loading state to false
                this.$state.loading = false;
            }
        },
        /**
         * Get client list for the Transaction form
         */
        async _getClientList() {
            try {
                // Set loading state
                this.$state.loading = true;

                // Make request to get list of clients
                const response: AxiosResponse = await axiosAuth.get('/clients');
                const { data } = response;

                // Update state with list of clients
                this.$state.clientList = data.data;
            } catch (error) {
                // Log error if something went wrong
                console.log(error);
            } finally {
                // Reset loading state
                this.$state.loading = false;
            }
        },
        /**
         * Create transaction
         */
        async _addTransaction() {
            try {
                // Set loading to true
                this.$state.newTransaction.loading = true;

                // Destructure form data
                const { amount, client_id, transaction_date } = this.$state.newTransaction.form;

                // Make request to create transaction
                const response: AxiosResponse = await axiosAuth.post('/transaction', { amount, client_id, transaction_date });

                // Check response status
                if (response.status === 201) {
                    // If successful, update transaction list and close modal
                    this._getPaginateTransactions();
                    this.$state.newTransaction.isModalOpen = false;
                    toast.success("Transaction created successfully");
                }
                if (response.status === 200) {
                    // If there are validation errors, display the first one
                    const errors = handleValidationErrors(response.data.errors);
                    if (errors) {
                        toast.error(errors[0]);
                    }
                }
            } catch (error: any) {
                // If an error occurs, display a notification
                toast.error(notificationAxiosError(error));
            } finally {
                // Set loading to false
                this.$state.newTransaction.loading = false;
            }
        },
        /**
         * Update transactions
         */
        async _updateTransaction(id: number) {
            try {
                // Set loading state to true
                this.$state.newTransaction.loading = true;

                // Get form data
                const { amount, client_id, transaction_date } = this.$state.newTransaction.form;

                // Send PUT request to update transaction
                const response: AxiosResponse = await axiosAuth.put(`/transaction/${id}`, { amount, client_id, transaction_date });

                // Redirect to transactions page
                router.push({ name: 'transactions' });
            } catch (error: any) {
                // Show error message
                toast.error(notificationAxiosError(error));
            } finally {
                // Set loading state to false
                this.$state.newTransaction.loading = false;
            }
        },
        /**
         * Delete transactions
         */
        async _deleteTransaction(id: number) {
            try {
                // Send delete request to API
                const response: AxiosResponse = await axiosAuth.delete(`/transaction/${id}`);

                // If successful response received, show success message and update transaction list
                if (response.status === 200) {
                    toast.success("Client deleted successfully");
                    this._getPaginateTransactions();
                }
            } catch (error: any) {
                // If there's an error, show error message
                toast.error(notificationAxiosError(error));
            }
        },
        /**
         * Get transaction for the transaction edit page
         */
        getTransaction(id: number) {
            // Find the transaction in the state array with the given ID
            const transaction = this.$state.transactions.find(transaction => transaction.id === id);

            // If the transaction is found, update the form state with its data
            if (transaction) {
                this.$state.newTransaction.form = {
                    amount: transaction.amount,
                    client_id: transaction.client.id,
                    transaction_date: transaction.transaction_date
                };
            }

            // Return the transaction object
            return transaction;
        },
        /**
         * Erase transaction form data
         */
        eraseForm() {
            this.$state.newTransaction.form = {
                amount: null,
                client_id: null,
                transaction_date: null
            }
        }
    }
});

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTransactionStore, import.meta.hot))
}