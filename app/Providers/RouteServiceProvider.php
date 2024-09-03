<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

class RouteServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->configureRateLimiting();

        // Other boot logic
    }

    protected function configureRateLimiting()
    {
        RateLimiter::for('global', function ($request) {
            return Limit::perMinute(100);
        });

        RateLimiter::for('api', function ($request) {
            return Limit::perMinute(100);
        });
    }
}
