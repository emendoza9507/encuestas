<?php

use App\Http\Controllers\Api\ApiPreguntaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'throttle:api'
])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::name('api')->apiResource('pregunta', ApiPreguntaController::class)->only(['show', 'index']);
});
