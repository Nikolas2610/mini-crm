<template>
    <Flex class="bg-dark h-full">
        <Container>
            <!-- Title -->
            <div class="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                    Sign in
                </h2>
            </div>
            <!-- Login Form -->
            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-primary py-8 px-4 shadow rounded-lg sm:px-10">
                    <form class="space-y-6" @submit.prevent="login">
                        <!-- Email Input -->
                        <div>
                            <InputField :title="'Email Address'" :input="{ value: userStore.login.form.email }"
                                :errors="v$.email.$errors" :type="'email'" class="text-white"
                                @change="(value: string) => userStore.login.form.email = value" />
                        </div>
                        <!-- Password Input -->
                        <div>
                            <InputField :title="'Password'" :input="{ value: userStore.$state.login.form.password }"
                                :errors="v$.password.$errors" :type="'password'" class="text-white"
                                @change="(value: string) => userStore.$state.login.form.password = value" />
                        </div>
                        <!-- Submit Form -->
                        <Flex>
                            <Button :loading="userStore.login.loading" type="submit" width="full" bg-color="black"
                                :disable="userStore.disableLogin">Login</Button>
                        </Flex>
                    </form>
                </div>
            </div>
        </Container>
    </Flex>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/UserStore'
import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'
import { computed, onBeforeMount } from 'vue';
// Components imports
import Container from '../components/wrappers/Container.vue';
import Flex from '../components/wrappers/Flex.vue';
import InputField from '../components/ui/InputField.vue';
import Button from '../components/ui/Button.vue';
import router from '../router';

const userStore = useUserStore();

// Login Form rules
const rules = computed(() => {
    return {
        email: { required, email },
        password: {
            required
        }
    }
});
// Create Validation with rules
const v$ = useVuelidate(rules, userStore.login.form);

const login = async () => {
    // Validate Form 
    await v$.value.$validate()
    // Check for error forms
    if (!v$.value.$error) {
        // Success Form
        userStore._login();
    }
}

onBeforeMount(() => {
    // if user is log redirect to clients
    if (userStore.isUserLog) router.push({ name: 'clients' })
})
</script>