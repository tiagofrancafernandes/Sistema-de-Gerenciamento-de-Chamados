<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\TicketStatus;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Ticket extends Model
{
    use HasFactory;
    use SoftDeletes;
    use LogsActivity;

    protected $fillable = [
        'title',
        'content',
        'agent_id',
        'customer_id',
        'category_id',
        'created_by',
        'opened_to',
        'status',
        'extra_data',
    ];

    protected $casts = [
        'status' => TicketStatus::class,
        'extra_data' => AsCollection::class,
    ];

    public function getActivitylogOptions(): LogOptions
    {
        // https://spatie.be/docs/laravel-activitylog/v4/advanced-usage/logging-model-events
        return LogOptions::defaults()
            ->logOnly([
                'title',
                'content',
                'status',
                'extra_data',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
        // Chain fluent methods for configuration options
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'opened_to', 'id');
    }

    public function agent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'agent_id', 'id');
    }
}
