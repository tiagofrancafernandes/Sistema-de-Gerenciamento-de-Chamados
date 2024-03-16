<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;
use App\Extended\SplFileInfo;
use Illuminate\Support\Fluent;
use Illuminate\Support\Stringable;
use Illuminate\Support\Facades\File;

class LocalFileHandler
{
    public static function fileInfo(
        string $sourceFilePath,
        bool $checkIfExists = true,
    ): ?SplFileInfo {
        if ($checkIfExists && !($sourceFilePath && is_file($sourceFilePath))) {
            return null;
        }

        /**
         * @var SplFileInfo $fileInfo
         */
        $fileInfo = new SplFileInfo($sourceFilePath);

        return $checkIfExists && !$fileInfo?->getRealPath() ? null : $fileInfo;
    }

    public static function copyFile(
        null|string|SplFileInfo $sourceFileInfo,
        ?string $saveAs = null,
        ?string $directory = null,
        ?string $diskName = null,
        ?Fluent $options = null,
    ): ?SplFileInfo {
        if (!$sourceFileInfo) {
            return null;
        }

        $sourceFileInfo = is_string($sourceFileInfo) ? static::fileInfo($sourceFileInfo) : $sourceFileInfo;

        if (!$sourceFileInfo || !$sourceFileInfo?->getRealPath() || !is_file($sourceFileInfo?->getRealPath())) {
            return null;
        }

        $diskName = $diskName ?: config('filesystems.default', 'public');

        /**
         * @var \Illuminate\Filesystem\FilesystemAdapter $storage
         */
        $storage = Storage::disk($diskName);

        $public = ($storage->getConfig()['visibility'] ?? '') === 'public';

        $prefix = filter_var($options?->prefix, FILTER_DEFAULT, FILTER_NULL_ON_FAILURE) ?: '';
        $suffix = filter_var($options?->suffix, FILTER_DEFAULT, FILTER_NULL_ON_FAILURE) ?: '';

        $saveAs = str(filled($saveAs) ? $saveAs : pathinfo($sourceFileInfo->getPathname(), PATHINFO_FILENAME))->slug();
        $prefix = static::clearPath(
            filled($prefix) ? $prefix : str(str()->random(15))->prepend(date('Y-m-d_His') . '-'),
            trim: '/\\',
            rtrim: null,
            ltrim: null,
            replace: null,
        )->slug();

        $suffix = filled($suffix) ? static::clearPath(
            $suffix,
            trim: '/\\',
            rtrim: '',
            ltrim: '',
            replace: [['/', '\\', ' ', ''], '-'],
        )->slug() : '';

        $directory = filled($directory) ? static::clearPath(
            $directory,
            trim: '/\\',
        )->trim() : '';

        $destinationDirFullPath = static::clearPath(
            $storage->path($directory),
            trim: null,
            rtrim: '/\\',
            ltrim: null,
            replace: null,
        )->trim()->toString();

        $saveAs = $saveAs
            ->prepend($prefix)
            ->append($suffix)
            ->append(
                $sourceFileInfo->getExtension() ? '.' . $sourceFileInfo->getExtension() : ''
            );

        $destinationFullPath = $saveAs->prepend($destinationDirFullPath . '/')->toString();

        $destinationDirPath = static::fileInfo($destinationFullPath, false)?->getPath();

        if (!is_dir($destinationDirPath)) {
            mkdir($destinationDirPath, 0777, true);
        }

        if (!is_dir($destinationDirPath)) {
            return null;
        }

        File::copy($sourceFileInfo?->getRealPath(), $destinationFullPath);

        if (!File::exists($destinationFullPath)) {
            return null;
        }

        /**
         * @var SplFileInfo $finalFileInfo
         */
        $finalFileInfo = static::fileInfo($destinationFullPath);

        if (!$finalFileInfo) {
            return null;
        }

        $pathOnStorage = explode($storage?->path('/'), $finalFileInfo->getRealPath(), 2)[1] ?? null;
        $finalFileInfo->setExtraProperty('public', $public);
        $finalFileInfo->setExtraProperty('disk', $diskName);
        $finalFileInfo->setExtraProperty('originalName', $sourceFileInfo->getFilename());
        $finalFileInfo->setExtraProperty('extension', $sourceFileInfo->getExtension());
        $finalFileInfo->setExtraProperty('path_on_storage', $pathOnStorage);

        return $finalFileInfo;
    }

    public static function clearPath(
        string|Stringable $str = '',
        ?string $trim = null,
        ?string $rtrim = null,
        ?string $ltrim = null,
        ?array $replace = null,
    ): Stringable {
        return str($str)
            ->replace(['//', '\\'], '/')
            ->when($trim, fn (Stringable $str, ?string $trim = null) => $str->trim($trim))
            ->when($rtrim, fn (Stringable $str, ?string $rtrim = null) => $str->rtrim($rtrim))
            ->when($ltrim, fn (Stringable $str, ?string $ltrim = null) => $str->ltrim($ltrim))
            ->when($replace, fn (Stringable $str, ?array $replace = null) => $str->replace(...$replace));
    }
}
