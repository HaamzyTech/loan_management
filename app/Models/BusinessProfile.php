<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class BusinessProfile extends Model
{
    //
    protected $fillable = [
        'registration_number',
        'business_name',
        'address',
        'registration_certificate',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function loan_applications(): HasManyThrough
    {
        return $this->hasManyThrough(LoanApplications::class, User::class);
    }
}
