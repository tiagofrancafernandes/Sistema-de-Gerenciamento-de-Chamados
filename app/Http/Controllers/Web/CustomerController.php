<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

class CustomerController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Customers/Index');
    }

    public function show(Request $request, int|string $customerId): Response
    {
        return Inertia::render('Customers/Show', [
            'customerId' => $customerId,
            'customer' => $customerId ? Customer::where('id', $customerId)->firstOrFail() : null,
            'icons' => [
                'pencil' => svg('heroicon-s-pencil')->toHtml(),
                'check-badge' => svg('heroicon-s-check-badge')->toHtml(),
            ],
        ]);
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

    public function update(Request $request, int|string $customerId): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email'],
        ]);

        return response()->json($request->all());
    }
}
