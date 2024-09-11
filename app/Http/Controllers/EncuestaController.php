<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEncuestaRequest;
use App\Http\Requests\UpdateEncuestaRequest;
use Illuminate\Contracts\Database\Eloquent\Builder;
use App\Models\Encuesta;
use App\Models\Pregunta;
use App\Models\TipoPregunta;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class EncuestaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->query('query');
        $user = Auth::user();
        $encuestas = Encuesta::with('participantes', 'preguntas')
                        ->where('created_by', $user->getAuthIdentifier())
                        ->where('title', 'like', '%'.$query.'%')
                        ->paginate(6);


        return Inertia::render('Encuesta/List', compact(
            'encuestas', 'query'
        ));
    }

    public function wizard(Request $request, Encuesta $encuesta) {
        $encuesta->load('preguntas.respuestas');
        return Inertia::render('Wizard/Index', [
            'encuesta' => $encuesta
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Encuesta::class);
        return Inertia::render('Encuesta/NuevaEncuesta', array(

        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEncuestaRequest $request)
    {
        Gate::authorize('create', Encuesta::class);
        $encuesta = Encuesta::create([...$request->validated(), 'created_by' => $request->user()->id]);

        return redirect()->route('encuesta.show', $encuesta->id)->with('message', 'Encuesta creada...');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Encuesta $encuestum)
    {
        Gate::authorize('view', [Encuesta::class, $encuestum]);
        $tipos_pregunta = TipoPregunta::all();
        $encuestum->load(['participantes' => function(Builder $query) {
            $query->distinct();
        }]);

        $preguntas = Pregunta::where('encuesta_id', $encuestum->id)->paginate(5);

        return Inertia::render('Encuesta/Detail', array(
            'encuesta' => $encuestum,
            'tipos_pregunta' => $tipos_pregunta,
            'preguntas' => $preguntas,
            'auth' => [
                'user' => $request->user(),
                'permissions' => [
                    'encuesta' => [
                        'update' => $request->user()->can('update', [Encuesta::class, $encuestum]),
                        'delete' => $request->user()->can('delete', [Encuesta::class, $encuestum])
                    ]
                ]
            ]
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Encuesta $encuestum)
    {
        Gate::authorize('update', [Encuesta::class, $encuestum]);
        $authUser = Auth::user();
        if($authUser->getAuthIdentifier() !== $encuestum->created_by) {
            return redirect()->back()->with('message', 'No tiene permitido eliminar esta encuesta.');
        }

        return Inertia::render('Encuesta/Edit', array(
            'encuesta' => $encuestum
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEncuestaRequest $request, Encuesta $encuestum)
    {
        Gate::authorize('update', [Encuesta::class, $encuestum]);
        $encuestum->update($request->validated());

        return redirect()->to(route('encuesta.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Encuesta $encuestum)
    {
        //Eliminar la encuesta solo si el usuario es el creador de la misma o es administrador del sistema
        $authUser = Auth::user();
        if($authUser->getAuthIdentifier() !== $encuestum->created_by) {
            return redirect()->back()->with('message', 'No tiene permitido eliminar esta encuesta.');
        }

        $encuestum->delete();

        return redirect()->back()->with('message', 'Encuesta eliminada');
    }

}
