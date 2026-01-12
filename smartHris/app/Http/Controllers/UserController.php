<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Cuti;
use App\Models\Karyawan;
use App\Models\PelanggaranKaryawan;
use App\Models\SuratPeringatan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Container\Attributes\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB as FacadesDB;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $karyawan = auth()->user()->karyawan;
        return $karyawan;
    }
    public function absen()
    {
        $karyawan = auth()->user()->karyawan;
        $today = now()->toDateString();

        $absen = Absensi::where('karyawan_id', $karyawan->id)
            ->where('tanggal', $today)
            ->first();

        if (!$absen) {
            Absensi::create([
                'karyawan_id' => $karyawan->id,
                'tanggal' => $today,
                'jam_masuk' => now()->toTimeString(),
                'status' => 'hadir'
            ]);
            return response()->json(['message' => 'Absen masuk berhasil']);
        }

        if (!$absen->jam_pulang) {
            $absen->update([
                'jam_pulang' => now()->toTimeString()
            ]);
            return response()->json(['message' => 'Absen pulang berhasil']);
        }

        return response()->json(['message' => 'Anda sudah absen hari ini'], 400);
    }
    public function cutiStore(Request $request)
    {
        $request->validate([
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date',
            'alasan' => 'required'
        ]);

        Cuti::create([
            'karyawan_id' => auth()->user()->karyawan->id,
            'tanggal_mulai' => $request->tanggal_mulai,
            'tanggal_selesai' => $request->tanggal_selesai,
            'alasan' => $request->alasan,
            'status' => 'pending'
        ]);

        return response()->json(['message' => 'Pengajuan cuti berhasil']);
    }
    public function pelanggaran()
    {
        $karyawan = auth()->user()->karyawan;
        return PelanggaranKaryawan::with('jenisPelanggaran')->where('karyawan_id', $karyawan->id)->get();
    }
}
