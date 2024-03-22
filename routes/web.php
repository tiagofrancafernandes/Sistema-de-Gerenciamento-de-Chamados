<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Web\CustomerController;
use App\Http\Controllers\Web\BladeIconsController;
use App\Http\Controllers\Web\LocaleController;
use App\Http\Controllers\Common\AppFileController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $canRegister = siteConfig('admin.auth.canRegister', Route::has('register'));
    $canLogin = siteConfig('admin.auth.canLogin', Route::has('login'));

    return Inertia::render('Welcome', [
        'canLogin' => $canLogin,
        'canRegister' => $canRegister,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('_')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('/', fn () => to_route('dashboard'));
        Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

        Route::prefix('customers')->name('customers.')->group(function () {
            Route::get('/', [CustomerController::class, 'index'])->name('index');
            Route::get('/create', [CustomerController::class, 'create'])->name('create');
            Route::get('/{customerId}', [CustomerController::class, 'show'])->name('show');
            Route::get('/{customerId}/edit', [CustomerController::class, 'edit'])->name('edit');
            Route::post('/{customerId}/update', [CustomerController::class, 'update'])->name('update');
        });
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('blade-icons/{icon}.svg', [BladeIconsController::class, 'showIcon'])
    ->name('blade.icon.svg');

Route::get('blade-icons/{icon}', [BladeIconsController::class, 'showIcon'])
    ->name('blade.icon');

require __DIR__ . '/auth.php';

LocaleController::routes();
AppFileController::routes();

Route::get('toast-test/{type?}', function (Request $request, ?string $type = null) {
    $title = $request->input('title', 'Title here');
    $message = $request->input('message', 'Mesage here');
    $type ??= $request->input('type', 'suscess');
    $options = (array) $request->input('options');
    $redirectTo ??= $request->input('redirect_to', route('customers.index'));

    toast(
        $message,
        $title,
        $type,
        $options
    );

    return back();

    return redirect()->to($redirectTo);
})->name('toast-test');
