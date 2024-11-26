<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Credit;
use App\Models\LoanApplications;


class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userCount = DB::table('users')
                    ->where('type', '!=', 'employee') // Exclude users with type 'employee'
                    ->count();
        $clients = DB::table('loan_applications')
        ->join('users', 'loan_applications.user_id', '=', 'users.id') // Join users table
        // ->where('loan_applications.status', 'approved') // Filter by approved status
        ->select('users.type', DB::raw('COUNT(DISTINCT loan_applications.user_id) as user_count')) // Select user type and count distinct user_id
        ->groupBy('users.type') // Group by user type
        ->get();
        // DB::table('users')
        //                 ->select('type', DB::raw('COUNT(*) as user_count')) // Select type and count users
        //                 ->groupBy('type') // Group by type
        //                 ->get();
        $disbursed = DB::table('loan_applications')
                    ->where('status','approved')
                    ->sum('amount');

        return Auth::user()->isCustomer() ? 
                Redirect::route('profile.edit') 
                : Inertia::render('Dashboard',[
                    'users' => $userCount,
                    'clients' => $clients,
                    'disbursed' => $disbursed
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
        //
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
