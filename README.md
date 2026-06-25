# E-Library - Sistem Informasi Rental Buku/Komik Digital

## Deskripsi Proyek

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

![Database Schema](docs/database/erd.png)

### Relasi Tabel
1. **categories** - Master kategori buku
2. **books** - Master data buku (FK: category_id)
3. **members** - Master data anggota
4. **rentals** - Transaksi rental (FK: book_id, member_id)
5. **users** - Manajemen user/login

## Screenshot Aplikasi

### Halaman Login
![Login Page](docs/screenshots/ui/01-login-page.png)

### Dashboard
![Dashboard](docs/screenshots/ui/02-dashboard.png)

### Manajemen Buku
![Books Table](docs/screenshots/ui/03-books-table.png)

### Form Tambah Buku
![Add Book Form](docs/screenshots/ui/07-form-add-book.png)

### Manajemen Kategori
![Categories Table](docs/screenshots/ui/04-categories-table.png)

### Manajemen Anggota
![Members Table](docs/screenshots/ui/05-members-table.png)

### Manajemen Rental
![Rentals Table](docs/screenshots/ui/06-rentals-table.png)

## API Testing

### API 401 Error (Tanpa Token)
![API 401 Error](docs/screenshots/api/401-error.png)

### API 200 Success (Dengan Token)
![API Success](docs/screenshots/api/200-success.png)

## Instalasi & Setup

### Prasyarat
- PHP 7.4+
- Composer
- MySQL/MariaDB
- Web Server (Apache/Nginx)

### 1. Clone Repository
```bash
git clone https://github.com/username/UAS_Web2_123456789_Nama.git
cd UAS_Web2_123456789_Nama
