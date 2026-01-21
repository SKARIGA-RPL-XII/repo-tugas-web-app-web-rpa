<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Cuti;
use App\Models\Karyawan;
use App\Models\SuratPeringatan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        Carbon::setLocale('id');
        $today = Carbon::now();

        /* ===================== ADMIN ======================== */
        if ($user->role === 'admin') {
            $totalKaryawan = Karyawan::count();
            $hadirHariIni = Absensi::whereDate('tanggal', $today)->where('status', 'hadir')->count();
            $pengajuanCuti = Cuti::where('status', 'pending')->count();
            $sanksiAktif = SuratPeringatan::distinct('karyawan_id')->count('karyawan_id');

            $attendanceWeekly = Absensi::select(
                DB::raw('DATE(tanggal) as date'),
                DB::raw('COUNT(*) as total')
            )
            ->whereBetween('tanggal', [Carbon::now()->subDays(6)->startOfDay(), Carbon::now()->endOfDay()])
            ->groupBy('date')->orderBy('date')->get()
            ->map(fn($item) => [
                'date'  => Carbon::parse($item->date)->format('d M'),
                'value' => $item->total,
            ]);

            $statusRaw = Absensi::select('status', DB::raw('COUNT(*) as total'))
                ->groupBy('status')->pluck('total', 'status');

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
        
        if (!$karyawan) {
            return Inertia::render('dashboard', [
                'role' => 'user', 
                'user' => ['name' => $user->name],
                'error' => 'Data Karyawan tidak ditemukan.',
                'statistik' => null,
                'absenHariIni' => null
            ]);
        }

        $bulanIni = $today->month;
        $tahunIni = $today->year;

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
            ->where('status', 'hadir')
            ->whereTime('jam_masuk', '>', '08:00:00') 
            ->count();
            
        $jumlahCuti = Cuti::where('karyawan_id', $karyawan->id)
            ->where('status', 'approved')
            ->whereMonth('tanggal_mulai', $bulanIni)
            ->count();

        $rawAttendance = Absensi::select(
            DB::raw('MONTH(tanggal) as month'),
            DB::raw('COUNT(*) as total')
        )
            ->where('karyawan_id', $karyawan->id)
            ->whereYear('tanggal', $tahunIni)
            ->groupBy('month')
            ->pluck('total', 'month')
            ->toArray();

        $months = [
            1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr', 
            5 => 'Mei', 6 => 'Jun', 7 => 'Jul', 8 => 'Agu', 
            9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Des'
        ];

        $grafikKehadiran = [];
        foreach ($months as $idx => $name) {
            $grafikKehadiran[] = [
                'name' => $name,
                'value' => $rawAttendance[$idx] ?? 0
            ];
        }

       
        $absenDB = Absensi::where('karyawan_id', $karyawan->id)
            ->whereDate('tanggal', $today->format('Y-m-d')) 
            ->first();

        $absenHariIni = [
            'status'        => 'Belum Hadir',
            'jamMasuk'      => '-- : --',
            'jamPulang'     => '-- : --',
            'keterlambatan' => '-',
            'tanggal'       => $today->translatedFormat('l, d F Y'),
        ];

        if ($absenDB) {
            $keterlambatan = '-';
            $jamJadwalMasuk = '08:00:00';
            if ($absenDB->jam_masuk) {
                $masuk = Carbon::parse($absenDB->jam_masuk);
                $jadwal = Carbon::parse($jamJadwalMasuk);
                
                if ($masuk->gt($jadwal)) {
                    $selisih = $masuk->diffInMinutes($jadwal);
                    $keterlambatan = $selisih . ' Menit';
                }
            }

            $absenHariIni = [
                'status'        => ucfirst($absenDB->status),
                'jamMasuk'      => $absenDB->jam_masuk ? Carbon::parse($absenDB->jam_masuk)->format('H : i') : '-- : --',
                'jamPulang'     => $absenDB->jam_pulang ? Carbon::parse($absenDB->jam_pulang)->format('H : i') : '-- : --',
                'keterlambatan' => $keterlambatan,
                'tanggal'       => Carbon::parse($absenDB->tanggal)->translatedFormat('l, d F Y'),
            ];
        }

        return Inertia::render('dashboard', [
            'role' => 'user',
            'user' => ['name' => $user->name],
            
            'statistik' => [
                'hadir'     => ['total' => $jumlahHadir, 'hariKerja' => $totalHariKerja],
                'terlambat' => ['total' => $jumlahTerlambat, 'hariKerja' => $totalHariKerja],
                'cuti'      => ['total' => $jumlahCuti, 'hariKerja' => $totalHariKerja],
            ],

            'grafikKehadiran' => $grafikKehadiran,

            'absenHariIni' => $absenHariIni,

            'jadwalKerja' => [
                'jamDatang' => '08 : 00',
                'jamPulang' => '17 : 00',
            ],
            
            'tanggalHariIni' => $today->translatedFormat('l, d F Y'),
            'bulanAktif'     => $today->translatedFormat('F Y'),
            'tanggalAktif'   => $today->day,
        ]);
    }
}