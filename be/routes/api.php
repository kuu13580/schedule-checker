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
Route::post('events/{id}/{hash}/authenticate', [EventsController::class, 'authenticate']);
Route::post('messages/{id}/{hash}', [EventsController::class, 'getUserMessagesByEventId']);

Route::get('users/{event_id}/{hash}', [UsersController::class, 'getUsersByEventId']);
Route::post('users/{event_id}/{hash}/create', [UsersController::class, 'createUser']);
Route::post('users/{user_id}/{hash}/authenticate', [UsersController::class, 'authenticate']);
Route::post('users/{user_id}/{hash}/delete', [UsersController::class, 'deleteUser']);

Route::post('schedules/{user_id}/{hash}', [SchedulesController::class, 'getSchedulesByUserId']);
Route::post('schedules/{user_id}/{hash}/update', [SchedulesController::class, 'updateSchedulesByUserId']);
Route::post('schedules/all/{event_id}/{hash}', [SchedulesController::class, 'getSchedulesByEventId']);
