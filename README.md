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

## 📂 Struktur Folder Project

```
smartHris/
│
├── 📂 app
│   ├── 📂 Http
│   │   ├── 📂 Controllers      # Controller (Admin & Karyawan)
│   │   ├── 📂 Middleware       # Middleware auth & role
│   │   └── 📂 Requests         # Validasi form request
│   │
│   ├── 📂 Models               # Model Eloquent
│   └── 📂 Providers
│
├── 📂 database
│   ├── 📂 migrations           # Struktur tabel database
│   ├── 📂 seeders              # Seeder user, role, data awal
│   └── 📂 factories
│
├── 📂 public
│   ├── 📂 assets
│   │   ├── 📂 images           # Gambar & icon
│   │   ├── 📂 logo             # Logo HRIS
│   │   └── 📂 screenshots      # Screenshot aplikasi
│   └── index.php
│
├── 📂 resources
│   ├── 📂 js
│   │   ├── 📂 Pages
│   │   │   ├── 📂 Admin        # Halaman Admin
│   │   │   └── 📂 Karyawan     # Halaman Karyawan
│   │   │
│   │   ├── 📂 Components       # Komponen UI reusable
│   │   ├── 📂 Layouts          # Layout aplikasi
│   │   ├── 📂 Hooks            # Custom hooks
│   │   ├── 📂 lib              # Helper & utils
│   │   └── app.tsx             # Entry Inertia
│   │
│   ├── 📂 css
│   │   └── app.css             # Tailwind CSS
│   │
│   └── 📂 views
│       └── app.blade.php       # Root Inertia
│
├── 📂 routes
│   ├── web.php                 # Routing utama
│   └── auth.php                # Routing autentikasi
│
├── 📂 storage
│   ├── 📂 app                  # File upload
│   └── 📂 logs                 # Log sistem
│
├── 📂 tests                    # Testing
│
├── .env
├── .env.example
├── artisan
├── composer.json
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

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
```



