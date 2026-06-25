# E-Library - Sistem Informasi Rental Buku/Komik Digital

*Nama : Muhammad Ridho Hafiedz*

*Nim  : 312410195*

*Kelas: I241B*

*Matkul : Pemrograman Web2*

## Proyek E-Library System

E-Library adalah sistem informasi rental buku dan komik digital yang dibangun menggunakan arsitektur decoupled (terpisah) antara backend dan frontend. Aplikasi ini memungkinkan pengelolaan koleksi buku, kategori, anggota perpustakaan, dan transaksi rental secara terintegrasi.

**Tema:** Sistem Informasi Rental Buku / Komik Digital (E-Library)

## Teknologi yang Digunakan

### Backend
- **Framework:** CodeIgniter 4 (RESTful API)
- **Database:** MySQL/MariaDB
- **Authentication:** JWT (JSON Web Token)
- **Security:** CORS, XSS Protection, CSRF Protection

### Frontend
- **Framework:** VueJS 3 (SPA)
- **Router:** Vue Router
- **Styling:** TailwindCSS
- **HTTP Client:** Axios

## Fitur Aplikasi

### 1. Manajemen Buku
- CRUD data buku
- Upload cover image
- Pencarian dan filter berdasarkan kategori
- Monitoring stok buku

### 2. Manajemen Kategori
- CRUD data kategori
- Menampilkan jumlah buku per kategori

### 3. Manajemen Anggota
- CRUD data anggota
- Generate kode anggota otomatis
- Status anggota (Aktif/Tidak Aktif/Blacklist)

### 4. Manajemen Rental
- Proses peminjaman buku
- Proses pengembalian buku
- Perhitungan total harga otomatis
- Monitoring status rental

### 5. Dashboard
- Statistik ringkasan
- Aktivitas terbaru

### 6. Otentikasi
- Login dengan JWT
- Proteksi route dengan Navigation Guards
- Axios Interceptor untuk token

## Skema Database

<img width="241" height="175" alt="image" src="https://github.com/user-attachments/assets/84a0b534-5609-4d2a-b5da-72b8299037df" />


### Relasi Tabel
1. **categories** - Master kategori buku
2. **books** - Master data buku (FK: category_id)
3. **members** - Master data anggota
4. **rentals** - Transaksi rental (FK: book_id, member_id)
5. **users** - Manajemen user/login

## Screenshot Aplikasi

### Halaman Login
<img width="708" height="595" alt="image" src="https://github.com/user-attachments/assets/e8488a82-7ae0-4770-bd94-116ac232e4a8" />

### Dashboard
<img width="1600" height="316" alt="image" src="https://github.com/user-attachments/assets/e937e430-a423-48cc-af5b-e1a368ae49fe" />

### Manajemen Buku
<img width="1600" height="401" alt="image" src="https://github.com/user-attachments/assets/9b692321-2aa1-480c-a1c6-4dd1cde83534" />

### Form Tambah Buku
<img width="1600" height="446" alt="image" src="https://github.com/user-attachments/assets/70ded4f1-9461-4a14-aa97-9287eb179789" />

### Manajemen Kategori
<img width="1600" height="446" alt="image" src="https://github.com/user-attachments/assets/9844f57f-131b-41fe-a9ab-ccebfa54ae67" />

### Manajemen Anggota
<img width="1600" height="544" alt="image" src="https://github.com/user-attachments/assets/bf8e3fc8-f085-4b05-82fa-473eda2e1f0f" />

### Manajemen Rental
<img width="1600" height="355" alt="image" src="https://github.com/user-attachments/assets/53e50d51-c149-46b8-ab5f-29525ecdc964" />

## API Testing

### API 401 Error (Tanpa Token)
<img width="1093" height="876" alt="image" src="https://github.com/user-attachments/assets/5336331f-29a1-44da-893d-2484dcce3c17" />
