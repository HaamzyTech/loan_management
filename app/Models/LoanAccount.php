<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoanAccount extends Model
{
    protected $fillable = [
        'account_number',
        'status',
        'user_id',
        'created_by',
    ];

    public function credits(): HasMany
    {
        return $this->hasMany(Credit::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
