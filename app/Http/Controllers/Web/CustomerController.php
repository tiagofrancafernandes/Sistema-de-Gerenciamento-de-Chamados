<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class CustomerController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Customers/Index', [
            'items' => Customer::paginate(20),
            'hookComponents' => [
                'beforeTable' => 'IndexBeforeTable',
                'afterTable' => 'IndexBeforeTable',
            ],
        ]);
    }

    public function show(Request $request, int|string $customerId): Response
    {
        session()->flash('toast', 'teste');
        $tab = $request?->get('tab');

        return Inertia::render('Customers/Show', [
            'customerId' => $customerId,
            'customer' => $customerId ? Customer::where('id', $customerId)->firstOrFail() : null,
            'activeTab' => $tab,
            'loadOnTab' => $tab,
            'tabContent' => static::getTabContent($request, $customerId, $tab),
            'icons' => [
                'pencil' => svg('heroicon-s-pencil')->toHtml(),
                'check-badge' => svg('heroicon-s-check-badge')->toHtml(),
            ],
        ]);
    }

    public static function getTabContent(
        ?Request $request = null,
        null|int|string $customerId = null,
        ?string $tab = null,
    ) {
        $request ??= request();
        $tab ??= $request?->get('tab');

        return match ($tab) {
            'last-tickets' => [
                'tickets' => cache()->remember(
                    md5(implode('', [$tab, $customerId, __METHOD__])),
                    intval(siteConfig('last_tickets.cache.ttl', (60 * 5))),
                    fn () => Ticket::orderBy('id', 'desc')
                        ->with([
                            'category' => fn ($query) => $query->select(['id', 'name', 'slug']),
                            'creator' => fn ($query) => $query->select(['id', 'name']),
                            'user' => fn ($query) => $query->select(['id', 'name']),
                        ])
                        ->limit(6)
                        ?->get()?->append([
                            'decodedContent',
                            'lastTags',
                        ]) ?? [],
                ),
            ],
            default => [],
        };
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Customers/Form', [
            'action' => 'create',
            'icons' => [
                'pencil' => svg('heroicon-s-pencil')->toHtml(),
                'check-badge' => svg('heroicon-s-check-badge')->toHtml(),
            ],
        ]);
    }

    public function edit(Request $request, int|string $customerId): Response
    {
        return Inertia::render('Customers/Form', [
            'action' => 'edit',
            'customerId' => $customerId,
            'icons' => [
                'pencil' => svg('heroicon-s-pencil')->toHtml(),
                'check-badge' => svg('heroicon-s-check-badge')->toHtml(),
            ],
        ]);
    }

    public function update(Request $request, int|string $customerId): JsonResponse|RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email'],
        ]);

        toast('Atualizado!');

        return redirect()->route('customers.index');
    }
}
