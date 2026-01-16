<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
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
        if (auth()->check()) {
            // Redirect sesuai role
            return match (auth()->user()->role) {
                'admin' => redirect()->route('admin.dashboard'),
                'user'  => redirect('/absensi'),
                default => redirect('/'),
            };
        }

        return $next($request);
    }
}
