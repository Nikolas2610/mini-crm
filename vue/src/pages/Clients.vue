<template>
    <div class="h-full">
        <Container>
            <!-- Add New -->
            <Flex justify="between" class="mb-4">
                <SectionTitle>Clients</SectionTitle>
                <Button @click="clientStore.newClient.isModalOpen = true">Add Client</Button>
            </Flex>
            <!-- Table -->
            <DarkTable :table-headers="tableHeaders" :actions="true" v-if="clientStore.clients.length > 0">
                <DarkTableRow v-for="client in clientStore.clients" :key="client.id">
                    <DarkTableCell v-for="(data, index) in client" :key="client.id + '-' + index">{{ data }}</DarkTableCell>
                    <DarkTableRow>
                        <DarkTableCell>
                            <Flex justify="end">
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
                </DarkTableRow>
            </DarkTable>

            <Flex v-else class="bg-dark px-8 py-4 rounded-xl">
                No clients
            </Flex>
        </Container>
    </div>

    <Modal :modal-open="clientStore.newClient.isModalOpen" @close-modal="clientStore.newClient.isModalOpen = false">
        <template v-slot:modal_header>
            Add Client
        </template>
        <ClientForm @submit="clientStore._addClient()">
            <Flex class="mt-8">
                <Button type="submit" width="full">Submit</Button>
            </Flex>
        </ClientForm>
    </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../components/modal/Modal.vue';
import DarkTable from '../components/table/DarkTable.vue';
import DarkTableRow from '../components/table/DarkTableRow.vue';
import DarkTableCell from '../components/table/DarkTableCell.vue';
import Container from '../components/wrappers/Container.vue';
import Flex from '../components/wrappers/Flex.vue';
import Button from '../components/ui/Button.vue';
import { useClientStore } from '../stores/ClientStore'
import ClientForm from '../components/forms/ClientForm.vue';
import SectionTitle from '../components/ui/SectionTitle.vue'

const clientStore = useClientStore();

const tableHeaders = ref([
    'id', 'first name', 'last name', 'email'
])
</script>