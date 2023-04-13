<template>
    <Container v-if="transaction">
        <Flex justify="between">
            <div class="border-b-4 border-primary text-3xl pr-8 py-2 text-black">Transaction, {{ transaction.id }}</div>
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

        <TransactionForm :clients="clientStore.clients"
            @submit="transaction?.id ? transactionsStore._updateTransaction(transaction.id) : ''" class="mt-10">
            <Flex class="mt-8">
                <Button type="submit" width="full">Update Transaction</Button>
            </Flex>
        </TransactionForm>
    </Container>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useTransactionStore } from '../stores/TransactionStore';
import { onMounted, onUnmounted, ref } from 'vue';
import type { Transaction } from '../types/Transaction';
import TransactionForm from '../components/forms/TransactionForm.vue';
import { useClientStore } from '../stores/ClientStore';
import Flex from '../components/wrappers/Flex.vue';
import Container from '../components/wrappers/Container.vue';
import Button from '../components/ui/Button.vue';

const router = useRouter()
const route = useRoute();
const transactionsStore = useTransactionStore();
const clientStore = useClientStore();
const transaction = ref<Transaction | null>(null)

onMounted(() => {
    // Get client
    const transactionId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    transaction.value = transactionsStore._getTransaction(parseInt(transactionId)) ?? null;
    // If is null redirect to clients
    if (!transaction.value) {
        router.push({ name: 'clients' })
    }
})

onUnmounted(() => {
    transactionsStore.eraseForm()
})

</script>

