const Home = {
    template: `
        <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
            <!-- Navbar -->
            <nav class="bg-gradient-to-r from-pink-400 to-pink-300 text-white px-6 py-4 flex justify-between items-center shadow">
                <h1 class="text-xl font-bold">📚 E-Library System</h1>
                <router-link
                    to="/login"
                    class="bg-white text-pink-500 px-4 py-2 rounded hover:bg-pink-50 transition"
                >
                    Login Admin
                </router-link>
            </nav>

            <!-- Hero -->
            <div class="text-center py-16 px-4">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Selamat Datang di E-Library</h2>
                <p class="text-gray-600 max-w-xl mx-auto">
                    Sistem informasi rental buku dan komik digital. Temukan koleksi buku favoritmu di sini.
                </p>
            </div>

            <!-- Ringkasan Data -->
            <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-16">
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
        </div>
    `,
    data() {
        return {
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
            console.error('Gagal memuat data ringkasan:', error);
        }
    }
};