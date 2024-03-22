<?php

namespace App\Traits;

trait CanAddToast
{
    protected function addToast(
        ?string $message,
        ?string $title = null,
        string $type = 'success',
        ?array $options = null,
    ) {
        $types = [
            'info' => 'info',
            'success' => 'success',
            'error' => 'error',
            'default' => 'default',
            'message' => 'default',
            'alert' => 'warning',
            'warning' => 'warning',
            'danger' => 'error',
        ];

        $toast = [
            'message' => $message,
            'title' => $title,
            'type' => $types[$type] ?? 'success',
            'options' => array_merge([
                // 'position' => 'BOTTOM_CENTER',
                'pushedOn' => now()->format('c'),
            ], $options ?? []),
        ];

        $key = implode('.', ['flash', 'toast', $type]);

        request()->session()->flash($key, $toast);
    }
}
