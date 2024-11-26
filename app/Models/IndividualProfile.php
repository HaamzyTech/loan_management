<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IndividualProfile extends Model
{
    protected $fillable = [
        'firstName',
        'lastName',
        'otherNames',
        'nrc',
        'nationality',
        'dob',
        'gender',
        'user_id',
        'type',
        'nrc_front',
        'nrc_back',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
