<?php

use App\Http\Controllers\EncuestaController;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\RespuestaController;
use App\Http\Controllers\RespuestaUserController;
use App\Http\Controllers\TipoPreguntaController;
use App\Http\Controllers\TipoPreguntasController;
use App\Http\Controllers\UserController;
use App\Models\RespuestaUser;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'throttle:global'
])->group(function () {
    Route::resource('encuesta', EncuestaController::class);
    Route::resource('tipo_pregunta', TipoPreguntaController::class);
    Route::resource('pregunta', PreguntaController::class);
    Route::resource('respuesta', RespuestaController::class);
    Route::resource('respuesta_user', RespuestaUserController::class)->only(['store', 'show']);
    Route::resource('usuario', UserController::class);
});
