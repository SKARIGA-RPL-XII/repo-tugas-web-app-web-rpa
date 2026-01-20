<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

// MODELS
use App\Models\User;
use App\Models\Karyawan;
use App\Models\JenisPelanggaran;
use App\Models\PelanggaranKaryawan;
use App\Models\SuratPeringatan;
use App\Models\Absensi;
use App\Models\Cuti;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password123');

        /* ================= ADMIN ================= */
        User::create([
            'name' => 'Admin',
            'email' => 'admin@smarthris.com',
            'password' => $password,
            'role' => 'admin',
        ]);

        /* ================= USERS & KARYAWAN ================= */

        $dataUsers = [
            ['Achmad Firdaus Ramadhani', 'achmad@smarthris.com', 'K001', 'L', 'IT', 'Back End'],
            ['Aditya Faruq Al-Aziz Saputra', 'aditya@smarthris.com', 'K002', 'L', 'HRD', 'Front End'],
            ['Artha Ardiansyah', 'artha@smarthris.com', 'K003', 'L', 'Finance', 'Front End'],
            ['Berta Yuanita Putri Maryani', 'berta@smarthris.com', 'K004', 'P', 'Marketing', 'UI/UX'],
            ['Enggar Fitriana Sugiono', 'enggar@smarthris.com', 'K005', 'P', 'Operasional', 'Dokumentasi'],
            ['Gilang Ardhi Maulana', 'gilang@smarthris.com', 'K006', 'L', 'IT', 'Front End'],
            ['Muchammad Rafli Rahman', 'rafli@smarthris.com', 'K007', 'L', 'HRD', 'Front End'],
            ['Muhamad Reihan Ilham', 'reihan@smarthris.com', 'K008', 'L', 'Finance', 'Back End'],
            ['Nike Putri Maharani', 'nike@smarthris.com', 'K009', 'P', 'Marketing', 'UI/UX'],
            ['Rajabsa Egga Bagas Wisesa', 'rajabsa@smarthris.com', 'K010', 'L', 'Operasional', 'Dokumentasi'],
            ['Syabil Iqmaulana Irawan', 'syabil@smarthris.com', 'K011', 'L', 'IT', 'Back End'],
        ];

        $karyawans = [];

        foreach ($dataUsers as $data) {
            $user = User::create([
                'name' => $data[0],
                'email' => $data[1],
                'password' => $password,
                'role' => 'user',
            ]);

            $karyawans[] = Karyawan::create([
                'user_id' => $user->id,
                'nip' => $data[2],
                'jenis_kelamin' => $data[3],
                'departemen' => $data[4],
                'jabatan' => $data[5],
                'tanggal_lahir' => '2000-01-01',
                'tanggal_masuk' => '2022-01-01',
                'alamat' => 'Alamat default',
            ]);
        }

        /* ================= JENIS PELANGGARAN ================= */

        $jp1 = JenisPelanggaran::create([
            'nama_pelanggaran' => 'Terlambat Masuk',
            'tingkat' => 'ringan',
            'keterangan' => 'Datang melebihi jam kerja',
        ]);

        $jp2 = JenisPelanggaran::create([
            'nama_pelanggaran' => 'Tidak Hadir Tanpa Keterangan',
            'tingkat' => 'sedang',
            'keterangan' => 'Absen tanpa izin',
        ]);

        /* ================= ABSENSI (1 BULAN) ================= */

        foreach ($karyawans as $karyawan) {
            foreach (range(1, 30) as $hari) {

                $status = collect(['hadir', 'hadir', 'hadir', 'alpha'])->random();

                Absensi::create([
                    'karyawan_id' => $karyawan->id,
                    'tanggal' => Carbon::now()->subDays($hari),
                    'jam_masuk' => $status === 'hadir'
                        ? (rand(0, 10) > 7 ? '08:30:00' : '08:00:00')
                        : null,
                    'jam_pulang' => $status === 'hadir' ? '17:00:00' : null,
                    'status' => $status,
                    'keterangan' => $status === 'alpha'
                        ? 'Tidak hadir tanpa keterangan'
                        : null,
                ]);
            }
        }

        /* ================= PELANGGARAN ================= */

        foreach ([$karyawans[0], $karyawans[3], $karyawans[6]] as $karyawan) {
            PelanggaranKaryawan::create([
                'karyawan_id' => $karyawan->id,
                'jenis_pelanggaran_id' => $jp1->id,
                'tanggal' => Carbon::now()->subDays(rand(5, 20)),
                'catatan' => 'Terlambat lebih dari 15 menit',
            ]);
        }

        foreach ([$karyawans[1], $karyawans[4]] as $karyawan) {
            PelanggaranKaryawan::create([
                'karyawan_id' => $karyawan->id,
                'jenis_pelanggaran_id' => $jp2->id,
                'tanggal' => Carbon::now()->subDays(rand(10, 25)),
                'catatan' => 'Tidak masuk tanpa izin',
            ]);
        }

        /* ================= SURAT PERINGATAN ================= */

        $pelanggaranList = PelanggaranKaryawan::all();

        $counterPerBulan = [];

        foreach ($pelanggaranList as $pel) {

            // skip jika sudah punya SP
            if (SuratPeringatan::where('pelanggaran_karyawan_id', $pel->id)->exists()) {
                continue;
            }

            $tanggalTerbit = Carbon::parse($pel->tanggal)->addDay();
            $bulan = $tanggalTerbit->format('m');
            $tahun = $tanggalTerbit->format('Y');

            $key = $bulan . '-' . $tahun;

            // inisialisasi counter per bulan
            if (!isset($counterPerBulan[$key])) {
                $counterPerBulan[$key] = SuratPeringatan::whereMonth('tanggal_terbit', $bulan)
                    ->whereYear('tanggal_terbit', $tahun)
                    ->count();
            }

            $counterPerBulan[$key]++;

            $nomorSp = 'SP-' . $bulan . '-' . str_pad($counterPerBulan[$key], 3, '0', STR_PAD_LEFT);

            SuratPeringatan::create([
                'karyawan_id' => $pel->karyawan_id,
                'pelanggaran_karyawan_id' => $pel->id,
                'nomor_sp' => $nomorSp,
                'jenis_sp' => $counterPerBulan[$key] % 2 === 0 ? 'SP2' : 'SP1',
                'isi_pernyataan' => 'Karyawan berjanji memperbaiki kedisiplinan',
                'tanggal_terbit' => $tanggalTerbit,
            ]);
        }

        /* ================= CUTI ================= */

        foreach ([$karyawans[2], $karyawans[5], $karyawans[8]] as $karyawan) {

            $mulai = Carbon::now()->addDays(rand(3, 15));
            $selesai = $mulai->copy()->addDays(rand(1, 4));

            Cuti::create([
                'karyawan_id' => $karyawan->id,
                'tanggal_mulai' => $mulai,
                'tanggal_selesai' => $selesai,
                'jumlah_hari' => $mulai->diffInDays($selesai) + 1,
                'alasan' => collect([
                    'Keperluan keluarga',
                    'Sakit',
                    'Acara penting',
                    'Istirahat'
                ])->random(),
                'status' => collect(['pending', 'disetujui', 'ditolak'])->random(),
            ]);
        }
    }
}
