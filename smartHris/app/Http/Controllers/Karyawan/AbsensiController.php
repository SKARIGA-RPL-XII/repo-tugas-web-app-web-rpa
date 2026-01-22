<?php

namespace App\Http\Controllers\Karyawan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

Schema::create('absensis', function (Blueprint $table) {
    $table->id();
    $table->foreignId('karyawan_id')->constrained()->cascadeOnDelete();
    $table->date('tanggal');
    $table->time('jam_masuk')->nullable();
    $table->time('jam_pulang')->nullable();
    $table->enum('status', ['hadir', 'izin', 'sakit', 'alpha']);
    $table->timestamps();
});

class AbsensiController extends Controller
{
    public function store()
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
}


