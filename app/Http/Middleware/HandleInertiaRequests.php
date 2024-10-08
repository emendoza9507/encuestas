<?php

namespace App\Http\Middleware;

use App\Models\Encuesta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $user = Auth::user();
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'permissions' => [
                    'encuesta' => [
                        'create' => $user ? $request->user()->can('create', Encuesta::class) : false,
                        'viewAny' => $user ? $request->user()->can('viewAny', Encuesta::class) : false
                    ]
                ]
            ],
            'can' => $user ? $user->getAllPermissions() : [],
            'roles' => $user ? $user->getRoleNames() : [],
            'message' => Session::get('message', null),
        ]);
    }
}
