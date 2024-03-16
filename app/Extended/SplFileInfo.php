<?php

namespace App\Extended;

use App\Models\Traits\HasExtraData;
use Illuminate\Support\Collection;

class SplFileInfo extends \SplFileInfo
{
    use HasExtraData;

    public null|array|Collection $extraData = null;

    public function __get($name)
    {
        return $this->{$name} ?? collect($this->toArray())->get($name);
    }

    public function get(string $name, mixed $default = null)
    {
        return $this->__get($name) ?? $this->getExtraProperty($name, $default);
    }

    public function __set($name, $value)
    {
        if (!$name) {
            return;
        }

        if (!array_key_exists($this->{$name}, get_class_vars(static::class))) {
            $this->setExtraProperty($name, $value);

            return;
        }

        $this->{$name} = $value;
    }

    public function set(string $key, mixed $value): null|array|Collection
    {
        return $this->setExtraProperty($key, $value);
    }

    public function setExtraProperty(string $key, mixed $value): null|array|Collection
    {
        $extraData = collect($this->getExtraData());

        $extraData = $extraData->put($key, $value);
        $this->extraData = $extraData;

        return $this->getExtraData();
    }

    public static function getExtraDataColumn(null|string $columnName = null): null|string
    {
        return $columnName ?: 'extraData';
    }

    public function toArray(): array
    {
        $values = array_merge(
            $this->getExtraData()?->toArray() ?? [],
            [
                'path' => $this->getPath() ?? null,
                'filename' => $this->getFilename() ?? null,
                'basename' => $this->getBasename() ?? null,
                'pathname' => $this->getPathname() ?? null,
                'extension' => $this->getExtension() ?? null,
                'realPath' => $this->getRealPath() ?? null,
                'aTime' => is_integer($this->getATime()) ? date('Y-m-d H:i:s', $this->getATime()) : $this->getATime(),
                'mTime' => is_integer($this->getMTime()) ? date('Y-m-d H:i:s', $this->getMTime()) : $this->getMTime(),
                'cTime' => is_integer($this->getCTime()) ? date('Y-m-d H:i:s', $this->getCTime()) : $this->getCTime(),
                'inode' => $this->getInode() ?? null,
                'size' => $this->getSize() ?? null,
                'perms' => $this->getPerms() ?? null,
                'owner' => $this->getOwner() ?? null,
                'group' => $this->getGroup() ?? null,
                'type' => $this->getType() ?? null,
                'writable' => $this->isWritable() ?? null,
                'readable' => $this->isReadable() ?? null,
                'executable' => $this->isExecutable() ?? null,
                'file' => $this->isFile() ?? null,
                'dir' => $this->isDir() ?? null,
                'link' => $this->isLink() ?? null,
            ]
        );

        return $values ?? [];
    }

    public function toJson(int $flags = 64, int $depth = 512): string
    {
        return json_encode($this->toArray(), $flags, $depth) ?: '';
    }
}
