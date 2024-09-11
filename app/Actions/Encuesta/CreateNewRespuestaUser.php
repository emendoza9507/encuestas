<?php

namespace App\Actions\Encuesta;

use App\Http\Requests\StoreRespuestaUserRequest;
use App\Models\RespuestaUser;
use Illuminate\Http\Request;

class CreateNewRespuestaUser
{
    public function handle(StoreRespuestaUserRequest $request)
    {
        $pregunta_id = $request->get('pregunta_id');
        $respuestaAnterior = RespuestaUser::where('pregunta_id', $pregunta_id)
            ->where('user_id', $request->user_id)->first();


        if ($respuestaAnterior) {
            $respuestaAnterior->update($request->validated());
            return $respuestaAnterior;
        } else {
            return RespuestaUser::create($request->validated());
        }
    }
}
