<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('User/index'))->name('home');
    
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

Route::prefix('user')->group(function () {
    Route::get('/absensi', [UserController::class, 'riwayat']);
    Route::post('/absensi', [UserController::class, 'store']);

    Route::get('/kalender', [UserController::class, 'index']);
    Route::get('/pelanggaran', [UserController::class, 'index']);
    Route::get('/cuti', [UserController::class, 'index']);
    Route::post('/cuti', [UserController::class, 'store']);
});

Route::prefix('admin')->group(function () {

    // DASHBOARD
    Route::get('/dashboard', [AdminController::class, 'index'])
        ->name('admin.dashboard');

    // KARYAWAN
    Route::get('/karyawan', [AdminController::class, 'indexKaryawan'])
        ->name('admin.karyawan');
    Route::post('/karyawan', [AdminController::class, 'storeKaryawan']);
    Route::put('/karyawan/{id}', [AdminController::class, 'updateKaryawan']);
    Route::delete('/karyawan/{id}', [AdminController::class, 'destroyKaryawan']);

    // ABSENSI
    Route::get('/absensi', [AdminController::class, 'indexAbsensi'])
        ->name('admin.absensi');
    Route::put('/absensi/{id}', [AdminController::class, 'updateAbsensi']);
    Route::delete('/absensi/{id}', [AdminController::class, 'destroyAbsensi']);

    // CUTI
    Route::get('/cuti', [AdminController::class, 'indexCuti']);
    Route::post('/cuti/{id}/approve', [AdminController::class, 'approveCuti']);
    Route::post('/cuti/{id}/reject', [AdminController::class, 'rejectCuti']);

    // KALENDER
    Route::get('/kalender', [AdminController::class, 'kalender']);
    Route::get('/kalender-event', [AdminController::class, 'event']);
    Route::post('/kalender-event', [AdminController::class, 'eventStore']);
    Route::put('/kalender-event/{id}', [AdminController::class, 'eventUpdate']);
    Route::delete('/kalender-event/{id}', [AdminController::class, 'eventDestroy']);

    // PELANGGARAN
    Route::get('/jenis-pelanggaran', [AdminController::class, 'jPelanggaran']);
    Route::post('/jenis-pelanggaran', [AdminController::class, 'jPelanggaranStore']);
    Route::put('/jenis-pelanggaran/{id}', [AdminController::class, 'jPelanggaranUpdate']);
    Route::delete('/jenis-pelanggaran/{id}', [AdminController::class, 'jPelanggaranDestroy']);

    Route::get('/pelanggaran', [AdminController::class, 'pKaryawan']);
    Route::post('/pelanggaran', [AdminController::class, 'pKaryawanStore']);
    Route::put('/pelanggaran/{id}', [AdminController::class, 'pKaryawanUpdate']);
    Route::delete('/pelanggaran/{id}', [AdminController::class, 'pKaryawanDestroy']);

    // SP
    Route::get('/sp', [AdminController::class, 'sp']);
    Route::post('/sp', [AdminController::class, 'spStore']);
    Route::delete('/sp/{id}', [AdminController::class, 'spDestroy']);
});
