<template>
    <div justify="between" class="bg-dark text-white fixed w-full">
        <div class="container py-2">
            <Flex justify="between">
                <RouterLink :to="{ name: 'home' }">
                    <div class="px-5 py-2">CRM</div>
                </RouterLink>
                <Flex :gap="2">
                    <RouterLink :to="{ name: router }" v-for="{ router, name } in navItems"
                        :class="route.name === router ? 'text-primary hover:text-white' : ''">
                        <NavItem>{{ name }}</NavItem>
                    </RouterLink>
                </Flex>
                <RouterLink :to="{ name: 'login' }">
                    <NavItem class="bg-primary hover:bg-secondary">Login</NavItem>
                </RouterLink>
            </Flex>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Flex from '../wrappers/Flex.vue';
import NavItem from './NavItem.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const navItems = ref([
    { id: 1, name: 'Clients', router: 'clients', admin: false },
    { id: 2, name: 'Transactions', router: 'transactions', admin: false },
    { id: 3, name: 'Users', router: 'users', admin: true },
])
</script>