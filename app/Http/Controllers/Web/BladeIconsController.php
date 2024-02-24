<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BladeIconsController extends Controller
{
    public function showIcon(Request $request, string $icon)
    {
        return response(svg($icon)->toHtml(), 200, [
            'Content-Type' => 'image/svg+xml',
        ]);
    }
}
