const Books = {
    template: `
        <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
            <!-- Navbar -->
            <nav class="bg-gradient-to-r from-pink-400 to-pink-300 text-white px-6 py-4 flex justify-between items-center shadow">
                <h1 class="text-xl font-bold">📚 E-Library Admin</h1>
                <div class="flex gap-4 items-center">
                    <span class="text-sm">Halo, {{ username }}</span>
                    <button @click="logout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm">Logout</button>
                </div>
            </nav>

            <div class="flex">
            <aside class="w-56 bg-white shadow min-h-screen p-4">
                <router-link to="/dashboard" class="block py-2 px-3 rounded bg-pink-50 text-pink-500 mb-1 font-semibold">🏠 Dashboard</router-link>
                <router-link to="/books" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">📖 Data Buku</router-link>
                <router-link to="/categories" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">🏷️ Kategori</router-link>
                <router-link to="/members" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">👤 Anggota</router-link>
                <router-link to="/loans" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">🔄 Peminjaman</router-link>
            </aside>

                <main class="flex-1 p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Data Buku</h2>
                        <button @click="openModal()" class="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded hover:from-pink-500 hover:to-pink-600">
                            + Tambah Buku
                        </button>
                    </div>

                    <div class="bg-white rounded-lg shadow overflow-hidden border border-pink-100">
                        <table class="w-full text-left">
                            <thead class="bg-pink-50 text-gray-600 text-sm">
                                <tr>
                                    <th class="px-4 py-3">Judul</th>
                                    <th class="px-4 py-3">Pengarang</th>
                                    <th class="px-4 py-3">Kategori</th>
                                    <th class="px-4 py-3">Stok</th>
                                    <th class="px-4 py-3">Status</th>
                                    <th class="px-4 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="book in books" :key="book.id" class="border-t hover:bg-pink-50">
                                    <td class="px-4 py-3">{{ book.judul }}</td>
                                    <td class="px-4 py-3">{{ book.pengarang }}</td>
                                    <td class="px-4 py-3">{{ book.nama_kategori }}</td>
                                    <td class="px-4 py-3">{{ book.stok }}</td>
                                    <td class="px-4 py-3">
                                        <span :class="book.status === 'tersedia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-1 rounded text-xs">
                                            {{ book.status }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 space-x-2">
                                        <button @click="openModal(book)" class="text-pink-500 hover:underline text-sm">Edit</button>
                                        <button @click="deleteBook(book.id)" class="text-red-600 hover:underline text-sm">Hapus</button>
                                    </td>
                                </tr>
                                <tr v-if="books.length === 0">
                                    <td colspan="6" class="px-4 py-6 text-center text-gray-400">Belum ada data buku</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            <!-- Modal Tambah/Edit -->
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
                    <h3 class="text-lg font-bold mb-4">{{ editMode ? 'Edit' : 'Tambah' }} Buku</h3>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Judul Buku</label>
                        <input v-model="form.judul" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Pengarang</label>
                        <input v-model="form.pengarang" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Penerbit</label>
                        <input v-model="form.penerbit" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Kategori</label>
                        <select v-model="form.kategori_id" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300">
                            <option value="">-- Pilih Kategori --</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.nama_kategori }}</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Stok</label>
                        <input v-model.number="form.stok" type="number" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 mb-1 text-sm">Status</label>
                        <select v-model="form.status" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300">
                            <option value="tersedia">Tersedia</option>
                            <option value="habis">Habis</option>
                        </select>
                    </div>

                    <div class="flex justify-end gap-2">
                        <button @click="closeModal" class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50">Batal</button>
                        <button @click="saveBook" class="px-4 py-2 rounded bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            username: localStorage.getItem('username') || 'Admin',
            books: [],
            categories: [],
            showModal: false,
            editMode: false,
            form: { id: null, judul: '', pengarang: '', penerbit: '', kategori_id: '', stok: 0, status: 'tersedia' }
        };
    },
    async mounted() {
        await this.fetchBooks();
        await this.fetchCategories();
    },
    methods: {
        async fetchBooks() {
            try {
                const res = await axios.get('http://localhost:8080/api/books');
                this.books = res.data;
            } catch (error) {
                console.error('Gagal memuat buku:', error);
            }
        },
        async fetchCategories() {
            try {
                const res = await axios.get('http://localhost:8080/api/categories');
                this.categories = res.data;
            } catch (error) {
                console.error('Gagal memuat kategori:', error);
            }
        },
        openModal(book = null) {
            if (book) {
                this.editMode = true;
                this.form = {
                    id: book.id,
                    judul: book.judul,
                    pengarang: book.pengarang,
                    penerbit: book.penerbit,
                    kategori_id: book.kategori_id,
                    stok: book.stok,
                    status: book.status
                };
            } else {
                this.editMode = false;
                this.form = { id: null, judul: '', pengarang: '', penerbit: '', kategori_id: '', stok: 0, status: 'tersedia' };
            }
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async saveBook() {
            if (!this.form.judul.trim() || !this.form.kategori_id) {
                alert('Judul dan kategori wajib diisi');
                return;
            }

            const payload = {
                judul: this.form.judul,
                pengarang: this.form.pengarang,
                penerbit: this.form.penerbit,
                kategori_id: this.form.kategori_id,
                stok: this.form.stok,
                status: this.form.status
            };

            try {
                if (this.editMode) {
                    await axios.put(`http://localhost:8080/api/books/${this.form.id}`, payload);
                } else {
                    await axios.post('http://localhost:8080/api/books', payload);
                }
                this.closeModal();
                await this.fetchBooks();
            } catch (error) {
                alert('Gagal menyimpan data buku');
                console.error(error);
            }
        },
        async deleteBook(id) {
            if (!confirm('Yakin ingin menghapus buku ini?')) return;

            try {
                await axios.delete(`http://localhost:8080/api/books/${id}`);
                await this.fetchBooks();
            } catch (error) {
                alert('Gagal menghapus buku');
                console.error(error);
            }
        },
        logout() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            this.$router.push('/login');
        }
    }
};