<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::get('/kalender', [AdminController::class, 'kalender'])->name('admin.kalender');
Route::get('/kalender-event', [AdminController::class, 'event'])->name('admin.event');
Route::post('/kalender-event', [AdminController::class, 'eventStore'])->name('admin.event.store');
Route::put('/kalender-event/{id}', [AdminController::class, 'eventUpdate'])->name('admin.event.update');
Route::delete('/kalender-event/{id}', [AdminController::class, 'eventDestroy'])->name('admin.event.destroy');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';