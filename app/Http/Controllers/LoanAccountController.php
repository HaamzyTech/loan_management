<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\LoanApplication;
use App\Models\LoanAccount;


class LoanAccountController extends Controller
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
            'account_number' => ['required','string'],
            'status' => ['required','string'],
            'user_id' => ['required'],
        ]);

        $account = LoanAccount::create([
            'account_number' => $validated['account_number'],
            'status' => $validated['status'],
            'user_id' => $validated['user_id'],
            'created_by' => Auth::user()->id,
        ]);

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
        $account = LoanAccount::find($id);

        $validated = $request->validate([
            'account_number' => ['required','string'],
            'status' => ['required','string'],
            'user_id' => ['required'],
        ]);

        $account->status = $validated['status'];
        $account->save();

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
