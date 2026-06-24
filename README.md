# Uas-Pemrograman-Web2

# E-Inventory — Sistem Manajemen Inventaris Barang

Proyek Ujian Akhir Semester (UAS) Mata Kuliah **Pemrograman Web 2**.
Aplikasi sistem manajemen inventaris barang yang dibangun dengan **Decoupled Architecture** — backend dan frontend terpisah penuh dan berkomunikasi melalui REST API.

**Disusun oleh:**
Muhammad Ridho Hafiedz — NIM 312410195 — Kelas I241B
Teknik Informatika, Universitas Pelita Bangsa

---

## Deskripsi Proyek

E-Inventory adalah sistem informasi untuk mengelola data **barang**, **kategori barang**, dan **supplier**. Sistem ini memiliki dua jenis hak akses:

- **Pengunjung (Public)** — hanya dapat melihat halaman Beranda dengan informasi umum.
- **Administrator (Wajib Login)** — dapat mengakses Dashboard, menambah, mengedit, menghapus data master, dan logout.

---

## Teknologi yang Digunakan

| Komponen | Teknologi |
|---|---|
| Backend | PHP Framework CodeIgniter 4 (REST API / Resource Controller) |
| Frontend | Vue 3 (CDN) + Vue Router (Single Page Application) |
| UI Framework | TailwindCSS (CDN) |
| HTTP Client | Axios |
| Database | MySQL / MariaDB |
| Autentikasi | JWT (JSON Web Token) Bearer Token |

---

## Struktur Folder Repository

```
UAS_Web2_312410195_Ridho/
├── backend-api/        → Source code CodeIgniter 4 (REST API)
└── frontend-spa/        → Source code Vue 3 + TailwindCSS (SPA)
```

---

## Fitur Utama

-  Autentikasi Login dengan JWT Bearer Token
-  CRUD lengkap (Create, Read, Update, Delete) untuk Barang, Kategori, dan Supplier
-  Proteksi endpoint API menggunakan CodeIgniter Filters (menolak akses tanpa token / Error 401)
-  CORS Filter untuk komunikasi lintas origin antara frontend dan backend
-  Vue Router dengan Navigation Guard (`beforeEach`) untuk membatasi akses halaman admin
-  Axios Request & Response Interceptor (token otomatis terpasang di setiap request, otomatis logout saat sesi habis)
-  Tampilan UI modern dan responsif menggunakan TailwindCSS

---

##  Hak Akses Pengguna

| Role | Akses |
|---|---|
| Pengunjung (Public) | Hanya halaman Beranda / informasi umum |
| Administrator | Dashboard, tambah/edit/hapus data, logout |

---

## Screenshot

### 1. Skema Relasi Tabel Database
![Skema Database](screenshots/skema-database.png)

### 2. Uji Coba API Gagal — Error 401 (Postman)
![Error 401](screenshots/error-401.png)

### 3. Halaman Login
![Halaman Login](screenshots/halaman-login.png)

### 4. Dashboard Admin
![Dashboard](screenshots/dashboard.png)

### 5. Form Modal Tambah/Edit Data
![Form Modal](screenshots/form-modal.png)

### 6. Tabel Data dengan TailwindCSS
![Tabel Data](screenshots/tabel-data.png)

> **Catatan:** Buat folder bernama `screenshots` di dalam repository, lalu upload semua gambar di atas ke folder tersebut dengan nama file yang sama seperti pada kode di atas.

---

## Cara Instalasi & Menjalankan Proyek di Komputer Lokal

### Prasyarat
- XAMPP (PHP 8.1+ dan MySQL/MariaDB aktif)
- Composer
- Python (untuk menjalankan server frontend)

### 1. Clone Repository
```bash
git clone https://github.com/USERNAME-KAMU/UAS_Web2_312410195_Ridho.git
cd UAS_Web2_312410195_Ridho
```

### 2. Setup Backend (CodeIgniter 4)

Masuk ke folder backend:
```bash
cd backend-api
composer install
```

Buat database baru bernama `db_einventory` di phpMyAdmin, lalu import file SQL yang disertakan di repository (jika ada).

Buka file `.env`, sesuaikan konfigurasi berikut:
```env
database.default.hostname = localhost
database.default.database = db_einventory
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
database.default.port = 3306

JWT_SECRET_KEY=ganti-dengan-secret-key-yang-aman-minimal-32-karakter
```

Jalankan server backend:
```bash
php spark serve
```
Backend akan berjalan di: **http://localhost:8080**

> Biarkan terminal ini tetap terbuka selama aplikasi digunakan.

### 3. Setup Frontend (Vue 3 SPA)

Buka terminal baru (jangan tutup terminal backend), lalu masuk ke folder frontend:
```bash
cd frontend-spa
python -m http.server 5500
```
Frontend akan berjalan di: **http://localhost:5500**

### 4. Akun Login Default

```
Username: admin
Password: admin123
```

---

## Cara Testing API dengan Postman

### Cek server aktif (tanpa token)
```
GET http://localhost:8080/api/auth/test
```

### Cek proteksi token (harus dapat Error 401)
```
GET http://localhost:8080/api/barang
```
Tanpa Authorization → Response:
```json
{"status":401,"error":true,"message":"Token tidak ditemukan"}
```

### Login untuk mendapatkan token
```
POST http://localhost:8080/api/auth/login
```
Body (JSON):
```json
{
    "username": "admin",
    "password": "admin123"
}
```

### Akses data dengan token (Bearer Token)
```
GET http://localhost:8080/api/barang
GET http://localhost:8080/api/kategori
GET http://localhost:8080/api/supplier
```

---

## Demo & Presentasi

- **Link Demo:** *(isi link demo di sini, jika tersedia)*
- **Link Video Presentasi (YouTube):** *(isi link video presentasi di sini)*

---

## Lisensi

Proyek ini dibuat untuk keperluan akademik (UAS Pemrograman Web 2) — Universitas Pelita Bangsa.
