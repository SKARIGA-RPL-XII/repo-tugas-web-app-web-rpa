<?php

namespace App\Http\Controllers\Karyawan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
Schema::create('kalenders', function (Blueprint $table) {
    $table->id();
    $table->date('tanggal');
    $table->string('keterangan');
    $table->enum('jenis_hari', ['libur', 'kerja']);
    $table->timestamps();
});
class KalenderController extends Controller
{
    public function index()
    {
        return Kalender::orderBy('tanggal')->get();
    }
}
