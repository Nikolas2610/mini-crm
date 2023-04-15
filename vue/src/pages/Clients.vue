<template>
    <div class="h-full">
        <Container>
            <!-- Add New Client -->
            <Flex justify="between" class="mb-4">
                <SectionTitle>Clients</SectionTitle>
                <Button @click="clientStore.newClient.isModalOpen = true">Add Client</Button>
            </Flex>
            <div v-if="!clientStore.loading">
                <!-- Table -->
                <DarkTable :table-headers="tableHeaders" :actions="true" v-if="clientStore.clients.length > 0">
                    <DarkTableRow v-for="client in clientStore.clients" :key="client.id">
                        <DarkTableCell>{{ client.id }}</DarkTableCell>
                        <DarkTableCell>{{ client.firstName }}</DarkTableCell>
                        <DarkTableCell>{{ client.lastName }}</DarkTableCell>
                        <DarkTableCell>{{ client.email }}</DarkTableCell>
                        <DarkTableCell>
                            <img :src="client.avatar" alt="avatar" class="h-10 w-10">
                        </DarkTableCell>
                        <DarkTableCell>
                            <Flex>
                                <RouterLink :to="{ name: 'client', params: { id: client.id } }">
                                    <button class="text-blue-500 hover:underline">
                                        View Details
                                    </button>
                                </RouterLink>
                                <button class="text-red-500 hover:underline ml-2"
                                    @click="clientStore._deleteClient(client.id)">
                                    Delete
                                </button>
                            </Flex>
                        </DarkTableCell>
                    </DarkTableRow>
                </DarkTable>
                <!-- No clients Message -->
                <Alert v-else>No Clients</Alert>
            </div>
            <!-- Loading component -->
            <PreLoader v-else />
        </Container>
    </div>

    <!-- Modal Create Client -->
    <Modal :modal-open="clientStore.newClient.isModalOpen" @close-modal="clientStore.newClient.isModalOpen = false">
        <template v-slot:modal_header>
            Add Client
        </template>
        <ClientForm @submit="clientStore._addClient()">
            <Flex class="mt-8">
                <Button :loading="clientStore.newClient.loading" type="submit" width="full"
                    :disable="clientStore.disableSubmit">Submit</Button>
            </Flex>
        </ClientForm>
    </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useClientStore } from '../stores/ClientStore'
// Components import
import Modal from '../components/modal/Modal.vue';
import DarkTable from '../components/table/DarkTable.vue';
import DarkTableRow from '../components/table/DarkTableRow.vue';
import DarkTableCell from '../components/table/DarkTableCell.vue';
import Container from '../components/wrappers/Container.vue';
import Flex from '../components/wrappers/Flex.vue';
import Button from '../components/ui/Button.vue';
import ClientForm from '../components/forms/ClientForm.vue';
import SectionTitle from '../components/ui/SectionTitle.vue'
import PreLoader from '../components/PreLoader.vue';
import Alert from '../components/ui/Alert.vue';

const clientStore = useClientStore();

// Table headers
const tableHeaders = ref([
    'id', 'first name', 'last name', 'email', 'avatar'
])

onMounted(() => {
    // Load clients
    clientStore._getPaginateClients();
})
</script>