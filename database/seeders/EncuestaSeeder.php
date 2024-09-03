<?php

namespace Database\Seeders;

use App\Models\Encuesta;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EncuestaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach($users as $user) {
            Encuesta::factory(random_int(10, 40))->create(['created_by' => $user->id]);
        }
    }
}
