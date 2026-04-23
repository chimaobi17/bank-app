<?php

namespace App\Http\Controllers\Banking;

use App\Http\Controllers\Controller;
use App\Models\Card;
use App\Services\Cards\CardManagementService;
use App\Services\Cards\VirtualCardIssuer;
use App\ValueObjects\Money;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CardsPageController extends Controller
{
    public function __construct(
        private readonly CardManagementService $cards,
        private readonly VirtualCardIssuer $issuer,
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $accountIds = $user->customer?->accounts()->pluck('account_id') ?? collect();

        $cards = Card::whereIn('account_id', $accountIds)->with('account')->get();

        return Inertia::render('banking/cards/index', [
            'cards' => $cards->map(fn (Card $c) => $this->presentCard($c)),
            'accounts' => $user->customer?->accounts()->get()->map(fn ($a) => [
                'account_id' => $a->account_id,
                'account_number' => $a->account_number,
                'account_type' => $a->account_type?->value,
                'currency' => $a->currency,
            ]) ?? [],
        ]);
    }

    public function show(Request $request, Card $card): Response
    {
        $this->authorizeCard($request, $card);

        return Inertia::render('banking/cards/show', [
            'card' => $this->presentCard($card),
        ]);
    }

    public function issueVirtual(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'account_id' => 'required|integer',
            'brand' => 'nullable|string|in:VISA,MASTERCARD,VERVE',
        ]);

        $this->issuer->issue((int) $data['account_id'], $data['brand'] ?? 'VISA');

        return redirect()->route('banking.cards')->with('success', 'Virtual card issued successfully.');
    }

    public function setPin(Request $request, Card $card): RedirectResponse
    {
        $this->authorizeCard($request, $card);

        $data = $request->validate([
            'pin' => 'required|string|regex:/^\d{4,6}$/',
        ]);

        $this->cards->setPin($card, $data['pin']);

        return back()->with('success', 'Card PIN updated successfully.');
    }

    public function setLimits(Request $request, Card $card): RedirectResponse
    {
        $this->authorizeCard($request, $card);

        $data = $request->validate([
            'daily' => 'nullable|numeric|min:0',
            'monthly' => 'nullable|numeric|min:0',
            'single' => 'nullable|numeric|min:0',
        ]);

        $currency = $card->account?->currency ?? 'NGN';

        $this->cards->setLimits(
            $card,
            isset($data['daily']) ? Money::of((string) $data['daily'], $currency) : null,
            isset($data['monthly']) ? Money::of((string) $data['monthly'], $currency) : null,
            isset($data['single']) ? Money::of((string) $data['single'], $currency) : null,
        );

        return back()->with('success', 'Card limits updated successfully.');
    }

    public function freeze(Request $request, Card $card): RedirectResponse
    {
        $this->authorizeCard($request, $card);
        $this->cards->freeze($card);

        return back()->with('success', 'Card frozen successfully. It can no longer be used for transactions.');
    }

    public function unfreeze(Request $request, Card $card): RedirectResponse
    {
        $this->authorizeCard($request, $card);
        $this->cards->unfreeze($card);

        return back()->with('success', 'Card unfrozen successfully. It is now active for transactions.');
    }

    public function requestReplacement(Request $request, Card $card): RedirectResponse
    {
        $this->authorizeCard($request, $card);

        $data = $request->validate([
            'reason' => 'required|string|in:lost,stolen,damaged,compromised',
        ]);

        $this->cards->requestReplacement($card, $data['reason']);

        return back()->with('success', 'Replacement requested successfully. A new card will be issued shortly.');
    }

    private function authorizeCard(Request $request, Card $card): void
    {
        $customerId = $request->user()->customer_id;
        $ownsCard = $card->account?->customer_id === $customerId;

        abort_unless($ownsCard, 403);
    }

    private function presentCard(Card $card): array
    {
        return [
            'card_id' => $card->card_id,
            'account_id' => $card->account_id,
            'account_number' => $card->account?->account_number,
            'currency' => $card->account?->currency,
            'masked_pan' => $card->masked_pan,
            'last4' => substr($card->masked_pan, -4),
            'brand' => $card->brand,
            'card_type' => $card->card_type,
            'is_virtual' => (bool) $card->is_virtual,
            'online_only' => (bool) $card->online_only,
            'status' => $card->status?->value,
            'is_frozen' => $card->frozen_at !== null,
            'has_pin' => $card->pin_hash !== null,
            'daily_limit' => $card->daily_limit,
            'monthly_limit' => $card->monthly_limit,
            'single_tx_limit' => $card->single_tx_limit,
            'expiry' => $card->expiry?->format('m/y'),
            'replacement_reason' => $card->replacement_reason,
        ];
    }
}
