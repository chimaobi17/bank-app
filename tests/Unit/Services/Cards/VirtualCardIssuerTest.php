<?php

use App\Services\Cards\VirtualCardIssuer;

it('generates a Luhn-valid 16-digit PAN for VISA', function () {
    $reflector = new ReflectionClass(VirtualCardIssuer::class);
    $issuer = $reflector->newInstanceWithoutConstructor();
    $generate = $reflector->getMethod('generateLuhnCompliantPan');

    $pan = $generate->invoke($issuer, 'VISA');

    expect(strlen($pan))->toBe(16);
    expect($pan[0])->toBe('4');

    // Luhn check
    $sum = 0;
    $parity = strlen($pan) % 2;
    for ($i = 0; $i < strlen($pan); $i++) {
        $d = (int) $pan[$i];
        if ($i % 2 === $parity) {
            $d *= 2;
            if ($d > 9) {
                $d -= 9;
            }
        }
        $sum += $d;
    }
    expect($sum % 10)->toBe(0);
});

it('generates different brands with correct IIN prefix', function () {
    $reflector = new ReflectionClass(VirtualCardIssuer::class);
    $issuer = $reflector->newInstanceWithoutConstructor();
    $generate = $reflector->getMethod('generateLuhnCompliantPan');

    $mc = $generate->invoke($issuer, 'MASTERCARD');
    expect($mc[0])->toBe('5');
    expect(in_array($mc[1], ['1','2','3','4','5']))->toBeTrue();
});
