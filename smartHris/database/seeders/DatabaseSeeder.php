<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Karyawan;
use App\Models\JenisPelanggaran;
use App\Models\PelanggaranKaryawan;
use App\Models\SuratPeringatan;
use App\Models\Absensi;
use App\Models\Cuti;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $password = Hash::make('password123');

        /* ================= USERS ================= */
        
        $admin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@smarthris.com',
            'password' => $password,
            'role' => 'admin',
        ]);

        $user1 = User::create([
            'name' => 'Dhani Firdaus',
            'email' => 'dhani@smarthris.com',
            'password' => $password,
            'role' => 'user',
        ]);

        $user2 = User::create([
            'name' => 'Gilang Ramadhan',
            'email' => 'gilang@smarthris.com',
            'password' => $password,
            'role' => 'user',
        ]);
        
        $user3 = User::create([
            'name' => 'Rafli Ahmad',
            'email' => 'rafli@smarthris.com',
            'password' => $password,
            'role' => 'user',
        ]);
        
        $user4 = User::create([
            'name' => 'Nike Ardilla',
            'email' => 'nike@smarthris.com',
            'password' => $password,
            'role' => 'user',
        ]);

        $user5 = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@smarthris.com',
            'password' => $password,
            'role' => 'user',
        ]);

        $user6 = User::create([
            'name' => 'Siti Aminah',
            'email' => 'siti@smarthris.com',
            'password' => $password,
            'role' => 'user',
        ]);

        /* ================= KARYAWAN ================= */

        $karyawan1 = Karyawan::create([
            'user_id' => $user1->id,
            'nip' => 'K001',
            'jabatan' => 'Backend Developer',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2000-05-10',
            'departemen' => 'IT',
            'tanggal_masuk' => '2022-01-10',
            'alamat' => 'Jl. Merdeka No. 10, Jakarta',
        ]);

        $karyawan2 = Karyawan::create([
            'user_id' => $user2->id,
            'nip' => 'K002',
            'jabatan' => 'Recruitment Staff',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '1999-08-17',
            'departemen' => 'HRD',
            'tanggal_masuk' => '2022-03-01',
            'alamat' => 'Jl. Sudirman No. 45, Bandung',
        ]);
        
        $karyawan3 = Karyawan::create([
            'user_id' => $user3->id,
            'nip' => 'K003',
            'jabatan' => 'Payroll Specialist',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '1998-12-25',
            'departemen' => 'Finance',
            'tanggal_masuk' => '2021-06-15',
            'alamat' => 'Jl. Diponegoro No. 12, Surabaya',
        ]);

        $karyawan4 = Karyawan::create([
            'user_id' => $user4->id,
            'nip' => 'K004',
            'jabatan' => 'Social Media Specialist',
            'jenis_kelamin' => 'P',
            'tanggal_lahir' => '2001-02-14',
            'departemen' => 'Marketing',
            'tanggal_masuk' => '2023-01-05',
            'alamat' => 'Jl. Anggrek No. 88, Malang',
        ]);

        $karyawan5 = Karyawan::create([
            'user_id' => $user5->id,
            'nip' => 'K005',
            'jabatan' => 'General Affair',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '1995-10-30',
            'departemen' => 'Operasional',
            'tanggal_masuk' => '2020-11-20',
            'alamat' => 'Jl. Kenanga No. 5, Yogyakarta',
        ]);

        $karyawan6 = Karyawan::create([
            'user_id' => $user6->id,
            'nip' => 'K006',
            'jabatan' => 'Legal Officer',
            'jenis_kelamin' => 'P',
            'tanggal_lahir' => '1997-04-21',
            'departemen' => 'Legal',
            'tanggal_masuk' => '2021-09-01',
            'alamat' => 'Jl. Mawar Melati No. 99, Semarang',
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
        foreach (range(0, 9) as $i) {
            $jamMasuk = ($i == 3 || $i == 7) ? '08:45:00' : '08:00:00';
            
            Absensi::create([
                'karyawan_id' => $karyawan1->id,
                'tanggal' => Carbon::now()->subDays($i)->toDateString(),
                'jam_masuk' => $jamMasuk,
                'jam_pulang' => '17:00:00',
                'status' => 'hadir',
            ]);
        }

        foreach (range(0, 4) as $i) {
            Absensi::create([
                'karyawan_id' => $karyawan2->id,
                'tanggal' => Carbon::now()->subDays($i)->toDateString(),
                'jam_masuk' => '07:55:00',
                'jam_pulang' => '17:05:00',
                'status' => 'hadir',
            ]);
        }

        Absensi::create([
            'karyawan_id' => $karyawan2->id,
            'tanggal' => Carbon::now()->subDays(6)->toDateString(),
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

        
        Cuti::create([
            'karyawan_id' => $karyawan2->id,
            'tanggal_mulai' => '2026-01-20',
            'tanggal_selesai' => '2026-01-20',
            'alasan' => 'Mengurus SIM',
            'status' => 'disetujui', 
        ]);

        Cuti::create([
            'karyawan_id' => $karyawan3->id,
            'tanggal_mulai' => '2026-01-25',
            'tanggal_selesai' => '2026-01-28',
            'alasan' => 'Ingin istirahat saja',
            'status' => 'ditolak',
        ]);
    }
}