<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('showAny', User::class);
        $usuarios = User::paginate(8);

        return Inertia::render('User/Index', [
            'usuarios' => $usuarios,
            'permissions' => [
                'user' => [
                    'create' => $request->user()->can('create', User::class)
                ]
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();
        $permissions = Permission::all();

        return Inertia::render('User/Create', [
            'roles' => $roles,
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        Gate::authorize('create', User::class);
        $user = User::create($request->validated());

        $user->syncRoles(Role::whereIn('id', $request->input('roles'))->get());
        $user->syncPermissions(Permission::whereIn('id', $request->input('permissions'))->get());

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(User $usuario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $usuario)
    {
        Gate::authorize('update', [User::class, $usuario]);

        $usuario->load(['roles', 'permissions']);

        $roles = Role::all();
        $permissions = Permission::all();

        return Inertia::render('User/Edit', [
            'usuario' => $usuario,
            'roles' => $roles,
            'permissions' => $permissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $usuario)
    {
        Gate::authorize('update', [User::class, $usuario]);

        $usuario->update($request->validated());

        if($request->get('password') !== null && $request->validate(['password' => ['min:8','confirmed']])) {
            $usuario->update(['password' => Hash::make($request->input('password'))]);
        }

        $usuario->syncRoles(Role::whereIn('id', $request->input('roles'))->get());
        $usuario->syncPermissions(Permission::whereIn('id', $request->input('permissions'))->get());

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $usuario)
    {
        Gate::authorize('delezte', [User::class, $usuario]);

        $usuario->delete();

        return redirect()->back();
    }
}
