# FPSBD
# Panduan Kolaborasi Proyek FPSBD
# KEL GACOR
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
### test dulu database:

```bash
node test.js
```
**Via phpMyAdmin:**
1. Buka `http://localhost/phpmyadmin`
2. Klik **Import** → pilih file `database/init.sql`
3. Klik **Go / Execute**

> ✅ Ini akan otomatis membuat database `db_restoran` beserta semua tabelnya.


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


