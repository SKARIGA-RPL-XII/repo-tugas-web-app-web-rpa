<?php

namespace App\Http\Controllers\Karyawan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

Schema::create('pelanggaran_karyawans', function (Blueprint $table) {
    $table->id();
    $table->foreignId('karyawan_id')->constrained()->cascadeOnDelete();
    $table->foreignId('jenis_pelanggaran_id')->constrained();
    $table->date('tanggal');
    $table->text('catatan')->nullable();
    $table->timestamps();
});
class PelanggaranController extends Controller
{
    public function index()
    {
        $karyawan = auth()->user()->karyawan;

        return PelanggaranKaryawan::with('jenisPelanggaran')
            ->where('karyawan_id', $karyawan->id)
            ->get();
    }
}

