<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEncuestaRequest;
use App\Http\Requests\UpdateencuestasRequest;
use App\Models\Encuesta;
use App\Models\TipoPregunta;
use Inertia\Inertia;

class EncuestaController extends Controller
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
        $encuestum->load('preguntas');

        return Inertia::render('Encuesta/Detail', array(
            'encuesta' => $encuestum,
            'tipos_pregunta' => $tipos_pregunta
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Encuesta $encuestas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateencuestasRequest $request, Encuesta $encuestas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Encuesta $encuestas)
    {
        //
    }
}
