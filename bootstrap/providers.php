<?php

use App\Providers\AppServiceProvider;
use App\Providers\FortifyServiceProvider;

return [
    AppServiceProvider::class,
    \App\Providers\AuthServiceProvider::class,
    FortifyServiceProvider::class,
    \App\Providers\RepositoryServiceProvider::class,
    \App\Providers\NotificationServiceProvider::class,
    \App\Providers\Phase12ServiceProvider::class,
];
