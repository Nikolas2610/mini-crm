<template>
    <div :class="fullHeight ? 'h-full' : ''">
        <Container>
            <!-- Add New -->
            <Flex justify="between" class="mb-4">
                <SectionTitle>Transactions</SectionTitle>
                <Button @click="transactionsStore.newTransaction.isModalOpen = true">Add Transaction</Button>
            </Flex>
            <div v-if="!transactionsStore.loading">
                <!-- Table -->
                <DarkTable :table-headers="tableHeaders" :actions="true" v-if="transactionsStore.transactions.length > 0">
                    <DarkTableRow v-for="transaction in transactionsStore.transactions" :key="transaction.id">
                        <DarkTableCell>
                            {{ transaction.id }}
                        </DarkTableCell>
                        <DarkTableCell>
                            {{ transaction.client.firstName + ' ' + transaction.client.lastName }}
                        </DarkTableCell>
                        <DarkTableCell>
                            {{ transaction.amount }}
                        </DarkTableCell>
                        <DarkTableCell>
                            {{ formatDate(transaction.transaction_date) }}
                        </DarkTableCell>
                        <DarkTableCell>
                            <Flex>
                                <RouterLink :to="{ name: 'transaction', params: { id: transaction.id } }">
                                    <button class="text-blue-500 hover:underline">
                                        Edit
                                    </button>
                                </RouterLink>
                                <button class="text-red-500 hover:underline ml-2"
                                    @click="transactionsStore._deleteTransaction(transaction.id)">
                                    Delete
                                </button>
                            </Flex>
                        </DarkTableCell>
                    </DarkTableRow>
                </DarkTable>

                <!-- No transactions message -->
                <Flex v-else class="bg-dark px-8 py-4 rounded-xl text-white italic">
                    No Transactions
                </Flex>
            </div>
            <!-- Loading -->
            <PreLoader v-else />
        </Container>
    </div>

    <!-- Modal new transaction -->
    <Modal :modal-open="transactionsStore.newTransaction.isModalOpen"
        @close-modal="transactionsStore.newTransaction.isModalOpen = false">
        <template v-slot:modal_header>
            Add Transaction
        </template>
        <TransactionForm :clients="transactionsStore.clientList" @submit="transactionsStore._addTransaction()"
            :select-disable="selectDisable">
            <Flex class="mt-8">
                <Button type="submit" width="full" :loading="transactionsStore.newTransaction.loading" :disable="transactionsStore.disableSubmit">Submit</Button>
            </Flex>
        </TransactionForm>
    </Modal>
</template>

<script setup lang="ts">
import { PropType, onMounted, ref, watch } from 'vue';
import { useTransactionStore } from '../stores/TransactionStore';
import { formatDate } from '../utils/helpers.functions'
// Components import
import DarkTable from '../components/table/DarkTable.vue';
import DarkTableRow from '../components/table/DarkTableRow.vue';
import DarkTableCell from '../components/table/DarkTableCell.vue';
import Container from '../components/wrappers/Container.vue';
import Flex from '../components/wrappers/Flex.vue';
import SectionTitle from '../components/ui/SectionTitle.vue';
import Button from '../components/ui/Button.vue';
import Modal from '../components/modal/Modal.vue';
import TransactionForm from '../components/forms/TransactionForm.vue';
import PreLoader from '../components/PreLoader.vue';
import { useRoute } from 'vue-router';

// Variables
const route = useRoute();
const transactionsStore = useTransactionStore();
interface ClientId {
    id: number | undefined;
}
const props = defineProps({
    selectDisable: { type: Boolean, default: false },
    client: { type: Object as PropType<ClientId> },
    fullHeight: { type: Boolean, default: true }
})
const tableHeaders = ref([
    'id', 'client', 'amount', 'Transaction date'
])

// Load transactions and Client list 
onMounted(() => {
    transactionsStore._getPaginateTransactions(props.client?.id);
    transactionsStore._getClientList(); // Client list for the new transaction

    // For transactions page set client as empty
    const { name } = route;
    if (name === 'transactions') {
        transactionsStore.newTransaction.form.client_id = null;
    }
})

// Set default client id for the client page
watch(() => transactionsStore.newTransaction.form.client_id,
    (newVal) => {
        const { name } = route;
        const { id } = props.client ?? {};

        if (name === 'client' && !newVal && id) {
            transactionsStore.newTransaction.form.client_id = id;
        }
    })
</script>