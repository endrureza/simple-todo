<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index');
Route::post('/', 'HomeController@store');
Route::get('/code', 'HomeController@showCode');
Route::delete('/{todoId}', 'HomeController@destroy');
Route::post('/mass_destroy', 'HomeController@massDestroy');
