<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth',], function () {
    $controller = "UserController";
    Route::get('test', "$controller@test");
    Route::post('register', "$controller@register");
    Route::post('login', "$controller@login");
    Route::post('authenticated-user', "$controller@getAuthenticatedUser");
});
