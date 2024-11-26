<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Repayment extends Model
{
    protected $fillable = [
        'date',
        'credit_id',
        'amount',
    ];


    public function credit():BelongsTo
    {
        return $this->belongsTo(Credit::class);
    }
}
