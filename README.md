<div align="center">

<img src="Assets/logo/HUMAN_logo.png" alt="HRIS Banner" width="100%" />

# **Human Resource Information System (HRIS)**

Sistem Informasi Manajemen Sumber Daya Manusia berbasis web  
yang dikembangkan untuk mempermudah pengelolaan karyawan, absensi,  
cuti, pelanggaran, dan surat peringatan secara terintegrasi.

</div>

---

## 📌 Deskripsi Singkat

- Web Application berbasis **Laravel & Inertia.js**
- Role utama: **Admin & Karyawan**
- UI modern, clean, dan responsif
- Sistem absensi real-time
- Manajemen cuti & pelanggaran
- Keamanan dengan autentikasi & role-based access

---

## 🚀 Fitur Utama

### 👤 Manajemen Pengguna
- Login & autentikasi
- Hak akses Admin & Karyawan
- Update profil & password

### ⏱️ Absensi
- Absen masuk & pulang
- Penyimpanan waktu otomatis
- Riwayat absensi karyawan

### 🗓️ Cuti
- Pengajuan cuti
- Persetujuan admin
- Riwayat cuti

### ⚠️ Pelanggaran & SP
- Input pelanggaran
- Surat Peringatan (SP)
- Riwayat SP karyawan

---


## 🛠️ Teknologi yang Digunakan

- **Backend**: Laravel
- **Frontend**: React + TypeScript
- **Bridge**: Inertia.js
- **UI**: Tailwind CSS
- **Database**: MySQL
- **Build Tool**: Vite

---

## ⚙️ Cara Instalasi

```bash
https://github.com/SKARIGA-RPL-XII/repo-tugas-web-app-web-rpa.git
cd smartHris
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
npm run dev
