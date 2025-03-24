<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';

import AuthLayout from './layouts/AuthLayout.vue';
import DashboardLayout from './layouts/DashboardLayout.vue';
import DefaultLayout from './layouts/DefaultLayout.vue';
import { useAuthStore } from './stores/auth';

const route = useRoute();
const layout = computed(() => {
    return route.meta.layout === 'AuthLayout' ? AuthLayout : 
    route.meta.layout === 'DashboardLayout' ? DashboardLayout : DefaultLayout;
});

const authStore = useAuthStore();

</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
