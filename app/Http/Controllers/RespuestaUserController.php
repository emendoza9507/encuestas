<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRespuestaRequest;
use App\Http\Requests\StoreRespuestaUserRequest;
use App\Http\Requests\UpdateRespuestaRequest;
use App\Models\Respuesta;
use App\Models\RespuestaUser;
use Inertia\Inertia;

class RespuestaUserController extends Controller
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
    public function store(StoreRespuestaUserRequest $request)
    {
        $pregunta_id = $request->get('pregunta_id');
        $respuestaAnterior = RespuestaUser::where('pregunta_id',$pregunta_id)
            ->where('user_id', $request->user_id)->first();


        if($respuestaAnterior) {
            $respuestaAnterior->update($request->validated());
        } else {
            RespuestaUser::create($request->validated());
        }


        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Respuesta $respuestum)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Respuesta $respuestum)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRespuestaRequest $request, Respuesta $respuestum)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Respuesta $respuestum)
    {
        //
        $respuestum->delete();
        return redirect()->back();
    }
}
