// ============ AXIOS INTERCEPTORS ============

// Request Interceptor: otomatis sisipkan token ke setiap request
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor: tangkap error 401 secara global
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            alert('Sesi Anda telah habis. Silakan login kembali.');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ============ ROUTES ============

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/books', component: Books, meta: { requiresAuth: true } },
    { path: '/categories', component: Categories, meta: { requiresAuth: true } },
    { path: '/members', component: Members, meta: { requiresAuth: true } },
    { path: '/loans', component: Loans, meta: { requiresAuth: true } }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

// ============ NAVIGATION GUARD ============

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

// ============ MAIN APP ============

const app = Vue.createApp({
    template: `<router-view></router-view>`
});

app.use(router);
app.mount('#app');