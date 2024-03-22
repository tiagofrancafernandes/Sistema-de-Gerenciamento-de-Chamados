<?php

use Illuminate\Support\Fluent;
use Illuminate\Support\Facades\Auth;

if (!function_exists('fluent')) {
    /**
     * function fluent
     */
    function fluent(array|object|null $attributes = []): object
    {
        return new Fluent($attributes ?? []);
    }
}

if (!function_exists('userMetaData')) {
    /**
     * userMetaData function
     *
     * @param string $key
     *
     * @param mixed $default
     *
     * @return mixed
     */
    function userMetaData(?string $key = null, mixed $default = null): mixed
    {
        return Auth::user()?->metaData($key, $default) ?? $default;
    }
}

if (!function_exists('userDate')) {
    /**
     * function userDate
     *
     * @param string|DateTimeInterface|null $time
     *
     * @see https://php.net/manual/en/datetime.format.php
     *
     * @param null|string $format
     *
     * @param null|string $timezone
     *
     * @return string|\Illuminate\Support\Carbon
     */
    function userDate(
        string|DateTimeInterface|null $time = null,
        ?string $format = null,
        ?string $timezone = null,
    ): string|Illuminate\Support\Carbon {
        $timezone ??= Auth::user()?->metaData('timezone') ?: config('app.timezone');
        $carbonTime = now()->parse($time ?: null);

        if ($timezone) {
            $carbonTime = $carbonTime->timezone($timezone);
        }

        if (!$format) {
            return $carbonTime;
        }

        return $carbonTime->format($format);
    }
}

if (!function_exists('safe')) {
    /**
     * safe function  -- A easy way to try/catch run
     *
     * ```php
     * // Usage:
     * safe(fn () => 'may be error action', fn (\Throwable $th) => 'catch action here')
     * ```
     *
     * @param Closure $runner
     * @param Closure|null $throwableCatcher
     *
     * @return mixed
     */
    function safe(Closure $runner, ?Closure $throwableCatcher = null): mixed
    {
        try {
            return $runner();
        } catch (Throwable $th) {
            if (!$throwableCatcher) {
                return false;
            }

            return $throwableCatcher($th);
        }
    }
}

if (!function_exists('safeOr')) {
    /**
     * safeOr function
     *
     * ```php
     * // Usage:
     * safeOr(fn () => 'may be error action', 'fail')
     * safeOr(fn () => 'may be error action', null)
     * safeOr(fn () => 'may be error action')
     * safeOr(fn () => 'may be error action', [])
     * ```
     *
     * @param Closure $runner
     * @param mixed $valueOnFail
     *
     * @return mixed
     */
    function safeOr(Closure $runner, mixed $valueOnFail = null): mixed
    {
        try {
            return $runner();
        } catch (Throwable $th) {
            return $valueOnFail;
        }
    }
}

if (!function_exists('toast')) {
    /**
     * toast function
     *
     * @param string $message
     * @param string|null $title
     * @param string $type
     * @param array|null $options
     *
     * @return void
     */
    function toast(
        string $message,
        ?string $title = null,
        string $type = 'success',
        ?array $options = null,
    ): void {
        App\Helpers\ToastHelpers::toast(
            $message,
            $title,
            $type,
            $options,
        );
    }
}
