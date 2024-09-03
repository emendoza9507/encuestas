<?php

use App\Models\Encuesta;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'throttle:global'
])->group(function () {

    Route::get('/', function (Request $request) {
        $query = $request->query('query', '');

        $encuestas = Encuesta::with(['participantes' => function(Builder $query) {
            $query->distinct();
        },'preguntas' => ['participantes'], 'creador'])
        ->where('title', 'like', '%'.$query.'%')
        ->where('active', true)
        ->orderBy('id', 'desc')
        ->paginate(6);

        return Inertia::render('Dashboard', [
            'encuestas' => $encuestas
        ]);
    })->name('dashboard');
});


include "encuesta.php";
