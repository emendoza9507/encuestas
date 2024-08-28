<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
