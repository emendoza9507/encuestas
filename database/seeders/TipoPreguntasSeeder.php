<?php

namespace Database\Seeders;

use App\Models\TipoPregunta;
use Database\Factories\TipoPreguntaFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoPreguntasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TipoPregunta::factory()->create([
            'tipo' => 'MARCAR',
        ]);

        TipoPregunta::factory()->create([
            'tipo' => 'ARGUMENTAR',
        ]);
    }
}
