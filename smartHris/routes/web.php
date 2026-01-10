<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\AdminController;

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

require __DIR__.'/settings.php';

Route::prefix('admin')->group(function () {

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

});


