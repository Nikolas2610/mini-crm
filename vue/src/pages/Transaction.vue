<template>
    <Container v-if="transaction">
        <Flex justify="between" class="flex-col-reverse md:flex-row md:flex-wrap">
            <SectionTitle>Transaction, {{ transaction.id }}</SectionTitle>
            <Button bg-color="black" @click="router.back()">
                <Flex :gap="1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                    Back
                </Flex>
            </Button>
        </Flex>

        <TransactionForm :clients="transactionsStore.clientList"
            @submit="transaction?.id ? transactionsStore._updateTransaction(transaction.id) : ''" class="mt-10">
            <Flex class="mt-8">
                <Button type="submit" width="full" :loading="transactionsStore.newTransaction.loading" :disable="transactionsStore.disableSubmit">Update Transaction</Button>
            </Flex>
        </TransactionForm>
    </Container>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useTransactionStore } from '../stores/TransactionStore';
import { onMounted, ref } from 'vue';
import type { Transaction } from '../types/Transaction';
// Component imports
import TransactionForm from '../components/forms/TransactionForm.vue';
import Flex from '../components/wrappers/Flex.vue';
import Container from '../components/wrappers/Container.vue';
import Button from '../components/ui/Button.vue';
import SectionTitle from '../components/ui/SectionTitle.vue';

// Variables
const router = useRouter()
const route = useRoute();
const transactionsStore = useTransactionStore();
const transaction = ref<Transaction | null>(null)

// Load transaction
onMounted(() => {
    // Get transaction
    const transactionId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    transaction.value = transactionsStore.getTransaction(parseInt(transactionId)) ?? null;
    // If is null redirect to transactions
    if (!transaction.value) {
        router.push({ name: 'transactions' })
    }
})
</script>

