<?php

namespace App\Http\Controllers\Karyawan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

Schema::create('cutis', function (Blueprint $table) {
    $table->id();
    $table->foreignId('karyawan_id')->constrained()->cascadeOnDelete();
    $table->date('tanggal_mulai');
    $table->date('tanggal_selesai');
    $table->text('alasan');
    $table->enum('status', ['pending', 'disetujui', 'ditolak'])->default('pending');
    $table->timestamps();
});
class CutiController extends Controller
{
    public function store(Request $request)
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

    public function index()
    {
        return auth()->user()->karyawan->cuti;
    }
}
