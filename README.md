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

## Hasil OutPut

### *Halaman Login*
Ini halaman login khusus admin. Form sederhana berisi field Username dan Password, tombol Login berwarna pink/magenta dengan gradient, dan link "Kembali ke Beranda". Secara teknis, form ini akan mengirim request ke endpoint API CodeIgniter 4 (misal `/api/login`), lalu backend memverifikasi kredensial dan mengembalikan JWT token yang disimpan di sisi frontend (biasanya localStorage/sessionStorage) untuk dipakai di setiap request berikutnya.

<img width="708" height="595" alt="image" src="https://github.com/user-attachments/assets/e8488a82-7ae0-4770-bd94-116ac232e4a8" />

### *Dashboard*
Halaman utama setelah login, menampilkan 3 kartu statistik: Total Buku (5), Kategori (5), Peminjaman Aktif (2). Ini ringkasan kondisi sistem secara keseluruhan.
<img width="1600" height="316" alt="image" src="https://github.com/user-attachments/assets/9e13d661-2eea-440c-8513-878d1b14b66d" />


### *Data Buku / Manajemen Buku*
Tabel buku dengan kolom Judul, Pengarang, Kategori, Stok, Status, Aksi. 5 buku terdaftar:

 - Atomic Habits (James Clear, Non-Fiksi, stok 3, tersedia)
 - One Piece Vol 1 (Eiichiro Oda, Komik, stok 0, habis)
 - Kancil anak nakal (Ari Kurniawan, Komik, stok 10, tersedia)
 - Ilmu Pengetahuan Alam (Apis Ridho Widodo, sains, stok 40, tersedia)
 - Python (Kayla, sains, stok 75, tersedia)
<img width="1600" height="401" alt="image" src="https://github.com/user-attachments/assets/8e09f6ed-9171-4cfa-b8bc-3f43b1dabe22" />

### *Data Kategori / Manajemen Kategori*
Tabel kategori dengan kolom ID, Nama Kategori, Aksi. 5 kategori: Fiksi (ID 1), Non-Fiksi (ID 2), Komik (ID 3), sains (ID 4), Pemrograman Web (ID 7). ID 5 dan 6 kosong — kemungkinan kategori tersebut pernah dibuat lalu dihapus, jadi ID-nya tidak dipakai ulang (perilaku normal auto-increment MySQL).
<img width="1600" height="446" alt="image" src="https://github.com/user-attachments/assets/f6542291-4ed1-4f73-9f3c-116d36ffb857" />

### *Data Anggota / Manajemen Anggota*
Tabel anggota dengan kolom Nama, Email, No HP, Aksi. 6 anggota terdaftar: Muhammad Ridho Hafiedz, Steven Wiliam, Ari, SyalshaPutri, Maulana Malik Ibrahim, dan michel idoyy. Tiap baris ada tombol Edit/Hapus.
<img width="1600" height="544" alt="image" src="https://github.com/user-attachments/assets/0d4b0379-c44a-4cbf-8069-82bf71a80b04" />

### *Data Peminjaman / Manajemen Rental*
Tabel peminjaman dengan kolom Peminjam, Judul Buku, Tgl Pinjam, Tgl Kembali, Status, Aksi. 3 transaksi:
 - Muhammad Ridho Hafiedz — Atomic Habits — dipinjam
 - SyalshaPutri — Python — dipinjam
 - Steven Wiliam — One Piece Vol 1 — dikembalikan

Status "dipinjam" (badge kuning) dan "dikembalikan" (badge hijau) — cocok dengan dashboard yang menunjukkan 2 Peminjaman Aktif.
<img width="1600" height="355" alt="image" src="https://github.com/user-attachments/assets/0a65dcda-5cdc-4228-a2ce-399db2dd2b66" />

## API Testing

### *API 401 Error (Tanpa Token)*
**Request:**
- Method: `POST`
- URL: `http://localhost:8080/api/categories`
- Auth Type: Bearer Token, tapi kolom Token dibiarkan kosong (sengaja, untuk menguji
- apakah API menolak request tanpa token)

**Response yang didapat:**
 - Status: 401 Unauthorize
 - Waktu respons: 4.14 s, ukuran 293 B
 - Body (JSON):
```
{
    "message": "Token tidak ditemukan"
}
```
Penjelasan teknisnya:

Ini adalah bukti bahwa endpoint `/api/categories` di backend CodeIgniter 4 kamu sudah dilindungi oleh filter/middleware JWT auth. Ketika request POST dikirim tanpa menyertakan Bearer Token di header `Authorization`, backend:
1. Mengecek header Authorization → tidak menemukan token
2. Menolak request sebelum sampai ke controller/proses data
3. Mengembalikan HTTP status code 401 Unauthorized dengan pesan error `"Token tidak ditemukan"`

<img width="1093" height="876" alt="image" src="https://github.com/user-attachments/assets/5336331f-29a1-44da-893d-2484dcce3c17" />
