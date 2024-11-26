<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class LoanApplication extends Model
{
    protected $fillable = [
        'amount',
        'repaymet_period',
        'status',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function individualProfile():HasManyThrough
    {
        return $this->hasManyThrough(IndividualProfile::class, User::class);
    }

    public function credit():HasOne
    {
        return $this->hasOne(Credit::class);
    }
}
