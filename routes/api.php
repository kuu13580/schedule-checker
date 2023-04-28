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

Route::get('events', 'App\Http\Controllers\EventsController@index');
Route::get('events/{id}', 'App\Http\Controllers\EventsController@getEventById');


Route::get('users', 'App\Http\Controllers\UsersController@index');