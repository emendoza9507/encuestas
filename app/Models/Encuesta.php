<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Encuesta extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    public function creador(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function preguntas()
    {
        return $this->hasMany(Pregunta::class);
    }

    public function participantes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'respuesta_user')->using(RespuestaUser::class)->withPivot(['encuesta_id', 'user_id']);
    }
}
