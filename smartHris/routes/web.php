<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware('guest.redirect')->name('home');

Route::post('/login', [AuthController::class, 'store'])->name('login.store');
Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

Route::fallback(function () {
    return redirect()->back();
});

Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', [MainController::class, 'index'])->name('dashboard');

    // --- ADMIN ROUTES ---
    Route::middleware(['role:admin'])->group(function () {

        // ===================== KARYAWAN =====================
        Route::get('/karyawan', [AdminController::class, 'indexKaryawan'])->name('admin.karyawan');
        Route::post('/karyawan', [AdminController::class, 'storeKaryawan'])->name('admin.karyawan.store');
        Route::put('/karyawan/{id}', [AdminController::class, 'updateKaryawan'])->name('admin.karyawan.update');
        Route::put('/karyawan/{id}/reset-password', [AdminController::class, 'resetPassword'])->name('admin.karyawan.reset-password');
        Route::delete('/karyawan/{id}', [AdminController::class, 'destroyKaryawan'])->name('admin.karyawan.destroy');

        // KARYAWAN
        Route::controller(AdminController::class)->group(function() {
            Route::get('/app/karyawan', 'indexKaryawan')->name('admin.karyawan');
            Route::post('/app/karyawan', 'storeKaryawan')->name('admin.karyawan.store');
            Route::put('/app/karyawan/{id}', 'updateKaryawan')->name('admin.karyawan.update');
            Route::put('/app/karyawan/{id}/reset-password', 'resetPassword')->name('admin.karyawan.reset-password');
            Route::delete('/app/karyawan/{id}', 'destroyKaryawan')->name('admin.karyawan.destroy');

            // ABSENSI (ADMIN VIEW)
            Route::get('/app/absensi', 'indexAbsensi')->name('admin.absensi');
            Route::put('/app/absensi/{id}', 'updateAbsensi')->name('admin.absensi.update');
            Route::delete('/app/absensi/{id}', 'destroyAbsensi')->name('admin.absensi.destroy');

            // CUTI (ADMIN VIEW)
            Route::get('/app/cuti', 'indexCuti')->name('admin.cuti');
            Route::post('/app/cuti/{id}/approve', 'approveCuti')->name('admin.cuti.approve');
            Route::post('/app/cuti/{id}/reject', 'rejectCuti')->name('admin.cuti.reject');

            // KALENDER & EVENT
            Route::get('/app/kalender', 'kalender')->name('admin.kalender');
            Route::get('/kalender-event', 'event')->name('admin.event');
            Route::post('/kalender-event', 'eventStore')->name('admin.event.store');
            Route::put('/kalender-event/{id}', 'eventUpdate')->name('admin.event.update');
            Route::delete('/kalender-event/{id}', 'eventDestroy')->name('admin.event.destroy');

            // JENIS PELANGGARAN
            Route::get('/jenis-pelanggaran', 'jPelanggaran')->name('jenis-pelanggaran');
            Route::post('/jenis-pelanggaran', 'jPelanggaranStore')->name('jenis-pelanggaran.store');
            Route::put('/jenis-pelanggaran/{id}', 'jPelanggaranUpdate')->name('jenis-pelanggaran.update');
            Route::delete('/jenis-pelanggaran/{id}', 'jPelanggaranDestroy')->name('jenis-pelanggaran.destroy');

            // PELANGGARAN KARYAWAN
            Route::get('/app/pelanggaran', 'pKaryawan')->name('admin.pelanggaran');
            Route::post('/app/pelanggaran', 'pKaryawanStore')->name('admin.pelanggaran.store');
            Route::put('/app/pelanggaran/{id}', 'pKaryawanUpdate')->name('admin.pelanggaran.update');
            Route::delete('/app/pelanggaran/{id}', 'pKaryawanDestroy')->name('admin.pelanggaran.destroy');

            // SURAT PERINGATAN (SP)
            Route::get('/sp', 'sp')->name('admin.sp');
            Route::post('/sp', 'spStore')->name('admin.sp.store');
            Route::delete('/sp/{id}', 'spDestroy')->name('admin.sp.destroy');
        });
    });

    // --- USER ROUTES ---
    Route::middleware(['role:user'])->group(function () {
        Route::controller(UserController::class)->group(function() {
            // Absensi User
            Route::get('/absensi', 'absensi')->name('user.absensi');
            Route::post('/absensi/masuk', 'masukStore')->name('user.absensi.masuk');
            Route::post('/absensi/pulang', 'pulangStore')->name('user.absensi.pulang');
            Route::get('/riwayat-absensi', 'riwayat')->name('user.riwayat-absensi');

            // Fitur User Lainnya
            Route::get('/pelanggaran', 'index')->name('user.pelanggaran');
            Route::get('/cuti', 'cuti')->name('user.cuti');
            Route::post('/cuti', 'cutiStore')->name('user.cuti.store');
        });
    });
});

require __DIR__ . '/settings.php';