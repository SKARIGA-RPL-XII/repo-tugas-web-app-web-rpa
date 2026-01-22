<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {

            /** @var \App\Models\User $user */
            $user = Auth::user();

            // Redirect sesuai role
            return match ($user->role) {
                'admin' => redirect()->route('dashboard'),
                'user'  => redirect()->route('dashboard'),
                default => redirect('/'),
            };
        }

        return $next($request);
    }
}