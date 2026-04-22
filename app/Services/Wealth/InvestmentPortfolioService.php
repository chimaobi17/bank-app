<?php

namespace App\Services\Wealth;

use App\Models\Customer;
use App\Models\InvestmentHolding;
use App\Models\InvestmentInstrument;
use InvalidArgumentException;

final class InvestmentPortfolioService
{
    public function buy(Customer $customer, InvestmentInstrument $instrument, string $units): InvestmentHolding
    {
        if (! $instrument->is_active) {
            throw new InvalidArgumentException("Instrument {$instrument->symbol} is not active.");
        }

        if (bccomp($units, '0', 4) !== 1) {
            throw new InvalidArgumentException('Units must be greater than zero.');
        }

        $cost = bcmul($units, (string) $instrument->unit_price, 4);

        $existing = InvestmentHolding::where('customer_id', $customer->customer_id)
            ->where('instrument_id', $instrument->instrument_id)
            ->first();

        if ($existing) {
            $newUnits = bcadd((string) $existing->units, $units, 4);
            $newCostBasis = bcadd(
                bcmul((string) $existing->units, (string) $existing->avg_cost, 4),
                $cost,
                4,
            );
            $existing->avg_cost = bcdiv($newCostBasis, $newUnits, 4);
            $existing->units = $newUnits;
            $existing->current_value = bcmul($newUnits, (string) $instrument->unit_price, 4);
            $existing->save();

            return $existing;
        }

        return InvestmentHolding::create([
            'customer_id' => $customer->customer_id,
            'instrument_id' => $instrument->instrument_id,
            'units' => $units,
            'avg_cost' => $instrument->unit_price,
            'current_value' => $cost,
            'acquired_at' => now(),
        ]);
    }

    public function sell(InvestmentHolding $holding, string $units): string
    {
        if (bccomp($units, (string) $holding->units, 4) === 1) {
            throw new InvalidArgumentException('Cannot sell more units than held.');
        }

        $proceeds = bcmul($units, (string) $holding->instrument->unit_price, 4);
        $remaining = bcsub((string) $holding->units, $units, 4);

        if (bccomp($remaining, '0', 4) === 0) {
            $holding->delete();
        } else {
            $holding->units = $remaining;
            $holding->current_value = bcmul($remaining, (string) $holding->instrument->unit_price, 4);
            $holding->save();
        }

        return $proceeds;
    }

    public function portfolioValue(Customer $customer): string
    {
        return InvestmentHolding::where('customer_id', $customer->customer_id)
            ->get()
            ->reduce(fn ($carry, $h) => bcadd($carry, (string) $h->current_value, 4), '0.0000');
    }
}
