<?php

namespace App\Models\Contracts;

use Illuminate\Support\Collection;

interface WithExtraData
{
    public function getExtraProperty(string $propertyName, mixed $defaultValue = null): mixed;
    public function getExtraData(null|string $columnName = null): null|array|Collection;
    public static function getExtraDataColumn(null|string $defaultValue = null): null|string;
}
