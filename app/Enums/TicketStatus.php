<?php

namespace App\Enums;

enum TicketStatus: int
{
    case CREATED = 10;
    case OPEN = 20;
    case IN_PROGRESS = 30;
    case PAUSED = 40;
    case CANCELED = 50;
    case FINISHED = 60;
    case SLA_OVER = 70;

    public function color()
    {
        return match ($this) {
            self::CREATED => 'info',
            self::OPEN => 'warning',
            self::IN_PROGRESS => 'purple',
            self::PAUSED => 'gray',
            self::CANCELED => 'dark',
            self::FINISHED => 'success',
            self::SLA_OVER => 'red',
            default => 'default',
        };
    }

    public function label()
    {
        return __(str($this?->name ?? '')->apa()->headline()->apa()->toString());
    }
}
