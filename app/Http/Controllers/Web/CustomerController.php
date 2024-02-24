<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Customers/Index');
    }

    public function show(Request $request, int|string $customerId): Response
    {
        return Inertia::render('Customers/Show');
    }
}
