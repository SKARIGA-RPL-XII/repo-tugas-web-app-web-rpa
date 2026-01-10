<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('dashboard'); 
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('admin/karyawan', function () {
        return Inertia::render('admin/data-karyawan');
    })->name('karyawan');

require __DIR__.'/settings.php';