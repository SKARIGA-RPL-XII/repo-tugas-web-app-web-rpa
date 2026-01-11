<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::middleware(['auth', 'role:user'])->prefix('karyawan')->group(function () {

    Route::post('/absensi', [AbsensiController::class, 'store']);
    Route::get('/absensi/riwayat', [AbsensiController::class, 'riwayat']);

    Route::get('/kalender', [KalenderController::class, 'index']);

    Route::get('/pelanggaran', [PelanggaranController::class, 'index']);

    Route::post('/cuti', [CutiController::class, 'store']);
    Route::get('/cuti', [CutiController::class, 'index']);

});


require __DIR__.'/settings.php';
