<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\LoanApplication;
use App\Models\LoanAccount;
use App\Models\Credit;

class LoanApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($status)
    {

        return Inertia::render('LoanApplication/ManageApplications',[
            'applications' => LoanApplication::with(['user.individualProfile','user.businessProfile','user.loanAccount'])->where('status',$status)->orderBy('created_at','ASC')->get(),
            'status' => $status,
        ]);
    }

    /**
     * Allow clients to search by how much.
     */
    public function clientSearch(Request $request)
    {
        $query = $request->input('query');

        return Inertia::render('LoanApplication/Apply',[
            'applications' => LoanApplication::where('user_id',Auth::user()->id)
                                            ->where('status','submitted')
                                            ->where('amount',$query)
                                            ->orderBy('created_at','ASC')->get()
        ]);
    }


    /**
     * Allow clients to search by how much.
     */
    public function applicantSearch(Request $request, $status)
    {
        $query = $request->input('query');

        return Inertia::render('LoanApplication/ManageApplications',[
            'applications' => LoanApplication::with(['user.individualProfile','user.businessProfile','user.loanAccount'])
                                                ->where('status',$status)
                                                ->whereHas('user', function ($query) use ($keyword) {
                                                    $query->where('name', 'like', "%{$keyword}%");
                                                })
                                                ->orderBy('created_at','ASC')->get(),
            'status' => $status,
        ]);

        return Inertia::render('LoanApplication/Apply',[
            'applications' => LoanApplication::where('user_id',Auth::user()->id)
                                            ->where('status','submitted')
                                            ->where('amount',$query)
                                            ->orderBy('created_at','ASC')->get()
        ]);
    }

    /**
     * Display a list of the resource for the current user
     */
    public function myResource()
    {
        $hasLoan = Credit::where('status', 'running')
            ->whereIn('loan_account_id', LoanAccount::where('user_id', Auth::user()->id)->pluck('id'))
            ->exists();

        return Inertia::render('LoanApplication/Apply',[
            'applications' => LoanApplication::where('user_id',Auth::user()->id)->orderBy('created_at','DESC')->get(),
            'hasLoan' => $hasLoan
        ]);
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
        $user = Auth::user();

        $validated = $request->validate([
            'amount' => ['required','decimal:2','min:1','max:500000'],
            'repaymet_period' => ['required','integer','min:1','max:12'],
        ]);

        $application = LoanApplication::create([
            'amount' => $validated['amount'],
            'repaymet_period' => $validated['repaymet_period'],
            'status' => 'submitted',
            'user_id' => $user->id,
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
     * Display the specified resource.
     */
    public function approveApplication(string $id)
    {
        $application = LoanApplication::findOrFail($id);

        $credit = Credit::create([
            'loan_application_id' => $application->id,
            'loan_account_id' => $application->user->loanAccount->id,
            'status' => 'running',
            'amount' => $application->amount,
        ]);

        $application->status = 'approved';
        $application->save();

        return back();

    }

    /**
     * Display the specified resource.
     */
    public function declineApplication(string $id)
    {
        $application = LoanApplication::findOrFail($id);

        $application->status = 'rejected';
        $application->save();

        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $application = LoanApplication::findOrFail($id);

        $application->status = 'reviewed';
        $application->save();

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $application = LoanApplication::find($id);

        $validated = $request->validate([
            'amount' => ['decimal:2','min:1','max:500000'],
            'repaymet_period' => ['integer','min:1','max:12'],
        ]);

        $application->amount = $validated['amount'];
        $application->repaymet_period = $validated['repaymet_period'];

        $application->save();

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
