<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $allUser = User::where('role_id', 2)->get()->pluck('phone','email')->toArray();
        $users = array_merge(array_values($allUser), array_keys($allUser));
        View::share('users', json_encode($users));
    }
}
