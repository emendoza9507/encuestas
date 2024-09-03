<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RespuestaUser extends Pivot
{
    protected $guarded = [];

    public function respuesta()
    {
        return $this->belongsTo(Respuesta::class);
    }

    public function pregunta()
    {
        return $this->belongsTo(Pregunta::class);
    }

    public function encuesta() {
        return $this->belongsTo(Encuesta::class);
    }
}
