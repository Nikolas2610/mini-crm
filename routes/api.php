<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    // Get user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // Clients APIs
    Route::resource('client', ClientController::class);
    Route::get('client/{client}/transactions', [ClientController::class, 'transactions']);
    Route::get('clients', [ClientController::class, 'getAllClients']);
    // Transactions APIs
    Route::resource('transaction', TransactionController::class);
    // Logout User
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Login user
Route::post('/login', [AuthController::class, 'login']);