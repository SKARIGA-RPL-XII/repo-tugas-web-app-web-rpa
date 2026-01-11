<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;

Route::get('/', fn () => Inertia::render('dashboard'))->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

Route::prefix('admin')->group(function () {

    Route::get('/karyawan', [AdminController::class, 'indexKaryawan'])
        ->name('admin.karyawan.index');
    Route::post('/karyawan', [AdminController::class, 'storeKaryawan'])
        ->name('admin.karyawan.store');
    Route::put('/karyawan/{id}', [AdminController::class, 'updateKaryawan'])
        ->name('admin.karyawan.update');
    Route::delete('/karyawan/{id}', [AdminController::class, 'destroyKaryawan'])
        ->name('admin.karyawan.destroy');

    Route::get('/absensi', [AdminController::class, 'indexAbsensi'])
        ->name('admin.absensi.index');
    Route::put('/absensi/{id}', [AdminController::class, 'updateAbsensi'])
        ->name('admin.absensi.update');
    Route::delete('/absensi/{id}', [AdminController::class, 'destroyAbsensi'])
        ->name('admin.absensi.destroy');

    Route::get('/cuti', [AdminController::class, 'indexCuti'])
        ->name('admin.cuti.index');
    Route::post('/cuti/{id}/approve', [AdminController::class, 'approveCuti'])
        ->name('admin.cuti.approve');
    Route::post('/cuti/{id}/reject', [AdminController::class, 'rejectCuti'])
        ->name('admin.cuti.reject');

    Route::get('/kalender', [AdminController::class, 'kalender'])
        ->name('admin.kalender');
    Route::get('/kalender-event', [AdminController::class, 'event'])
        ->name('admin.event.index');
    Route::post('/kalender-event', [AdminController::class, 'eventStore'])
        ->name('admin.event.store');
    Route::put('/kalender-event/{id}', [AdminController::class, 'eventUpdate'])
        ->name('admin.event.update');
    Route::delete('/kalender-event/{id}', [AdminController::class, 'eventDestroy'])
        ->name('admin.event.destroy');

    Route::get('/pelanggaran', [AdminController::class, 'pKaryawan'])
        ->name('admin.pelanggaran.index');
    Route::post('/pelanggaran', [AdminController::class, 'pKaryawanStore'])
        ->name('admin.pelanggaran.store');
    Route::put('/pelanggaran/{id}', [AdminController::class, 'pKaryawanUpdate'])
        ->name('admin.pelanggaran.update');
    Route::delete('/pelanggaran/{id}', [AdminController::class, 'pKaryawanDestroy'])
        ->name('admin.pelanggaran.destroy');
});


require __DIR__ . '/settings.php';
