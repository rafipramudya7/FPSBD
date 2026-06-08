# FPSBD
# Panduan Kolaborasi Proyek FPSBD

## 1. Clone Repository


```bash
git clone https://github.com/rafipramudya7/FPSBD.git
cd FPSBD
```

---

## 2. Ambil Perubahan Terbaru

Sebelum mulai bekerja, selalu sinkronkan branch utama:

```bash
git checkout main
git pull origin main
```

---

## 3. Buat Branch Baru

Jangan bekerja langsung di branch `main`.

Buat branch sesuai tugas yang dikerjakan:

```bash
git checkout -b fitur-login
```

Contoh nama branch:

* fitur-login
* fitur-dashboard
* fitur-database
* fitur-report
* fix-validasi

---

## 4. Kerjakan Tugas

Lakukan perubahan kode sesuai tugas masing-masing.

Cek status perubahan:

```bash
git status
```

---

## 5. Commit Perubahan

Tambahkan file yang berubah:

```bash
git add .
```

Buat commit:

```bash
git commit -m "feat: menambahkan halaman login"
```

Format commit yang digunakan:

* feat: fitur baru
* fix: perbaikan bug
* docs: dokumentasi
* style: perubahan tampilan
* refactor: perapian kode

Contoh:

```bash
git commit -m "feat: CRUD mahasiswa"
git commit -m "fix: validasi password"
git commit -m "docs: menambahkan ERD"
```

---

## 6. Push Branch

Push branch ke GitHub:

```bash
git push origin fitur-login
```

Ganti `fitur-login` sesuai nama branch yang digunakan.

---

## 7. Buat Pull Request

Setelah pekerjaan selesai:

1. Buka repository di GitHub.
2. Pilih branch yang telah di-push.
3. Klik **Compare & Pull Request**.
4. Tambahkan deskripsi perubahan.
5. Klik **Create Pull Request**.

---

## 8. Aturan Tim

* Jangan commit langsung ke `main`.
* Selalu `git pull` sebelum mulai bekerja.
* Gunakan branch terpisah untuk setiap fitur.
* Gunakan pesan commit yang jelas.
* Lakukan push ke branch masing-masing.
* Semua perubahan ke `main` harus melalui Pull Request.
* Branch `main` hanya digunakan untuk kode yang sudah stabil.

## Alur Kerja

```text
main
 ├── fitur-login
 ├── fitur-dashboard
 ├── fitur-database
 └── fitur-report

Branch -> Commit -> Push -> Pull Request -> Merge ke main
```

# 🍱 FPSBD Catering Management System

Sistem manajemen catering berbasis **Node.js + Express + MySQL + EJS**.

---

## 📋 Prasyarat

Pastikan sudah terinstall di komputermu:

| Tools | Versi minimal | Cek versi |
|-------|--------------|-----------|
| Node.js | v18+ | `node -v` |
| npm | v8+ | `npm -v` |
| MySQL | v8+ | `mysql --version` |
| Git | any | `git --version` |

---

## 🚀 Cara Clone & Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/USERNAME/fpsbd-catering-management.git
cd fpsbd-catering-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

Buka terminal MySQL atau gunakan phpMyAdmin, lalu jalankan file SQL berikut:

**Via terminal MySQL:**
```bash
mysql -u root -p < database/init.sql
```

**Via phpMyAdmin:**
1. Buka `http://localhost/phpmyadmin`
2. Klik **Import** → pilih file `database/init.sql`
3. Klik **Go / Execute**

> ✅ Ini akan otomatis membuat database `db_restoran` beserta semua tabelnya.

### 4. Buat File `.env`

Copy file contoh `.env.example` dan rename menjadi `.env`:

```bash
# Linux / Mac
cp .env.example .env

# Windows (Command Prompt)
copy .env.example .env
```

Lalu buka file `.env` dan sesuaikan isinya:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=isi_password_mysql_kamu_disini
DB_NAME=db_restoran
```

> ⚠️ Jika MySQL kamu tidak punya password, biarkan `DB_PASSWORD=` kosong saja.

### 5. Jalankan Server

```bash
# Mode development (auto-restart saat ada perubahan)
npm run dev

