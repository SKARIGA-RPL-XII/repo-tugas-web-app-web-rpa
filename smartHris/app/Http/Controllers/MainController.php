<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Cuti;
use App\Models\Karyawan;
use App\Models\SuratPeringatan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $today = Carbon::today();

        /* ===================== ADMIN ======================== */
        if ($user->role === 'admin') {

            $totalKaryawan = Karyawan::count();
            $hadirHariIni = Absensi::whereDate('tanggal', $today)
                ->where('status', 'hadir')
                ->count();

            $pengajuanCuti = Cuti::where('status', 'pending')->count();

            $sanksiAktif = SuratPeringatan::distinct('karyawan_id')
                ->count('karyawan_id');

            // ===== GRAFIK ABSENSI 7 HARI =====
            $attendanceWeekly = Absensi::select(
                DB::raw('DATE(tanggal) as date'),
                DB::raw('COUNT(*) as total')
            )
                ->whereBetween('tanggal', [
                    Carbon::now()->subDays(6)->startOfDay(),
                    Carbon::now()->endOfDay()
                ])
                ->groupBy('date')
                ->orderBy('date')
                ->get()
                ->map(fn($item) => [
                    'date'  => Carbon::parse($item->date)->format('d M'),
                    'value' => $item->total,
                ]);

            $statusRaw = Absensi::select(
                'status',
                DB::raw('COUNT(*) as total')
            )
                ->groupBy('status')
                ->pluck('total', 'status');

            return Inertia::render('dashboard', [
                'role' => 'admin',

                'totalKaryawan' => $totalKaryawan,
                'hadirHariIni'  => $hadirHariIni,
                'pengajuanCuti' => $pengajuanCuti,
                'sanksiAktif'   => $sanksiAktif,

                'attendanceWeekly' => $attendanceWeekly,

                'statusAbsensi' => [
                    'hadir' => $statusRaw['hadir'] ?? 0,
                    'alpha' => $statusRaw['alpha'] ?? 0,
                    'izin'  => $statusRaw['izin'] ?? 0,
                    'sakit' => $statusRaw['sakit'] ?? 0,
                    'cuti'  => $statusRaw['cuti'] ?? 0,
                ],
            ]);
        }

        /* ===================== USER ========================= */
        $karyawan = $user->karyawan;

        $bulanIni = Carbon::now()->month;
        $tahunIni = Carbon::now()->year;

        $totalHariKerja = Absensi::where('karyawan_id', $karyawan->id)
            ->whereMonth('tanggal', $bulanIni)
            ->whereYear('tanggal', $tahunIni)
            ->count();

        $jumlahHadir = Absensi::where('karyawan_id', $karyawan->id)
            ->whereMonth('tanggal', $bulanIni)
            ->whereYear('tanggal', $tahunIni)
            ->where('status', 'hadir')
            ->count();

        $jumlahTerlambat = Absensi::where('karyawan_id', $karyawan->id)
            ->whereMonth('tanggal', $bulanIni)
            ->whereYear('tanggal', $tahunIni)
            ->where('keterangan', 'like', '%Terlambat%')
            ->count();

        $jumlahCuti = Cuti::where('karyawan_id', $karyawan->id)
            ->where('status', 'approved')
            ->whereMonth('tanggal_mulai', $bulanIni)
            ->count();

        $grafikKehadiran = Absensi::select(
            DB::raw('MONTH(tanggal) as bulan'),
            DB::raw('COUNT(*) as total')
        )
            ->where('karyawan_id', $karyawan->id)
            ->whereYear('tanggal', $tahunIni)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get()
            ->map(fn($item) => [
                'bulan' => Carbon::create()->month($item->bulan)->translatedFormat('M'),
                'value' => $item->total,
            ]);

        $absenHariIni = Absensi::where('karyawan_id', $karyawan->id)
            ->whereDate('tanggal', $today)
            ->first();

        return Inertia::render('dashboard', [
            'role' => 'user',

            'user' => [
                'name' => $user->name,
            ],

            'statistik' => [
                'hadir' => [
                    'total' => $jumlahHadir,
                    'hariKerja' => $totalHariKerja,
                ],
                'terlambat' => [
                    'total' => $jumlahTerlambat,
                    'hariKerja' => $totalHariKerja,
                ],
                'cuti' => [
                    'total' => $jumlahCuti,
                    'hariKerja' => $totalHariKerja,
                ],
            ],

            'grafikKehadiran' => $grafikKehadiran,

            'absenHariIni' => $absenHariIni ? [
                'status' => $absenHariIni->status,
                'jamMasuk' => $absenHariIni->jam_masuk,
                'jamPulang' => $absenHariIni->jam_pulang,
                'keterlambatan' => $absenHariIni->keterlambatan,
                'tanggal' => $today->translatedFormat('l, d F Y'),
            ] : null,

            'jadwalKerja' => [
                'datang' => '08:00',
                'pulang' => '17:00',
            ],

            'tanggalHariIni' => $today->translatedFormat('l, d F Y'),
            'bulanAktif' => $today->translatedFormat('F Y'),
            'tanggalAktif' => $today->day,
        ]);
    }
}