<?php

namespace App\Services;

use App\Models\Encuesta;

class EncuestaServices {
    public function obtenerParticipantes(Encuesta $encuesta) {
        $preguntas = $encuesta->preguntas();


    }
}
