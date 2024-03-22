<?php

namespace App\Helpers;

use App\Traits\CanAddToast;

class ToastHelpers
{
    use CanAddToast;

    public static function instance(): static
    {
        return app(static::class);
    }

    public static function toast(
        string $message,
        ?string $title = null,
        ?string $type = 'success',
        ?array $options = null,
    ): void {
        static::instance()->addToast(
            $title,
            $message,
            $type,
            $options,
        );
    }
}
