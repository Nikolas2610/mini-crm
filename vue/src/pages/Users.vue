<template>
    <div class="h-full">
        <Container>
            <!-- Add New -->
            <Flex justify="between" class="mb-4">
                <SectionTitle>Users</SectionTitle>
            </Flex>
            <!-- Table -->
            <div v-if="!loading">
                <DarkTable :table-headers="tableHeaders" :actions="false" v-if="users.length > 0">
                    <DarkTableRow v-for="user in users" :key="user.id">
                        <DarkTableCell v-for="(data, index) in user" :key="user.id + '-' + index">
                            {{ data }}
                        </DarkTableCell>
                    </DarkTableRow>
                </DarkTable>
                <!-- No users -->
                <Alert v-else>No users</Alert>
            </div>
            <!-- Loading -->
            <PreLoader v-else />
        </Container>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useUserStore } from '../stores/UserStore';
import type { User } from '../types/User'
import { AxiosResponse } from 'axios';
// Components import
import DarkTable from '../components/table/DarkTable.vue';
import DarkTableRow from '../components/table/DarkTableRow.vue';
import DarkTableCell from '../components/table/DarkTableCell.vue';
import Container from '../components/wrappers/Container.vue';
import Flex from '../components/wrappers/Flex.vue';
import SectionTitle from '../components/ui/SectionTitle.vue';
import router from '../router';
import axiosAuth from '../plugins/axiosAuth';
import Alert from '../components/ui/Alert.vue';
import PreLoader from '../components/PreLoader.vue';

// Variables
const userStore = useUserStore();
const tableHeaders = ref([
    'id', 'name', 'Admin', 'email', 'Created at', 'updated at'
]);
const users = ref<User[] | []>([]);
const loading = ref(false)

// Accept only admin users
onBeforeMount(async () => {
    if (!userStore.isAdmin) {
        router.push({ name: 'home' })
    } else {
        // Get users
        try {
            loading.value = true
            const response: AxiosResponse = await axiosAuth.get('/users');
            const { data } = response;
            users.value = data.users;
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false
        }
    }
})
</script>