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
Route::middleware(['auth', 'role:user'])->prefix('karyawan')->group(function () {

    Route::post('/absensi', [AbsensiController::class, 'store']);
    Route::get('/absensi/riwayat', [AbsensiController::class, 'riwayat']);

    Route::get('/kalender', [KalenderController::class, 'index']);

    Route::get('/pelanggaran', [PelanggaranController::class, 'index']);

    Route::post('/cuti', [CutiController::class, 'store']);
    Route::get('/cuti', [CutiController::class, 'index']);

});


Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', [MainController::class, 'index'])->name('dashboard');

    // --- ADMIN ROUTES ---
    Route::middleware(['role:admin'])->group(function () {

        Route::controller(AdminController::class)->group(function () {
            Route::get('/app/karyawan', 'indexKaryawan')->name('admin.karyawan');
            Route::post('/app/karyawan', 'storeKaryawan')->name('admin.karyawan.store');
            Route::post('/app/karyawan/{id}', 'updateKaryawan')->name('admin.karyawan.update');
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
            Route::get('/app/pelanggaran/history/{karyawanId}', 'pKaryawanHistory')->name('admin.pelanggaran.history');

            // SURAT PERINGATAN (SP)
            Route::get('/sp', 'sp')->name('admin.sp');
            Route::post('/sp', 'spStore')->name('admin.sp.store');
            Route::delete('/sp/{id}', 'spDestroy')->name('admin.sp.destroy');
        });
    });

    // --- USER ROUTES ---
    Route::middleware(['role:user'])->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('/absensi', 'absensi')->name('user.absensi');
            Route::post('/absensi/masuk', 'masukStore')->name('user.absensi.masuk');
            Route::post('/absensi/pulang', 'pulangStore')->name('user.absensi.pulang');
            Route::get('/absensi/riwayat', 'riwayat')->name('user.absensi.riwayat');
            Route::get('/pelanggaran', 'pelanggaran')->name('user.pelanggaran');
            Route::get('/cuti', 'cuti')->name('user.cuti');
            Route::post('/cuti', 'cutiStore')->name('user.cuti.store');
            Route::post('/profilUpdate', 'profileUpdate')->name('user.profil.update');
        });
    });
});

require __DIR__ . '/settings.php';