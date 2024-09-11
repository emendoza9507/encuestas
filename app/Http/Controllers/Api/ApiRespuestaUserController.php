<?php

namespace App\Http\Controllers\Api;

use App\Actions\Encuesta\CreateNewRespuestaUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRespuestaUserRequest;
use Illuminate\Http\Request;

class ApiRespuestaUserController extends Controller
{
    public function store(StoreRespuestaUserRequest $request, CreateNewRespuestaUser $action) {
        $respuesta = $action->handle($request);

        return response()->json($respuesta);
    }
}
