<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('dashboard');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('admin/karyawan', function () {
    return Inertia::render('admin/data-karyawan');
})->name('karyawan');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// KARYAWAN
Route::get('/karyawan', [AdminController::class, 'indexKaryawan'])->name('admin.karyawan');
Route::post('/karyawan', [AdminController::class, 'storeKaryawan'])->name('admin.karyawan.store');
Route::put('/karyawan/{id}', [AdminController::class, 'updateKaryawan'])->name('admin.karyawan.update');
Route::delete('/karyawan/{id}', [AdminController::class, 'destroyKaryawan'])->name('admin.karyawan.destroy');

// ABSENSI
Route::get('/absensi', [AdminController::class, 'indexAbsensi'])->name('admin.absensi');
Route::put('/absensi/{id}', [AdminController::class, 'updateAbsensi'])->name('admin.absensi.update');
Route::delete('/absensi/{id}', [AdminController::class, 'destroyAbsensi'])->name('admin.absensi.destroy');

// CUTI
Route::get('/cuti', [AdminController::class, 'indexCuti'])->name('admin.cuti');
Route::post('/cuti/{id}/approve', [AdminController::class, 'approveCuti'])->name('admin.cuti.approve');
Route::post('/cuti/{id}/reject', [AdminController::class, 'rejectCuti'])->name('admin.cuti.reject');

// KALENDER
Route::get('/kalender', [AdminController::class, 'kalender'])->name('admin.kalender');
Route::get('/kalender-event', [AdminController::class, 'event'])->name('admin.event');
Route::post('/kalender-event', [AdminController::class, 'eventStore'])->name('admin.event.store');
Route::put('/kalender-event/{id}', [AdminController::class, 'eventUpdate'])->name('admin.event.update');
Route::delete('/kalender-event/{id}', [AdminController::class, 'eventDestroy'])->name('admin.event.destroy');

// JENIS PELANGGARAN
Route::get('/jenis-pelanggaran', [AdminController::class, 'jPelanggaran'])->name('jenis-pelanggaran');
Route::post('/jenis-pelanggaran', [AdminController::class, 'jPelanggaranStore'])->name('jenis-pelanggaran.store');
Route::put('/jenis-pelanggaran/{id}', [AdminController::class, 'jPelanggaranUpdate'])->name('jenis-pelanggaran.update');
Route::delete('/jenis-pelanggaran/{id}', [AdminController::class, 'jPelanggaranDestroy'])->name('jenis-pelanggaran.destroy');

// PELANGGARAN
Route::get('/pelanggaran', [AdminController::class, 'pKaryawan'])->name('admin.pelanggaran');
Route::post('/pelanggaran', [AdminController::class, 'pKaryawanStore'])->name('admin.pelanggaran.store');
Route::put('/pelanggaran/{id}', [AdminController::class, 'pKaryawanUpdate'])->name('admin.pelanggaran.update');
Route::delete('/pelanggaran/{id}', [AdminController::class, 'pKaryawanDestroy'])->name('admin.pelanggaran.destroy');

// SP
Route::get('/sp', [AdminController::class, 'sp'])->name('admin.sp');
Route::post('/sp', [AdminController::class, 'spStore'])->name('admin.sp.store');
Route::delete('/sp/{id}', [AdminController::class, 'spDestroy'])->name('admin.sp.destroy');

require __DIR__ . '/settings.php';