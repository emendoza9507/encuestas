<?php

use App\Actions\Encuesta\CreateNewRespuestaUser;
use App\Http\Controllers\Api\ApiPreguntaController;
use App\Http\Controllers\Api\ApiRespuestaUserController;
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
    Route::post('/respuesta_user', [ApiRespuestaUserController::class, 'store'])->name('api.create_respuesta_usuario');
});
