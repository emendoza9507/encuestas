<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePreguntaRequest;
use App\Http\Requests\UpdatePreguntaRequest;
use App\Models\Pregunta;
use App\Models\Respuesta;
use App\Models\RespuestaUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PreguntaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePreguntaRequest $request)
    {
        $pregunta  = Pregunta::create($request->validated());
        return redirect()->to(route('encuesta.show', ['encuestum' => $pregunta->encuesta_id]))->with('pregunta', $pregunta);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Pregunta $preguntum)
    {
        //
        $preguntum->load(['encuesta', 'respuestas']);
        $respuesta_user = RespuestaUser::where(['pregunta_id' => $preguntum->id, 'user_id' => Auth::user()->getAuthIdentifier()])
            ->with('respuesta', 'pregunta')->first();

        return Inertia::render('Pregunta/ShowPregunta', array(
            'pregunta' => $preguntum,
            'respuesta_user' => $respuesta_user
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pregunta $Pregunta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePreguntaRequest $request, Pregunta $Pregunta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pregunta $Pregunta)
    {
        //
    }
}