# Mode production
npm start
```

Buka browser dan akses:

```
http://localhost:3000
```

---

## 🧪 Testing Database

Setelah database berhasil diimport, kamu bisa memverifikasi dengan menjalankan script test berikut.

### Cara menjalankan test:

```bash
node database/test.js
```

### Apa yang ditest:

| No | Test | Keterangan |
|----|------|-----------|
| 1 | Koneksi database | Memastikan koneksi ke MySQL berhasil |
| 2 | Tabel exists | Cek semua 6 tabel sudah terbuat |
| 3 | INSERT data | Coba insert data dummy ke setiap tabel |
| 4 | SELECT data | Coba baca data yang baru diinsert |
| 5 | DELETE data | Hapus data dummy setelah test |

> Jika semua test menampilkan ✅, berarti database siap digunakan.

---

## 📁 Struktur Folder

```
fpsbd-catering-management/
│
├── controllers/
│   ├── karyawanController.js
│   ├── menuController.js
│   └── pemesanController.js
│
├── database/
│   ├── db.js               ← Konfigurasi koneksi MySQL
│   ├── init.sql            ← Script SQL untuk buat semua tabel
│   └── test.js             ← Script untuk test database
│
├── routes/
│   ├── karyawanRoutes.js
│   ├── menuRoutes.js
│   └── pemesanRoutes.js
│
├── views/
│   ├── karyawan/
│   ├── menu/
│   └── pemesan/
│
├── public/                 ← File CSS, JS, gambar statis
│
├── app.js                  ← Entry point aplikasi
├── .env                    ← Konfigurasi environment (JANGAN di-commit!)
├── .env.example            ← Template .env untuk teman-teman
├── .gitignore
├── package.json
└── README.md
```

---

## 🛣️ Daftar Routes

### Karyawan — `/karyawan`

| Method | Route | Fungsi |
|--------|-------|--------|
| GET | `/karyawan` | Lihat semua karyawan |
| GET | `/karyawan/create` | Form tambah karyawan |
| POST | `/karyawan/create` | Simpan karyawan baru |
| GET | `/karyawan/edit/:id` | Form edit karyawan |
| POST | `/karyawan/edit/:id` | Update data karyawan |
| GET | `/karyawan/delete/:id` | Hapus karyawan |

### Menu — `/menu`

| Method | Route | Fungsi |
|--------|-------|--------|
| GET | `/menu` | Lihat semua menu |
| GET | `/menu/create` | Form tambah menu |
| POST | `/menu/create` | Simpan menu baru |
| GET | `/menu/edit/:id` | Form edit menu |
| POST | `/menu/edit/:id` | Update data menu |
| GET | `/menu/delete/:id` | Hapus menu |

### Pemesan — `/pemesan`

| Method | Route | Fungsi |
|--------|-------|--------|
| GET | `/pemesan` | Lihat semua pemesan |
| GET | `/pemesan/create` | Form tambah pemesan |
| POST | `/pemesan/create` | Simpan pemesan baru |
| GET | `/pemesan/edit/:id` | Form edit pemesan |
| POST | `/pemesan/edit/:id` | Update data pemesan |
| GET | `/pemesan/delete/:id` | Hapus pemesan |

---

## ❓ Troubleshooting

**Error: `ER_ACCESS_DENIED_ERROR`**
→ Password MySQL di file `.env` salah. Cek kembali `DB_PASSWORD`.

**Error: `ECONNREFUSED`**
→ MySQL belum berjalan. Nyalakan dulu XAMPP / WAMP / MySQL service.

**Error: `ER_BAD_DB_ERROR: Unknown database`**
→ Database belum dibuat. Ulangi langkah **Setup Database** (no. 3).

**Port 3000 sudah dipakai**
→ Ubah `const PORT = 3000` di `app.js` menjadi port lain, misal `3001`.

---

## 👥 Tim

> Final Project Sistem Basis Data — Catering Management System