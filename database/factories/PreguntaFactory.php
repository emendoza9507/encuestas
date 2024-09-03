<?php

namespace Database\Factories;

use App\Models\TipoPregunta;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\preguntas>
 */
class PreguntaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tipoPregunta = TipoPregunta::all();

        return [
            'text' => fake()->text(),
            'tipo_pregunta_id' => $tipoPregunta->random()
        ];
    }
}
