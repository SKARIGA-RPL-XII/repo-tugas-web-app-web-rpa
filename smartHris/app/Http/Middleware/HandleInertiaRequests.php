<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        // Ganti role untuk testing: 'admin' atau 'user'
        $mockRole = 'admin';

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => [
                    'id' => 1,
                    'name' => 'Developer Test',
                    'email' => 'dev@smarthris.com',
                    'role' => $mockRole,
                    'avatar' => 'https://ui-avatars.com/api/?name=Developer+Test',
                ],
            ],

            'flash' => [
                'message' => fn () => $request->session()->get('message'),
            ],
        ]);
    }
}
