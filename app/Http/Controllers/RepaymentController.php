<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Credit;
use App\Models\Repayment;
use App\Models\LoanApplication;
use App\Models\LoanAccount;

class RepaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => ['required','date'],
            'amount' => ['required','decimal:2'],
            'credit_id' => ['required'],
        ]);

        // check validity
        $credit = Credit::find($validated['credit_id']);

        if(! $credit){
            return back()->with('error','Invalid record selected');
        }

        $totalPayback = DB::table('repayments')
                        ->where('credit_id',$credit->id)
                        ->sum('amount'); 
        // dd($totalPayback);              

        $repayment = Repayment::create([
            'date' => $validated['date'],
            'amount' => $validated['amount'],
            'credit_id' => $validated['credit_id'],
        ]);

        if(($totalPayback + $validated['amount']) >= $credit->amount ){
            $credit->status = 'closed';
            $credit->save();

            LoanAccount::where('id',$credit->loan_account_id)->update([
                'status' => 'inactive'
            ]);
        }

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
