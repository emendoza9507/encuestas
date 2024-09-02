<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Respuesta extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function pregunta()
    {
        return $this->belongsTo(Pregunta::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->using(RespuestaUser::class)
            ->withPivot(['text'])
            ->withTimestamps();
    }
}
