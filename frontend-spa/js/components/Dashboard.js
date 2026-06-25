const Dashboard = {
    template: `
        <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
            <!-- Navbar -->
            <nav class="bg-gradient-to-r from-pink-400 to-pink-300 text-white px-6 py-4 flex justify-between items-center shadow">
                <h1 class="text-xl font-bold">📚 E-Library Admin</h1>
                <div class="flex gap-4 items-center">
                    <span class="text-sm">Halo, {{ username }}</span>
                    <button @click="logout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm">
                        Logout
                    </button>
                </div>
            </nav>

            <!-- Menu -->
            <div class="flex">
            <aside class="w-56 bg-white shadow min-h-screen p-4">
                <router-link to="/dashboard" class="block py-2 px-3 rounded bg-pink-50 text-pink-500 mb-1 font-semibold">🏠 Dashboard</router-link>
                <router-link to="/books" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">📖 Data Buku</router-link>
                <router-link to="/categories" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">🏷️ Kategori</router-link>
                <router-link to="/members" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">👤 Anggota</router-link>
                <router-link to="/loans" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">🔄 Peminjaman</router-link>
            </aside>

                <main class="flex-1 p-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white rounded-lg shadow p-6 text-center border border-pink-100">
                            <p class="text-3xl font-bold text-pink-500">{{ totalBooks }}</p>
                            <p class="text-gray-500 mt-2">Total Buku</p>
                        </div>
                        <div class="bg-white rounded-lg shadow p-6 text-center border border-pink-100">
                            <p class="text-3xl font-bold text-pink-400">{{ totalCategories }}</p>
                            <p class="text-gray-500 mt-2">Kategori</p>
                        </div>
                        <div class="bg-white rounded-lg shadow p-6 text-center border border-pink-100">
                            <p class="text-3xl font-bold text-pink-600">{{ totalLoans }}</p>
                            <p class="text-gray-500 mt-2">Peminjaman Aktif</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `,
    data() {
        return {
            username: localStorage.getItem('username') || 'Admin',
            totalBooks: 0,
            totalCategories: 0,
            totalLoans: 0
        };
    },
    async mounted() {
        try {
            const booksRes = await axios.get('http://localhost:8080/api/books');
            const catRes = await axios.get('http://localhost:8080/api/categories');
            const loansRes = await axios.get('http://localhost:8080/api/loans');

            this.totalBooks = booksRes.data.length;
            this.totalCategories = catRes.data.length;
            this.totalLoans = loansRes.data.filter(l => l.status === 'dipinjam').length;
        } catch (error) {
            console.error('Gagal memuat data:', error);
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            this.$router.push('/login');
        }
    }
};