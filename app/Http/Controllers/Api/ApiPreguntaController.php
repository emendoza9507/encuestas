<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePreguntaRequest;
use App\Http\Requests\UpdatePreguntaRequest;
use App\Models\Pregunta;
use App\Models\Respuesta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApiPreguntaController extends Controller
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

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Pregunta $preguntum)
    {
        //
        $preguntum->load(['encuesta', 'respuestas']);

        return response()->json(['pregunta' => $preguntum]);

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
