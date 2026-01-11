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

Route::prefix('admin')->group(function () {

    Route::get('/karyawan', [AdminController::class, 'indexKaryawan']);
    Route::post('/karyawan', [AdminController::class, 'storeKaryawan']);
    Route::put('/karyawan/{id}', [AdminController::class, 'updateKaryawan']);
    Route::delete('/karyawan/{id}', [AdminController::class, 'destroyKaryawan']);

    Route::get('/absensi', [AdminController::class, 'indexAbsensi']);
    Route::put('/absensi/{id}', [AdminController::class, 'updateAbsensi']);
    Route::delete('/absensi/{id}', [AdminController::class, 'destroyAbsensi']);

    Route::get('/cuti', [AdminController::class, 'indexCuti']);
    Route::post('/cuti/{id}/approve', [AdminController::class, 'approveCuti']);
    Route::post('/cuti/{id}/reject', [AdminController::class, 'rejectCuti']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// KARYAWAN
Route::get('/karyawan', [AdminController::class, 'indexKaryawan']);
Route::post('/karyawan', [AdminController::class, 'storeKaryawan']);
Route::put('/karyawan/{id}', [AdminController::class, 'updateKaryawan']);
Route::delete('/karyawan/{id}', [AdminController::class, 'destroyKaryawan']);

// ABSENSI
Route::get('/absensi', [AdminController::class, 'indexAbsensi']);
Route::put('/absensi/{id}', [AdminController::class, 'updateAbsensi']);
Route::delete('/absensi/{id}', [AdminController::class, 'destroyAbsensi']);

// CUTI
Route::get('/cuti', [AdminController::class, 'indexCuti']);
Route::post('/cuti/{id}/approve', [AdminController::class, 'approveCuti']);
Route::post('/cuti/{id}/reject', [AdminController::class, 'rejectCuti']);

// KALENDER
Route::get('/kalender', [AdminController::class, 'kalender'])->name('admin.kalender');
Route::get('/kalender-event', [AdminController::class, 'event'])->name('admin.event');
Route::post('/kalender-event', [AdminController::class, 'eventStore'])->name('admin.event.store');
Route::put('/kalender-event/{id}', [AdminController::class, 'eventUpdate'])->name('admin.event.update');
Route::delete('/kalender-event/{id}', [AdminController::class, 'eventDestroy'])->name('admin.event.destroy');

// PELANGGARAN
Route::get('/pelanggaran', [AdminController::class, 'pKaryawan'])->name('admin.pelanggaran');
Route::post('/pelanggaran', [AdminController::class, 'pKaryawanStore'])->name('admin.pelanggaran.store');
Route::put('/pelanggaran/{id}', [AdminController::class, 'pKaryawanUpdate'])->name('admin.pelanggaran.update');
Route::delete('/pelanggaran/{id}', [AdminController::class, 'pKaryawanDestroy'])->name('admin.pelanggaran.destroy');

require __DIR__ . '/settings.php';
});