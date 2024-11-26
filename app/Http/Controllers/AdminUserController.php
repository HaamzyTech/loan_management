<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\IndividualProfile;
use App\Models\User;
use App\Models\Role;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Users/Employees',[
            'users' => IndividualProfile::with(['user','user.roles'])
                                            ->whereHas('user',function($query){
                                                $query->where('type','employee');
                                            })
                                            ->orderBy('firstName','ASC')
                                            ->orderBy('otherNames','ASC')
                                            ->orderBy('LastName','ASC')
                                            ->get(),
            'roles' => Role::all(),
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
        $validated = $request->validate([
            'firstName' => ['required','string','min:2','max:100'],
            'lastName' => ['required','string','min:2','max:100'],
            'otherName' => ['nullable','string'],
            'nrc' => ['required','string','min:11','max:11'],
            'dob' => ['required','date'],
            'role'=> ['required','string'],
            'nationality' => ['string'],
            'gender' => ['required','string'],
            'nrc_front' => ['required','mimes:jpeg,jpg,png,pdf'],
            'nrc_back' => ['required','mimes:jpeg,jpg,png,pdf'],
            'email' => ['required','email'],
        ]);

        $nrc_front_path = $request->file('nrc_front')->storeAs(
            'Uploads/Clients/Individual', stripslashes($validated['nrc']).$validated['firstName'].date("Y-m-d-His")
        );
        $nrc_back_path = $request->file('nrc_back')->storeAs(
            'Uploads/Clients/Individual', stripslashes($validated['nrc']).$validated['firstName'].date("Y-m-d-His")
        );

        $user = User::create([
            'email' => $validated['email'],
            'name' => $validated['firstName']." ".$validated['otherName']." ".$validated['lastName'],
            'password' => Hash::make($validated['nrc']),
            'type' => 'employee',
        ]);

        $userRole = Role::where('name', $validated['role'])->first();

        if($userRole){
            $user->roles()->attach($userRole->id);
        }

        $profile = IndividualProfile::create([
            'firstName' => $validated['firstName'],
            'lastName' => $validated['lastName'],
            'otherNames' => $validated['otherName'],
            'nrc' => $validated['nrc'],
            'dob' => $validated['dob'],
            'nationality' => $validated['nationality'],
            'gender' => $validated['gender'],
            'nrc_front' => $nrc_front_path,
            'nrc_back' => $nrc_back_path,
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
