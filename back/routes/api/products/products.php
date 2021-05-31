<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'products', 'middleware' => 'auth'], function () {
    $controller = "ProductsController";
    Route::post('create', "$controller@create");
    Route::get('list', "$controller@list");
    Route::put('update', "$controller@update");
    Route::delete('{id}/delete', "$controller@delete");
});
