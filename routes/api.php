<?php

use App\Http\Controllers\HotelController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
});

Route::apiResource('hotel', HotelController::class);

Route::get('/tipo-habitaciones', [HotelController::class, 'getTipoHabitaciones']);
Route::get('/acomodaciones/{id}', [HotelController::class, 'getAcomodaciones']);
