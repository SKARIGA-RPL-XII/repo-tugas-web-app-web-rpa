<?php

namespace Database\Seeders;

use App\Models\Karyawan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class KaryawanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Andi Saputra',
                'email' => 'andi@example.com',
                'nip' => 'KRY001',
                'jabatan' => 'Staff IT',
                'jenis_kelamin' => 'L',
                'departemen' => 'IT',
            ],
            [
                'nama' => 'Siti Aminah',
                'email' => 'siti@example.com',
                'nip' => 'KRY002',
                'jabatan' => 'HRD',
                'jenis_kelamin' => 'P',
                'departemen' => 'HR',
            ],
            [
                'nama' => 'Budi Santoso',
                'email' => 'budi@example.com',
                'nip' => 'KRY003',
                'jabatan' => 'Finance',
                'jenis_kelamin' => 'L',
                'departemen' => 'Keuangan',
            ],
        ];

        foreach ($data as $item) {
            $user = User::create([
                'name' => $item['nama'],
                'email' => $item['email'],
                'password' => Hash::make('password'),
                'role' => 'user',
            ]);

            Karyawan::create([
                'user_id' => $user->id,
                'nip' => $item['nip'],
                'jabatan' => $item['jabatan'],
                'jenis_kelamin' => $item['jenis_kelamin'],
                'tanggal_lahir' => Carbon::now()->subYears(rand(22, 35)),
                'departemen' => $item['departemen'],
                'tanggal_masuk' => Carbon::now()->subMonths(rand(1, 24)),
                'alamat' => 'Jl. Contoh No. ' . rand(1, 100),
            ]);
        }
    }
}