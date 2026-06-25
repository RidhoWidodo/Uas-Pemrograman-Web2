const Login = {
    template: `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100">
            <div class="bg-white p-8 rounded-lg shadow-md w-96 border border-pink-100">
                <h2 class="text-2xl font-bold mb-6 text-center text-pink-500">Login Admin</h2>

                <div v-if="errorMessage" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                    {{ errorMessage }}
                </div>

                <form @submit.prevent="handleLogin">
                    <div class="mb-4">
                        <label class="block text-gray-700 mb-2">Username</label>
                        <input
                            v-model="username"
                            type="text"
                            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            placeholder="Masukkan username"
                        />
                    </div>

                    <div class="mb-6">
                        <label class="block text-gray-700 mb-2">Password</label>
                        <input
                            v-model="password"
                            type="password"
                            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            placeholder="Masukkan password"
                        />
                    </div>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 rounded hover:from-pink-500 hover:to-pink-600 transition disabled:opacity-50"
                    >
                        {{ loading ? 'Memproses...' : 'Login' }}
                    </button>
                </form>

                <p class="text-center text-sm text-gray-500 mt-4">
                    <router-link to="/" class="text-pink-500 hover:underline">Kembali ke Beranda</router-link>
                </p>
            </div>
        </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            loading: false
        };
    },
    methods: {
        async handleLogin() {
            this.errorMessage = '';
            this.loading = true;

            try {
                const response = await axios.post('http://localhost:8080/api/login', {
                    username: this.username,
                    password: this.password
                });

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);

                this.$router.push('/dashboard');
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message || 'Login gagal';
                } else {
                    this.errorMessage = 'Tidak dapat terhubung ke server';
                }
            } finally {
                this.loading = false;
            }
        }
    }
};