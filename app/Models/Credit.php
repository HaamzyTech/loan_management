<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Credit extends Model
{
    protected $fillable = [
        'loan_application_id',
        'loan_account_id',
        'status',
        'amount',
    ];

    public function application(): BelongsTo
    {
        return $this->belongsTo(LoanApplication::class,'loan_application_id', 'id');
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(LoanAccount::class,'loan_account_id', 'id');
    }

    public function repayments():HasMany
    {
        return $this->hasMany(Repayment::class);
    }
}
