<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| GUEST
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware('guest.redirect')->name('home');

/*
|--------------------------------------------------------------------------
| AUTH (JANGAN DI DALAM PREFIX ADMIN)
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'store'])->name('login.store');
Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

/*
|--------------------------------------------------------------------------
| AUTHENTICATED USER
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {

    // Dashboard umum
    Route::get('/dashboard', [MainController::class, 'index'])->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | ADMIN AREA
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')->middleware('role:admin')->group(function () {

        // DASHBOARD ADMIN
        Route::get('/dashboard', [MainController::class, 'index'])->name('admin.dashboard');

        // ===================== CUTI =====================
        Route::get('/cuti', [AdminController::class, 'indexCuti'])->name('admin.cuti');
        Route::post('/cuti/{id}/approve', [AdminController::class, 'approveCuti'])->name('admin.cuti.approve');
        Route::post('/cuti/{id}/reject', [AdminController::class, 'rejectCuti'])->name('admin.cuti.reject');

        // ===================== KARYAWAN =====================
        Route::get('/karyawan', [AdminController::class, 'indexKaryawan'])->name('admin.karyawan');
        Route::post('/karyawan', [AdminController::class, 'storeKaryawan'])->name('admin.karyawan.store');
        Route::put('/karyawan/{id}', [AdminController::class, 'updateKaryawan'])->name('admin.karyawan.update');
        Route::put('/karyawan/{id}/reset-password', [AdminController::class, 'resetPassword'])->name('admin.karyawan.reset-password');
        Route::delete('/karyawan/{id}', [AdminController::class, 'destroyKaryawan'])->name('admin.karyawan.destroy');

        // ===================== ABSENSI =====================
        Route::get('/absensi', [AdminController::class, 'indexAbsensi'])->name('admin.absensi');
        Route::put('/absensi/{id}', [AdminController::class, 'updateAbsensi'])->name('admin.absensi.update');
        Route::delete('/absensi/{id}', [AdminController::class, 'destroyAbsensi'])->name('admin.absensi.destroy');

        // ===================== KALENDER =====================
        Route::get('/kalender', [AdminController::class, 'kalender'])->name('admin.kalender');
        Route::get('/kalender-event', [AdminController::class, 'event'])->name('admin.event');
        Route::post('/kalender-event', [AdminController::class, 'eventStore'])->name('admin.event.store');
        Route::put('/kalender-event/{id}', [AdminController::class, 'eventUpdate'])->name('admin.event.update');
        Route::delete('/kalender-event/{id}', [AdminController::class, 'eventDestroy'])->name('admin.event.destroy');

        // ===================== PELANGGARAN =====================
        Route::get('/pelanggaran', [AdminController::class, 'pKaryawan'])->name('admin.pelanggaran');
        Route::post('/pelanggaran', [AdminController::class, 'pKaryawanStore'])->name('admin.pelanggaran.store');
        Route::put('/pelanggaran/{id}', [AdminController::class, 'pKaryawanUpdate'])->name('admin.pelanggaran.update');
        Route::delete('/pelanggaran/{id}', [AdminController::class, 'pKaryawanDestroy'])->name('admin.pelanggaran.destroy');

        // ===================== SP =====================
        Route::get('/sp', [AdminController::class, 'sp'])->name('admin.sp');
        Route::post('/sp', [AdminController::class, 'spStore'])->name('admin.sp.store');
        Route::delete('/sp/{id}', [AdminController::class, 'spDestroy'])->name('admin.sp.destroy');
    });

    /*
    |--------------------------------------------------------------------------
    | USER AREA
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:user')->group(function () {

        Route::get('/absensi', [UserController::class, 'absensi'])->name('user.absensi');
        Route::post('/absensi/masuk', [UserController::class, 'masukStore'])->name('user.absensi.masuk');
        Route::post('/absensi/pulang', [UserController::class, 'pulangStore'])->name('user.absensi.pulang');
        Route::get('/riwayat-absensi', [UserController::class, 'riwayat'])->name('user.riwayat-absensi');

        Route::get('/cuti', [UserController::class, 'cuti'])->name('user.cuti');
        Route::post('/cuti', [UserController::class, 'cutiStore'])->name('user.cuti.store');

        Route::get('/pelanggaran', [UserController::class, 'index'])->name('user.pelanggaran');
    });
});

/*
|--------------------------------------------------------------------------
| FALLBACK
|--------------------------------------------------------------------------
*/
Route::fallback(function () {
    return redirect()->back();
});

require __DIR__ . '/settings.php';
