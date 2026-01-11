<?php

namespace Database\Seeders;

use App\Models\JenisPelanggaran;
use App\Models\Karyawan;
use App\Models\PelanggaranKaryawan;
use App\Models\SuratPeringatan;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ================= USERS =================
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $user1 = User::create([
            'name' => 'Dhani Firdaus',
            'email' => 'dhani@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        $user2 = User::create([
            'name' => 'Ahmad Ramadhan',
            'email' => 'ahmad@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // ================= KARYAWAN =================
        $karyawan1 = Karyawan::create([
            'user_id' => $user1->id,
            'nip' => 'K001',
            'jabatan' => 'Staff IT',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2000-01-01',
            'departemen' => 'IT',
            'tanggal_masuk' => '2022-01-01',
            'alamat' => 'Jl. Contoh 1'
        ]);

        $karyawan2 = Karyawan::create([
            'user_id' => $user2->id,
            'nip' => 'K002',
            'jabatan' => 'Staff HR',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2001-02-02',
            'departemen' => 'HR',
            'tanggal_masuk' => '2022-02-01',
            'alamat' => 'Jl. Contoh 2'
        ]);

        // ================= JENIS PELANGGARAN =================
        $jp1 = JenisPelanggaran::create([
            'nama_pelanggaran' => 'Terlambat Masuk',
            'tingkat' => 'ringan',
            'potongan' => 0,
            'keterangan' => 'Terlambat masuk kerja'
        ]);

        $jp2 = JenisPelanggaran::create([
            'nama_pelanggaran' => 'Tidak Hadir Tanpa Keterangan',
            'tingkat' => 'sedang',
            'potongan' => 50000,
            'keterangan' => 'Absen tanpa izin'
        ]);

        $jp3 = JenisPelanggaran::create([
            'nama_pelanggaran' => 'Melanggar Peraturan Berat',
            'tingkat' => 'berat',
            'potongan' => 100000,
            'keterangan' => 'Melanggar aturan perusahaan'
        ]);

        // ================= PELANGGARAN KARYAWAN =================
        $pel1 = PelanggaranKaryawan::create([
            'karyawan_id' => $karyawan1->id,
            'jenis_pelanggaran_id' => $jp1->id,
            'tanggal' => '2026-01-10',
            'catatan' => 'Terlambat 15 menit'
        ]);

        $pel2 = PelanggaranKaryawan::create([
            'karyawan_id' => $karyawan2->id,
            'jenis_pelanggaran_id' => $jp2->id,
            'tanggal' => '2026-01-08',
            'catatan' => 'Tidak masuk tanpa izin'
        ]);

        // ================= SURAT PERINGATAN =================
        SuratPeringatan::create([
            'pelanggaran_karyawan_id' => $pel1->id,
            'karyawan_id' => $karyawan1->id,
            'nomor_sp' => 'SP001/2026',
            'jenis_sp' => 'SP1',
            'isi_pernyataan' => 'Karyawan membuat surat pernyataan untuk tidak terlambat lagi',
            'tanggal_terbit' => '2026-01-11'
        ]);

        SuratPeringatan::create([
            'pelanggaran_karyawan_id' => $pel2->id,
            'karyawan_id' => $karyawan2->id,
            'nomor_sp' => 'SP002/2026',
            'jenis_sp' => 'SP1',
            'isi_pernyataan' => 'Karyawan membuat surat pernyataan untuk tidak bolos lagi',
            'tanggal_terbit' => '2026-01-09'
        ]);
    }
}