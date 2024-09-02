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
use Inertia\Inertia;

class EncuestaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $encuestas = $user->encuestas->load('participantes', 'preguntas');
        return Inertia::render('Encuesta/List', compact(
            'encuestas'
        ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Encuesta/NuevaEncuesta', array(

        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEncuestaRequest $request)
    {
        $encuesta = Encuesta::create([...$request->validated(), 'created_by' => $request->user()->id]);

        return redirect()->route('encuesta.show', $encuesta->id)->with('message', 'Encuesta creada...');
    }

    /**
     * Display the specified resource.
     */
    public function show(Encuesta $encuestum)
    {
        $tipos_pregunta = TipoPregunta::all();
        $encuestum->load(['participantes' => function(Builder $query) {
            $query->distinct();
        }]);

        $preguntas = Pregunta::where('encuesta_id', $encuestum->id)->paginate(5);

        return Inertia::render('Encuesta/Detail', array(
            'encuesta' => $encuestum,
            'tipos_pregunta' => $tipos_pregunta,
            'preguntas' => $preguntas
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Encuesta $encuestum)
    {

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
