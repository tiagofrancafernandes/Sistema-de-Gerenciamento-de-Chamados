<?php

namespace App\Http\Controllers\Common;

use App\Models\AppFile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class AppFileController extends Controller
{
    public static function routes(): void
    {
        Route::get('app-file/{uuid}', [static::class, 'getFile'])->name('get_app_file');
    }

    public function getFile(Request $request, ?string $uuid = null)
    {
        abort_unless(str($uuid)->isUuid(), 404);

        $appFile = AppFile::getByUuid($uuid);

        if (!$appFile || (($appFile?->{'public'} ?? null) && auth()->guest())) {
            abort(404);
        }

        $pathToFile = $appFile?->getPath() ?? null;

        abort_unless(is_file($pathToFile), 404);

        return response()->file($pathToFile);
    }
}
