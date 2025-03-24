import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import TicketsView from '@/views/TicketsView.vue'
import ChatsView from '@/views/ChatsView.vue'
import TicketView from '@/views/TicketView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'DefaultLayout', guest: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'AuthLayout', guest: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: { layout: 'AuthLayout', guest: true },
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: TicketsView,
      meta: { layout: 'DashboardLayout', guest: false },
    },
    {
      path: '/tickets/:id',
      name: 'ticket.show',
      component: TicketView,
      meta: { layout: 'DashboardLayout', guest: false },
    },
    {
      path: '/chats',
      name: 'chats',
      component: ChatsView,
      meta: { layout: 'DashboardLayout', guest: false },
    },


  ],
});

router.beforeEach( async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (to.meta.guest && authStore.user) {
    return { name: 'tickets' };
  }

  if (!to.meta.guest && !authStore.user) {
    return { name: 'login' };
  }
});



export default router
