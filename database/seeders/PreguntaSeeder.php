<?php

namespace Database\Seeders;

use App\Models\Encuesta;
use App\Models\Pregunta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PreguntaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $encuestas = Encuesta::all();

        foreach($encuestas as $encuesta) {
            Pregunta::factory(random_int(10, 30))->create(['encuesta_id' => $encuesta]);
        }
    }
}
