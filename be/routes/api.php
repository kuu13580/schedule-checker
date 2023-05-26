<?php

use Illuminate\Http\Request;
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

use App\Http\Controllers\EventsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\SchedulesController;

Route::get('events/{id}/{hash}', [EventsController::class, 'getEventById']);
Route::post('events/create', [EventsController::class, 'createEvent']);

Route::get('users/{event_id}', [UsersController::class, 'getUsersByEventId']);

Route::get('schedules/{user_id}', [SchedulesController::class, 'getSchedulesByUserId']);