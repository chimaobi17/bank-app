<?php

namespace App\Providers;

use App\Contracts\External\BillPaymentProviderContract;
use App\Contracts\External\InterbankGatewayContract;
use App\Contracts\Kyc\IdentityProviderContract;
use App\Contracts\Security\BiometricAuthenticatorContract;
use App\Services\External\MockBillPaymentProvider;
use App\Services\External\MockInterbankGateway;
use App\Services\Kyc\MockIdentityProvider;
use App\Services\Security\StubBiometricAuthenticator;
use Illuminate\Support\ServiceProvider;

class Phase12ServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(IdentityProviderContract::class, MockIdentityProvider::class);
        $this->app->singleton(InterbankGatewayContract::class, MockInterbankGateway::class);
        $this->app->bind(BillPaymentProviderContract::class, MockBillPaymentProvider::class);
        $this->app->bind(BiometricAuthenticatorContract::class, StubBiometricAuthenticator::class);
    }
}
