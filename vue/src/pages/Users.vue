<template>
    <div class="h-full">
        <Container>
            <!-- Add New -->
            <Flex justify="between" class="mb-4">
                <SectionTitle>Users</SectionTitle>
                <Button>Add User</Button>
            </Flex>
            <!-- Table -->
            <DarkTable :table-headers="tableHeaders" :actions="true">
                <DarkTableRow v-for="user in users" :key="user.id">
                    <DarkTableCell v-for="(data, index) in user" :key="user.id + '-' + index">{{ data }}</DarkTableCell>
                    <DarkTableRow>
                        <DarkTableCell>
                            <Flex justify="end">
                                <button class="text-blue-500 hover:underline">
                                    View Details
                                </button>
                                <button class="text-red-500 hover:underline ml-2">
                                    Delete
                                </button>
                            </Flex>
                        </DarkTableCell>
                    </DarkTableRow>
                </DarkTableRow>
            </DarkTable>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DarkTable from '../components/table/DarkTable.vue';
import DarkTableRow from '../components/table/DarkTableRow.vue';
import DarkTableCell from '../components/table/DarkTableCell.vue';
import Container from '../components/wrappers/Container.vue';
import Flex from '../components/wrappers/Flex.vue';
import Button from '../components/ui/Button.vue';
import SectionTitle from '../components/ui/SectionTitle.vue';

const tableHeaders = ref([
    'id', 'first name', 'last name', 'email'
])

const users = ref([
    { id: 1, name: 'Nikolas', surname: 'Psyllou', email: 'nikolas@psillovits.com' },
    { id: 2, name: 'Nikolas2', surname: 'Psyllou', email: 'nikolas@psillovits.com' },
    { id: 3, name: 'Nikolas3', surname: 'Psyllou', email: 'nikolas@psillovits.com' },
    { id: 4, name: 'Nikolas4', surname: 'Psyllou', email: 'nikolas@psillovits.com' },
])
</script>