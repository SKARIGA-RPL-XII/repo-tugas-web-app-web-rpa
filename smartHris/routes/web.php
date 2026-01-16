<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware('guest.redirect')->name('home');
Route::fallback(function () {
    return redirect()->back();
});
Route::post('/login', [AuthController::class, 'store'])->name('login.store');
Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

Route::middleware(['auth'])->group(function () {

    Route::middleware(['role:admin'])->group(function () {

        Route::get('/app/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');;

        //KARYAWAN
        Route::get('/app/karyawan', [AdminController::class, 'indexKaryawan'])->name('admin.karyawan');
        Route::post('/app/karyawan', [AdminController::class, 'storeKaryawan'])->name('admin.karyawan.store');
        Route::put('/app/karyawan/{id}', [AdminController::class, 'updateKaryawan'])->name('admin.karyawan.update');
        Route::put('/app/karyawan/{id}/reset-password', [AdminController::class, 'resetPassword'])->name('admin.karyawan.reset-password');
        Route::delete('/app/karyawan/{id}', [AdminController::class, 'destroyKaryawan'])->name('admin.karyawan.destroy');

        // ABSENSI
        Route::get('/app/absensi', [AdminController::class, 'indexAbsensi'])->name('admin.absensi');
        Route::put('/app/absensi/{id}', [AdminController::class, 'updateAbsensi'])->name('admin.absensi.update');
        Route::delete('/app/absensi/{id}', [AdminController::class, 'destroyAbsensi'])->name('admin.absensi.destroy');

        // CUTI
        Route::get('/app/cuti', [AdminController::class, 'indexCuti'])->name('admin.cuti');
        Route::post('/app/cuti/{id}/approve', [AdminController::class, 'approveCuti'])->name('admin.cuti.approve');
        Route::post('/app/cuti/{id}/reject', [AdminController::class, 'rejectCuti'])->name('admin.cuti.reject');

        // KALENDER
        Route::get('/app/kalender', [AdminController::class, 'kalender'])->name('admin.kalender');
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
        Route::get('/app/pelanggaran', [AdminController::class, 'pKaryawan'])->name('admin.pelanggaran');
        Route::post('/app/pelanggaran', [AdminController::class, 'pKaryawanStore'])->name('admin.pelanggaran.store');
        Route::put('/app/pelanggaran/{id}', [AdminController::class, 'pKaryawanUpdate'])->name('admin.pelanggaran.update');
        Route::delete('/app/pelanggaran/{id}', [AdminController::class, 'pKaryawanDestroy'])->name('admin.pelanggaran.destroy');

        // SP
        Route::get('/sp', [AdminController::class, 'sp'])->name('admin.sp');
        Route::post('/sp', [AdminController::class, 'spStore'])->name('admin.sp.store');
        Route::delete('/sp/{id}', [AdminController::class, 'spDestroy'])->name('admin.sp.destroy');
    });

    Route::middleware(['role:user'])->group(function () {
        Route::get('/dashboard', [UserController::class, 'index'])->name('user.dashboard');

        Route::get('/absensi', [UserController::class, 'absensi']);
        Route::post('/absensi/masuk', [UserController::class, 'masukStore']);
        Route::post('/absensi/pulang', [UserController::class, 'pulangStore']);
        Route::get('/riwayat-absensi', [UserController::class, 'riwayat']);

        Route::get('/pelanggaran', [UserController::class, 'index']);
        Route::get('/cuti', [UserController::class, 'cuti']);
        Route::post('/cuti', [UserController::class, 'cutiStore']);
    });
});
require __DIR__ . '/settings.php';
