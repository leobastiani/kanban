<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CardController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->name('login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::controller(CardController::class)->group(function () {
    Route::get('cards', 'index');
    Route::post('cards', 'store');
    Route::put('cards/{id}', 'update');
    Route::delete('cards/{id}', 'destroy');
});
