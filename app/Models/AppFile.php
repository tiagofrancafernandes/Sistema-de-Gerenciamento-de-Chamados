<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use App\Models\Contracts\WithExtraData;
use App\Models\Traits\HasExtraData;
use Illuminate\Database\Eloquent\Concerns\HasUniqueIds;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Support\Facades\Storage;

#[\AllowDynamicProperties]
class AppFile extends Model implements WithExtraData
{
    use HasFactory;
    use SoftDeletes;
    use HasExtraData;
    use LogsActivity;
    use HasUniqueIds;

    protected $fillable = [
        'name',
        'original_name',
        'extension',
        'disk',
        'path',
        'size',
        'expires_in',
        'public',
        'uploaded_by',
        'extra_data',
        'refclass_type',
        'refclass_id',
    ];

    protected $casts = [
        'extra_data' => AsCollection::class,
        'public' => 'boolean',
    ];

    protected $dates = [
        'expires_in',
    ];

    public function refclass(): MorphTo
    {
        if (config('app_file.refclass_returns_soft_deleted_models')) {
            return $this->morphTo()->withTrashed();
        }

        return $this->morphTo();
    }

    public function scopeForRefclass(Builder $query, Model $refclass): Builder
    {
        return $query
            ->where('refclass_type', $refclass->getMorphClass())
            ->where('refclass_id', $refclass->getKey());
    }

    public function getActivitylogOptions(): LogOptions
    {
        // https://spatie.be/docs/laravel-activitylog/v4/advanced-usage/logging-model-events
        return LogOptions::defaults()
            ->logOnly($this->getFillable())
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
        // Chain fluent methods for configuration options
    }

    public function setRefclass(
        Model|string|null $refClass,
        null|string|int $refClassId = null,
    ): static {
        if (!filled($refClass)) {
            return $this;
        }

        if (is_string($refClass) && !(class_exists($refClass) || method_exists($refClass, 'find'))) {
            return $this;
        }

        if (is_string($refClass) && filled($refClassId)) {
            $refClass = $refClass::find($refClassId);
        }

        if (!$refClass || !is_a($refClass, Model::class)) {
            return $this;
        }

        $this->refclass()->associate($refClass);

        $this->save();

        return $this;
    }

    public function getUrl(): ?string
    {
        if (!$this->{'path'}) {
            return null;
        }

        // return $this->{'disk'}
        //     ? Storage::disk($this->{'disk'})->url($this->{'path'})
        //     : Storage::url($this->{'path'});

        return $this->uuid ? route('get_app_file', ['uuid' => $this->uuid]) : null;
    }

    public function getPath(): ?string
    {
        if (!$this->{'path'}) {
            return null;
        }

        return $this->{'disk'}
            ? Storage::disk($this->{'disk'})->path($this->{'path'})
            : Storage::path($this->{'path'});
    }

    public static function getByUuid(?string $uuid): ?static
    {
        return static::where('uuid', $uuid)->first();
    }

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array
     */
    public function uniqueIds()
    {
        return [
            'uuid',
        ];
    }

    /**
     * Determine if the model uses unique ids.
     *
     * @return bool
     */
    public function usesUniqueIds()
    {
        return boolval($this->uniqueIds());
    }

    /**
     * Generate a new UUID for the model.
     *
     * @return string
     */
    public function newUniqueId()
    {
        return (string) str()->orderedUuid();
    }
}
