const Members = {
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
                    <router-link to="/members" class="block py-2 px-3 rounded bg-pink-50 text-pink-500 mb-1 font-semibold">👤 Anggota</router-link>
                    <router-link to="/loans" class="block py-2 px-3 rounded hover:bg-pink-50 text-gray-700 mb-1">🔄 Peminjaman</router-link>
                </aside>

                <main class="flex-1 p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Data Anggota</h2>
                        <button @click="openModal()" class="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded hover:from-pink-500 hover:to-pink-600">
                            + Tambah Anggota
                        </button>
                    </div>

                    <div class="bg-white rounded-lg shadow overflow-hidden border border-pink-100">
                        <table class="w-full text-left">
                            <thead class="bg-pink-50 text-gray-600 text-sm">
                                <tr>
                                    <th class="px-4 py-3">Nama</th>
                                    <th class="px-4 py-3">Email</th>
                                    <th class="px-4 py-3">No HP</th>
                                    <th class="px-4 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="member in members" :key="member.id" class="border-t hover:bg-pink-50">
                                    <td class="px-4 py-3">{{ member.nama }}</td>
                                    <td class="px-4 py-3">{{ member.email || '-' }}</td>
                                    <td class="px-4 py-3">{{ member.no_hp || '-' }}</td>
                                    <td class="px-4 py-3 space-x-2">
                                        <button @click="openModal(member)" class="text-pink-500 hover:underline text-sm">Edit</button>
                                        <button @click="deleteMember(member.id)" class="text-red-600 hover:underline text-sm">Hapus</button>
                                    </td>
                                </tr>
                                <tr v-if="members.length === 0">
                                    <td colspan="4" class="px-4 py-6 text-center text-gray-400">Belum ada data anggota</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            <!-- Modal Tambah/Edit -->
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-96">
                    <h3 class="text-lg font-bold mb-4">{{ editMode ? 'Edit' : 'Tambah' }} Anggota</h3>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Nama</label>
                        <input v-model="form.nama" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                    </div>

                    <div class="mb-3">
                        <label class="block text-gray-700 mb-1 text-sm">Email</label>
                        <input v-model="form.email" type="email" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 mb-1 text-sm">No HP</label>
                        <input v-model="form.no_hp" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                    </div>

                    <div class="flex justify-end gap-2">
                        <button @click="closeModal" class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50">Batal</button>
                        <button @click="saveMember" class="px-4 py-2 rounded bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            username: localStorage.getItem('username') || 'Admin',
            members: [],
            showModal: false,
            editMode: false,
            form: { id: null, nama: '', email: '', no_hp: '' }
        };
    },
    async mounted() {
        await this.fetchMembers();
    },
    methods: {
        async fetchMembers() {
            try {
                const res = await axios.get('http://localhost:8080/api/members');
                this.members = res.data;
            } catch (error) {
                console.error('Gagal memuat anggota:', error);
            }
        },
        openModal(member = null) {
            if (member) {
                this.editMode = true;
                this.form = { id: member.id, nama: member.nama, email: member.email, no_hp: member.no_hp };
            } else {
                this.editMode = false;
                this.form = { id: null, nama: '', email: '', no_hp: '' };
            }
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async saveMember() {
            if (!this.form.nama.trim()) {
                alert('Nama anggota tidak boleh kosong');
                return;
            }

            const payload = { nama: this.form.nama, email: this.form.email, no_hp: this.form.no_hp };

            try {
                if (this.editMode) {
                    await axios.put(`http://localhost:8080/api/members/${this.form.id}`, payload);
                } else {
                    await axios.post('http://localhost:8080/api/members', payload);
                }
                this.closeModal();
                await this.fetchMembers();
            } catch (error) {
                alert('Gagal menyimpan data anggota');
                console.error(error);
            }
        },
        async deleteMember(id) {
            if (!confirm('Yakin ingin menghapus anggota ini?')) return;

            try {
                await axios.delete(`http://localhost:8080/api/members/${id}`);
                await this.fetchMembers();
            } catch (error) {
                alert('Gagal menghapus data anggota');
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