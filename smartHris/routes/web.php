<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => redirect()->route('dashboard'))->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::prefix('user')->name('user.')->controller(UserController::class)->group(function () {
    // Absensi
    Route::get('/absensi', 'riwayat')->name('absensi');
    Route::post('/absensi', 'store')->name('absensi.store');

    // Cuti
    Route::get('/cuti', 'indexCuti')->name('cuti');
    Route::post('/cuti', 'storeCuti')->name('cuti.store');

    // Menu Lain
    Route::get('/kalender', 'indexKalender')->name('kalender');
    Route::get('/pelanggaran', 'indexPelanggaran')->name('pelanggaran');
});

Route::prefix('admin')->name('admin.')->controller(AdminController::class)->group(function () {
        
    // Karyawan
    Route::get('/karyawan', 'indexKaryawan')->name('karyawan');
    Route::post('/karyawan', 'storeKaryawan')->name('karyawan.store');
    Route::put('/karyawan/{id}', 'updateKaryawan')->name('karyawan.update');
    Route::delete('/karyawan/{id}', 'destroyKaryawan')->name('karyawan.destroy');

    // Absensi
    Route::get('/absensi', 'indexAbsensi')->name('absensi');
    Route::put('/absensi/{id}', 'updateAbsensi')->name('absensi.update');
    Route::delete('/absensi/{id}', 'destroyAbsensi')->name('absensi.destroy');

    // Cuti
    Route::get('/cuti', 'indexCuti')->name('cuti');
    Route::post('/cuti/{id}/approve', 'approveCuti')->name('cuti.approve');
    Route::post('/cuti/{id}/reject', 'rejectCuti')->name('cuti.reject');

    // Kalender & Event
    Route::get('/kalender', 'kalender')->name('kalender');
    Route::get('/kalender-event', 'event')->name('kalender.event');
    Route::post('/kalender-event', 'eventStore')->name('kalender.event.store');
    Route::put('/kalender-event/{id}', 'eventUpdate')->name('kalender.event.update');
    Route::delete('/kalender-event/{id}', 'eventDestroy')->name('kalender.event.destroy');

    // Jenis Pelanggaran
    Route::get('/jenis-pelanggaran', 'jPelanggaran')->name('jenis-pelanggaran');
    Route::post('/jenis-pelanggaran', 'jPelanggaranStore')->name('jenis-pelanggaran.store');
    Route::put('/jenis-pelanggaran/{id}', 'jPelanggaranUpdate')->name('jenis-pelanggaran.update');
    Route::delete('/jenis-pelanggaran/{id}', 'jPelanggaranDestroy')->name('jenis-pelanggaran.destroy');

    // Pelanggaran User
    Route::get('/pelanggaran', 'pKaryawan')->name('pelanggaran');
    Route::post('/pelanggaran', 'pKaryawanStore')->name('pelanggaran.store');
    Route::put('/pelanggaran/{id}', 'pKaryawanUpdate')->name('pelanggaran.update');
    Route::delete('/pelanggaran/{id}', 'pKaryawanDestroy')->name('pelanggaran.destroy');

    // SP
    Route::get('/sp', 'sp')->name('sp');
    Route::post('/sp', 'spStore')->name('sp.store');
    Route::delete('/sp/{id}', 'spDestroy')->name('sp.destroy');
});