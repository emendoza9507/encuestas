<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Crear los permisos
        Permission::create(['name' => 'encuesta.index']);
        Permission::create(['name' => 'encuesta.store']);
        Permission::create(['name' => 'encuesta.create']);
        Permission::create(['name' => 'encuesta.update']);
        Permission::create(['name' => 'encuesta.destroy']);

        $role1 = Role::create(['name' => 'encuestador']);
        $role1->givePermissionTo('encuesta.create', 'encuesta.store', 'encuesta.update', 'encuesta.destroy');

        $role2 = Role::create(['name' => 'admin']);

        $role3 = Role::create(['name' => 'Super-Admin']);

        $user = User::factory()->create([
            'name' => 'Eduardo Mendoza Campos',
            'email' => 'eduardo.mendoza@rch.transtur.cu',
            'password' => Hash::make('matahambre')
        ]);


        $user->assignRole($role3);
    }
}
