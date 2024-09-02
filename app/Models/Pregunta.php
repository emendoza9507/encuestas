<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Pregunta extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

    public function encuesta() {
        return $this->belongsTo(Encuesta::class);
    }

    public function respuestas() {
        return $this->hasMany(Respuesta::class);
    }

    public function participantes() : HasManyThrough
    {
        return $this->hasManyThrough(RespuestaUser::class, Respuesta::class);
    }
}
