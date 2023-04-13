<template>
    <Container v-if="client">
        <Flex justify="between">
            <div class="border-b-4 border-primary text-3xl pr-8 py-2 text-black">Client, {{ client.firstName }}</div>
            <RouterLink :to="{ name: 'clients' }">
                <Button bg-color="black">
                    <Flex :gap="1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
                            <path
                                d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                        Back
                    </Flex>
                </Button>
            </RouterLink>
        </Flex>

        <ClientForm @submit="client?.id ? clientStore._updateClient(client.id) : ''" class="mt-10">
            <Flex class="mt-8">
                <Button type="submit" width="full">Update Client</Button>
            </Flex>
        </ClientForm>

    </Container>

    <Transactions :select-disable="true" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useClientStore } from '../stores/ClientStore';
import { onMounted, onUnmounted, ref } from 'vue';
import Container from '../components/wrappers/Container.vue';
import Flex from '../components/wrappers/Flex.vue';
import Button from '../components/ui/Button.vue';
import type Client from '../types/Client';
import ClientForm from '../components/forms/ClientForm.vue';
import Transactions from './Transactions.vue';
import { useTransactionStore } from '../stores/TransactionStore';

const router = useRouter()
const route = useRoute();
const clientStore = useClientStore();
const transactionStore = useTransactionStore()
const client = ref<Client | null>(null);

onMounted(() => {
    // Get client
    const clientId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    client.value = clientStore._getClient(parseInt(clientId)) ?? null;
    // If is null redirect to clients
    if (!client.value) {
        router.push({ name: 'clients' })
    }
    transactionStore.newTransaction.form.clientId = client.value?.id ?? null
})

onUnmounted(() => {
    clientStore.eraseForm();
})

</script>