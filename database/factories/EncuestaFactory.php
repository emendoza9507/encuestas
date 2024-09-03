<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\encuestas>
 */
class EncuestaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->text(100),
            'description' => fake()->text(400),
            'start_date' => fake()->unique()->dateTimeBetween('-7 days', '+2 months')->format('Y-m-d'),
            'exp_date' => fake()->unique()->dateTimeBetween('-7 days', '+2 months')->format('Y-m-d')
        ];
    }
}
