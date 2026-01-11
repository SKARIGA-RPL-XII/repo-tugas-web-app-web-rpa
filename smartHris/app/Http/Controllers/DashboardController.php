<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
        'role' => 'user', 

        'stats' => [
            'total_karyawan' => 30,
            'hadir_hari_ini' => 27,
            'pengajuan_cuti' => 3,
            'sanksi_aktif' => 3,
        ],

        'userSummary' => [
            'hadir' => 18,
            'terlambat' => 7,
            'cuti' => 5,
            'hariKerja' => 22,
        ],

            'weeklyAttendance' => [
                ['date' => '1 Mei', 'value' => 16],
                ['date' => '2 Mei', 'value' => 15.5],
                ['date' => '3 Mei', 'value' => 24],
                ['date' => '4 Mei', 'value' => 20],
                ['date' => '5 Mei', 'value' => 27],
                ['date' => '6 Mei', 'value' => 21],
                ['date' => '7 Mei', 'value' => 28.5],
            ],

            'attendanceStatus' => [
                ['label' => 'Hadir', 'value' => 50, 'color' => '#10b981'],
                ['label' => 'Alpha', 'value' => 5, 'color' => '#ef4444'],
                ['label' => 'Cuti', 'value' => 15, 'color' => '#eab308'],
                ['label' => 'Izin', 'value' => 10, 'color' => '#f97316'],
                ['label' => 'Sakit', 'value' => 20, 'color' => '#3b82f6'],
            ],
        ]);
    }
}
