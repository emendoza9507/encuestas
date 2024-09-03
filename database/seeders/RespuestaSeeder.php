<?php

namespace Database\Seeders;

use App\Models\Pregunta;
use App\Models\Respuesta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RespuestaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $preguntas = Pregunta::all();
        foreach($preguntas as $pregunta) {
            Respuesta::factory(fake()->randomElement([1,2,3,4]))->create(['pregunta_id'=> $pregunta->id]);
        }
    }
}
