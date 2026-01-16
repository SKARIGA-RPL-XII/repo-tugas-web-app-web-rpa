<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Karyawan;
use App\Models\JenisPelanggaran;
use App\Models\PelanggaranKaryawan;
use App\Models\SuratPeringatan;
use App\Models\Absensi;
use App\Models\Cuti;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        /* ================= USERS ================= */
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

        /* ================= KARYAWAN ================= */
        $karyawan1 = Karyawan::create([
            'user_id' => $user1->id,
            'nip' => 'K001',
            'jabatan' => 'Staff IT',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2000-01-01',
            'departemen' => 'IT',
            'tanggal_masuk' => '2022-01-01',
            'alamat' => 'Jl. Contoh 1',
        ]);

        $karyawan2 = Karyawan::create([
            'user_id' => $user2->id,
            'nip' => 'K002',
            'jabatan' => 'Staff HR',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2001-02-02',
            'departemen' => 'HR',
            'tanggal_masuk' => '2022-02-01',
            'alamat' => 'Jl. Contoh 2',
        ]);

        /* ================= JENIS PELANGGARAN ================= */
        $jp1 = JenisPelanggaran::create([
            'nama_pelanggaran' => 'Terlambat Masuk',
            'tingkat' => 'ringan',
            'keterangan' => 'Terlambat masuk kerja',
        ]);

        $jp2 = JenisPelanggaran::create([
            'nama_pelanggaran' => 'Tidak Hadir Tanpa Keterangan',
            'tingkat' => 'sedang',
            'keterangan' => 'Absen tanpa izin',
        ]);

        $jp3 = JenisPelanggaran::create([
            'nama_pelanggaran' => 'Melanggar Peraturan Berat',
            'tingkat' => 'berat',
            'keterangan' => 'Melanggar aturan perusahaan',
        ]);

        /* ================= PELANGGARAN KARYAWAN ================= */
        $pel1 = PelanggaranKaryawan::create([
            'karyawan_id' => $karyawan1->id,
            'jenis_pelanggaran_id' => $jp1->id,
            'tanggal' => '2026-01-10',
            'catatan' => 'Terlambat 15 menit',
        ]);

        $pel2 = PelanggaranKaryawan::create([
            'karyawan_id' => $karyawan2->id,
            'jenis_pelanggaran_id' => $jp2->id,
            'tanggal' => '2026-01-08',
            'catatan' => 'Tidak masuk tanpa izin',
        ]);

        /* ================= SURAT PERINGATAN ================= */
        SuratPeringatan::create([
            'karyawan_id' => $karyawan1->id,
            'pelanggaran_karyawan_id' => $pel1->id,
            'nomor_sp' => 'SP-0001',
            'jenis_sp' => 'SP1',
            'isi_pernyataan' => 'Karyawan berjanji tidak terlambat kembali',
            'tanggal_terbit' => '2026-01-11',
        ]);

        SuratPeringatan::create([
            'karyawan_id' => $karyawan2->id,
            'pelanggaran_karyawan_id' => $pel2->id,
            'nomor_sp' => 'SP-0002',
            'jenis_sp' => 'SP1',
            'isi_pernyataan' => 'Karyawan berjanji tidak mengulangi pelanggaran',
            'tanggal_terbit' => '2026-01-09',
        ]);

        /* ================= ABSENSI ================= */
        foreach (range(0, 6) as $i) {
            Absensi::create([
                'karyawan_id' => $karyawan1->id,
                'tanggal' => Carbon::now()->subDays($i)->toDateString(),
                'jam_masuk' => '08:00:00',
                'jam_pulang' => '17:00:00',
                'status' => 'hadir',
            ]);
        }

        Absensi::create([
            'karyawan_id' => $karyawan2->id,
            'tanggal' => Carbon::now()->toDateString(),
            'status' => 'alpha',
        ]);

        /* ================= CUTI ================= */
        $tanggalMulai   = Carbon::parse('2026-01-15');
        $tanggalSelesai = Carbon::parse('2026-01-17');

        Cuti::create([
            'karyawan_id'     => $karyawan1->id,
            'tanggal_mulai'   => $tanggalMulai,
            'tanggal_selesai' => $tanggalSelesai,
            'jumlah_hari'     => $tanggalMulai->diffInDays($tanggalSelesai) + 1,
            'alasan'          => 'Keperluan keluarga',
            'status'          => 'pending',
        ]);
    }
}