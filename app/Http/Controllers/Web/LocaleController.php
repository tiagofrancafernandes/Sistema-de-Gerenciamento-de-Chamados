<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class LocaleController extends Controller
{
    public function getLocale(Request $request)
    {
        return match ($request?->input('mode')) {
            'text', 'plain-text' => App::getLocale(),
            'json' => response()->json(['locale' => App::getLocale()]),
            default => response()->json(['locale' => App::getLocale()]),
        };
    }

    public function setLocale(Request $request, ?string $lang = null)
    {
        if ($lang && !$request->input('lang')) {
            $request->merge(['lang' => $lang]);
        }

        $validated = $request->validate([
            'lang' => ['required'],
        ]);

        $redirectToRoute = filter_var($request->input('redirect_to_route'), FILTER_DEFAULT, FILTER_NULL_ON_FAILURE);

        $redirectTo = $redirectToRoute
            ? route($redirectToRoute, $request->input('route_params'))
            : filter_var($request->input('redirect_to'), FILTER_VALIDATE_URL, FILTER_NULL_ON_FAILURE);

        App::setLocale($validated['lang']);
        session()->put('locale', $validated['lang']);

        return $redirectTo ? redirect($redirectTo) : redirect()->back();
    }

    public static function routes(): void
    {
        Route::prefix('locale')->group(function () {
            Route::get('/', [LocaleController::class, 'getLocale'])->name('get_locale');
            Route::match(['get', 'post'], '/{lang?}', [LocaleController::class, 'setLocale'])->name('set_locale');
        });
    }
}
