<template>
    <div justify="between" class="bg-dark text-white fixed w-full z-10">
        <div class="container py-2">
            <Flex justify="between">
                <RouterLink :to="{ name: 'home' }">
                    <div class="px-5 py-2">CRM</div>
                </RouterLink>
                <Flex :gap="2" v-if="userStore.isUserLog" class="gap-0 md:gap-2 hidden md:flex">
                    <RouterLink :to="{ name: router }" v-for="{ router, name } in navItems"
                        :class="route.name === router ? 'text-primary hover:text-white' : ''">
                        <NavItem>{{ name }}</NavItem>
                    </RouterLink>
                    <RouterLink :to="{ name: 'users' }" v-if="userStore.isAdmin"
                        :class="route.name === 'users' ? 'text-primary hover:text-white' : ''">
                        <NavItem>Users</NavItem>
                    </RouterLink>
                </Flex>
                <!-- Mobile Open Menu -->
                <Flex class="md:hidden cursor-pointer" @click="isMobileMenuOpen = !isMobileMenuOpen"
                    v-if="userStore.isUserLog">
                    Menu
                </Flex>
                <RouterLink :to="{ name: 'login' }" v-if="!userStore.isUserLog">
                    <NavItem class="bg-primary hover:bg-secondary">Login</NavItem>
                </RouterLink>
                <NavItem v-else class="bg-primary hover:bg-secondary" @click="userStore._logout()">Logout</NavItem>
            </Flex>
            <!-- Mobile Main Menu -->
            <div class="py-2 px-5 md:hidden" v-if="isMobileMenuOpen">
                <RouterLink :to="{ name: router }" v-for="{ router, name } in navItems" @click="isMobileMenuOpen = false"
                    :class="route.name === router ? 'text-primary hover:text-white' : ''">
                    <NavItem>{{ name }}</NavItem>
                </RouterLink>
                <RouterLink :to="{ name: 'users' }" v-if="userStore.isAdmin" @click="isMobileMenuOpen = false"
                    :class="route.name === 'users' ? 'text-primary hover:text-white' : ''">
                    <NavItem>Users</NavItem>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Flex from '../wrappers/Flex.vue';
import NavItem from './NavItem.vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../../stores/UserStore';

const route = useRoute()
const userStore = useUserStore();
const isMobileMenuOpen = ref(false);

const navItems = ref([
    { id: 1, name: 'Clients', router: 'clients' },
    { id: 2, name: 'Transactions', router: 'transactions' },
])
</script>