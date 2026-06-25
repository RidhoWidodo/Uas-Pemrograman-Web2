const Loans = {
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
                    <router-link to="/dashboard" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">🏠 Dashboard</router-link>
                    <router-link to="/books" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">📖 Data Buku</router-link>
                    <router-link to="/categories" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">🏷️ Kategori</router-link>
                    <router-link to="/members" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">👤 Anggota</router-link>
                    <router-link to="/loans" class="block py-2 px-3 rounded bg-pink-50 text-pink-500 mb-1 font-semibold">🔄 Peminjaman</router-link>
                </aside>

                <main class="flex-1 p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Data Peminjaman</h2>
                        <button @click="openModal()" class="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded hover:from-pink-500 hover:to-pink-600">
                            + Tambah Peminjaman
                        </button>
                    </div>

                    <div class="bg-white rounded-lg shadow overflow-hidden border border-pink-100">
                        <table class="w-full text-left">
                            <thead class="bg-pink-50 text-gray-600 text-sm">
                                <tr>
                                    <th class="px-4 py-3">Peminjam</th>
                                    <th class="px-4 py-3">Judul Buku</th>
                                    <th class="px-4 py-3">Tgl Pinjam</th>
                                    <th class="px-4 py-3">Tgl Kembali</th>
                                    <th class="px-4 py-3">Status</th>
                                    <th class="px-4 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="loan in loans" :key="loan.id" class="border-t hover:bg-pink-50">
                                    <td class="px-4 py-3">{{ loan.member_name }}</td>
                                    <td class="px-4 py-3">{{ loan.judul }}</td>
                                    <td class="px-4 py-3">{{ loan.tgl_pinjam }}</td>
                                    <td class="px-4 py-3">{{ loan.tgl_kembali || '-' }}</td>
                                    <td class="px-4 py-3">
                                        <span :class="loan.status === 'dipinjam' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'" class="px-2 py-1 rounded text-xs">
                                            {{ loan.status }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 space-x-2">
                                        <button @click="openModal(loan)" class="text-pink-500 hover:underline text-sm">Edit</button>
                                        <button @click="deleteLoan(loan.id)" class="text-red-600 hover:underline text-sm">Hapus</button>
                                    </td>
                                </tr>
                                <tr v-if="loans.length === 0">
                                    <td colspan="6" class="px-4 py-6 text-center text-gray-400">Belum ada data peminjaman</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            <!-- Modal Tambah/Edit -->
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
                    <h3 class="text-lg font-bold mb-4">{{ editMode ? 'Edit' : 'Tambah' }} Peminjaman</h3>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Anggota</label>
                        <select v-model="form.member_id" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300">
                            <option value="">-- Pilih Anggota --</option>
                            <option v-for="member in members" :key="member.id" :value="member.id">{{ member.nama }}</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Buku</label>
                        <select v-model="form.book_id" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300">
                            <option value="">-- Pilih Buku --</option>
                            <option v-for="book in books" :key="book.id" :value="book.id">{{ book.judul }}</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Tanggal Pinjam</label>
                        <input v-model="form.tgl_pinjam" type="date" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Tanggal Kembali</label>
                        <input v-model="form.tgl_kembali" type="date" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 mb-1 text-sm">Status</label>
                        <select v-model="form.status" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300">
                            <option value="dipinjam">Dipinjam</option>
                            <option value="dikembalikan">Dikembalikan</option>
                        </select>
                    </div>

                    <div class="flex justify-end gap-2">
                        <button @click="closeModal" class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50">Batal</button>
                        <button @click="saveLoan" class="px-4 py-2 rounded bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            username: localStorage.getItem('username') || 'Admin',
            loans: [],
            books: [],
            members: [],
            showModal: false,
            editMode: false,
            form: { id: null, member_id: '', book_id: '', tgl_pinjam: '', tgl_kembali: '', status: 'dipinjam' }
        };
    },
    async mounted() {
        await this.fetchLoans();
        await this.fetchBooks();
        await this.fetchMembers();
    },
    methods: {
        async fetchLoans() {
            try {
                const res = await axios.get('http://localhost:8080/api/loans');
                this.loans = res.data;
            } catch (error) {
                console.error('Gagal memuat peminjaman:', error);
            }
        },
        async fetchBooks() {
            try {
                const res = await axios.get('http://localhost:8080/api/books');
                this.books = res.data;
            } catch (error) {
                console.error('Gagal memuat buku:', error);
            }
        },
        async fetchMembers() {
            try {
                const res = await axios.get('http://localhost:8080/api/members');
                this.members = res.data;
            } catch (error) {
                console.error('Gagal memuat anggota:', error);
            }
        },
        openModal(loan = null) {
            if (loan) {
                this.editMode = true;
                this.form = {
                    id: loan.id,
                    member_id: loan.member_id,
                    book_id: loan.book_id,
                    tgl_pinjam: loan.tgl_pinjam,
                    tgl_kembali: loan.tgl_kembali || '',
                    status: loan.status
                };
            } else {
                this.editMode = false;
                this.form = { id: null, member_id: '', book_id: '', tgl_pinjam: '', tgl_kembali: '', status: 'dipinjam' };
            }
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async saveLoan() {
            if (!this.form.member_id || !this.form.book_id || !this.form.tgl_pinjam) {
                alert('Anggota, buku, dan tanggal pinjam wajib diisi');
                return;
            }

            const payload = {
                member_id: this.form.member_id,
                book_id: this.form.book_id,
                tgl_pinjam: this.form.tgl_pinjam,
                tgl_kembali: this.form.tgl_kembali || null,
                status: this.form.status
            };

            try {
                if (this.editMode) {
                    await axios.put(`http://localhost:8080/api/loans/${this.form.id}`, payload);
                } else {
                    await axios.post('http://localhost:8080/api/loans', payload);
                }
                this.closeModal();
                await this.fetchLoans();
            } catch (error) {
                alert('Gagal menyimpan data peminjaman');
                console.error(error);
            }
        },
        async deleteLoan(id) {
            if (!confirm('Yakin ingin menghapus data peminjaman ini?')) return;

            try {
                await axios.delete(`http://localhost:8080/api/loans/${id}`);
                await this.fetchLoans();
            } catch (error) {
                alert('Gagal menghapus data peminjaman');
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