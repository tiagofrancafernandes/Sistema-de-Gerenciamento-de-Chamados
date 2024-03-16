<?php

namespace App\Models\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

trait HasExtraData
{
    public function getExtraProperty(
        string $propertyName,
        mixed $defaultValue = null,
        null|string $columnName = null,
    ): mixed {
        $extraData = $this->getExtraData(columnName: $columnName);

        if (is_null($extraData)) {
            return $defaultValue;
        }

        return Arr::get(
            is_a($extraData, Collection::class) ? $extraData->toArray() : $extraData,
            $propertyName,
            $defaultValue
        );
    }

    public function getExtraData(null|string $columnName = null): null|array|Collection
    {
        $columnName = trim(static::getExtraDataColumn($columnName));

        if (!$columnName) {
            return null;
        }

        $data = $this->{$columnName} ?? null;

        if (is_null($data)) {
            return null;
        }

        if (!$data instanceof Collection) {
            return new Collection($data);
        }

        return $data;
    }

    public static function getExtraDataColumn(null|string $columnName = null): null|string
    {
        return $columnName ?: 'extra_data';
    }
}
