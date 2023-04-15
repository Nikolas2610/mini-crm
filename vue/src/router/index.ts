import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: 'login',
            meta: {
                title: 'Mini CRM',
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../pages/Login.vue'),
            meta: {
                title: 'Login Page',
                requiresAuth: false,
            }
        },
        {
            path: '/clients',
            name: 'clients',
            component: () => import('../pages/Clients.vue'),
            meta: {
                title: 'Clients',
                requiresAuth: true,
            }
        },
        {
            path: '/client/:id',
            name: 'client',
            component: () => import('../pages/Client.vue'),
            meta: {
                title: 'Client', 
                requiresAuth: true,
            }
        },
        {
            path: '/transactions',
            name: 'transactions',
            component: () => import('../pages/Transactions.vue'),
            meta: {
                title: 'Transactions', 
                requiresAuth: true,
            }
        },
        {
            path: '/transaction/:id',
            name: 'transaction',
            component: () => import('../pages/Transaction.vue'),
            meta: {
                title: 'Transaction', 
                requiresAuth: true,
            }
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('../pages/Users.vue'),
            meta: {
                title: 'Users', 
                requiresAuth: true,
            }
        },
        {
            path: '/404',
            name: '404',
            component: () => import('../pages/PageNotFound.vue'),
            meta: {
              title: `Page Not Found`
            }
          },
          {
            path: '/:pathMatch(.*)*',
            redirect: { name: '404' }
          },
    ]
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    // if route requires authentication - requiresAuth is true
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({ name: 'home' });
            return
        } else {
            next();
            return
        }
    }
    // if not requiresAuth continue
    next();
});

export default router