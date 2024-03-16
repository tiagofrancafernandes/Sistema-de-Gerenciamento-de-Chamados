<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'url' => [
                'assetUrl' => asset('/'),
            ],
            'app' => [
                'locale' => config('app.locale', 'en'),
                'translations' => static::getTranslations(),
            ],
        ];
    }

    public static function getTranslations(): array
    {
        return cache()
            ->remember(
                __METHOD__,
                intval(siteConfig('inertia_loader.translations.cache.ttl', (60 * 5))),
                function () {
                    $finder = (new \Symfony\Component\Finder\Finder())
                        ->files()
                        ->name(['*.php'])
                        ->depth(['> 0', '< 3'])
                        ->in(lang_path(''));
                    $namespaces = [];

                    foreach ($finder as $file) {
                        $namespace = pathinfo(
                            str(explode(lang_path(), $file?->getRealPath())[1] ?? null)
                                ->ltrim('/\\')
                                ->toString(),
                            PATHINFO_FILENAME
                        );

                        if (!$namespace) {
                            continue;
                        }

                        $namespaces[$namespace] = $namespace;
                    }

                    $locales = collect([
                        'en',
                        config('app.locale', 'en'),
                    ])->unique()->filter()->toArray();

                    $namespaces = collect($namespaces)->unique()->filter()->toArray();

                    $invaded = invade(app('translator'));

                    foreach ($namespaces as $namespace) {
                        foreach ($locales as $locale) {
                            $invaded->__call('get', [$namespace, [], $locale]);
                        }
                    }

                    return $invaded->__get('loaded')['*'] ?? [];
                }
            );
    }
}
