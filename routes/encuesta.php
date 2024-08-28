<?php

use App\Http\Controllers\EncuestaController;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\TipoPreguntaController;
use App\Http\Controllers\TipoPreguntasController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::resource('encuesta', EncuestaController::class);
    Route::resource('tipo_pregunta', TipoPreguntaController::class);
    Route::resource('pregunta', PreguntaController::class);

});
