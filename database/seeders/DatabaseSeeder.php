<?php

namespace Database\Seeders;

use App\Models\Respuesta;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(RoleSeeder::class);
        $this->call(TipoPreguntasSeeder::class);
        $this->call(EncuestaSeeder::class);
        $this->call(PreguntaSeeder::class);
        $this->call(RespuestaSeeder::class);


        User::factory()->create([
            'name' => 'Lisandra Cayamo Tamayo',
            'email' => 'lcayamo@gmail.com',
            'password' => Hash::make('matahambre')
        ]);


        User::factory(10)->create([
            'password' => Hash::make('matahambre')
        ]);
    }
}
