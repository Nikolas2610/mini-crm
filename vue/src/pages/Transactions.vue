<template>
    <div class="h-full">
        <Container>
            <!-- Add New -->
            <Flex justify="between" class="mb-4">
                <SectionTitle>Transactions</SectionTitle>
                <Button @click="transactionsStore.newTransaction.isModalOpen = true">Add Transaction</Button>
            </Flex>
            <!-- Table -->
            <DarkTable :table-headers="tableHeaders" :actions="true" v-if="transactionsStore.transactions.length > 0">
                <DarkTableRow v-for="transaction in transactionsStore.transactions" :key="transaction.id">
                    <DarkTableCell>
                        {{ transaction.id }}
                    </DarkTableCell>
                    <DarkTableCell>
                        {{ transactionsStore.getClientName(transaction.client_id) }}
                    </DarkTableCell>
                    <DarkTableCell>
                        {{ transaction.amount }}
                    </DarkTableCell>
                    <DarkTableCell>
                        {{ formatDate(transaction.created_at) }}
                    </DarkTableCell>
                    <DarkTableRow>
                        <DarkTableCell>
                            <Flex justify="end">
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
                </DarkTableRow>
            </DarkTable>

            <Flex v-else class="bg-dark px-8 py-4 rounded-xl italic">
                No Transactions
            </Flex>
        </Container>
    </div>

    <Modal :modal-open="transactionsStore.newTransaction.isModalOpen"
        @close-modal="transactionsStore.newTransaction.isModalOpen = false">
        <template v-slot:modal_header>
            Add Transaction
        </template>
        <TransactionForm :clients="clientStore.clients" @submit="transactionsStore._addTransaction()"
            :select-disable="selectDisable">
            <Flex class="mt-8">
                <Button type="submit" width="full">Submit</Button>
            </Flex>
        </TransactionForm>
    </Modal>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useTransactionStore } from '../stores/TransactionStore';
import { formatDate } from '../utils/helpers.functions'
import { useClientStore } from '../stores/ClientStore';
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

const transactionsStore = useTransactionStore();
const clientStore = useClientStore();

const props = defineProps({
    selectDisable: { type: Boolean, default: false }
})
const tableHeaders = ref([
    'id', 'client', 'amount', 'Transaction date'
])

</script>