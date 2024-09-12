<?php

use App\Models\Encuesta;
use App\Models\RespuestaUser;
use App\Models\User;
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
        ->paginate(12);

        return Inertia::render('Dashboard', [
            'encuestas' => $encuestas
        ]);
    })->name('dashboard');

    Route::get('/control-panel', function () {
        $encuestas = Encuesta::with(['participantes' => function(Builder $query) {
            $query->distinct();
        },'preguntas' => ['participantes'], 'creador'])
        ->orderBy('id', 'desc')
        ->paginate(5);

        $users = User::with(['roles.permissions', 'permissions'],)->paginate(5, ['*'], 'pageUsers');
        $participaciones = RespuestaUser::query()->select('encuesta_id', 'user_id')->distinct()->get();

        return Inertia::render('PanelControl/Index', compact(
            'encuestas', 'users', 'participaciones'
        ));
    })->name('control-panel');
});


include "encuesta.php";
