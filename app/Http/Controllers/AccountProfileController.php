<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\IndividualProfile;
use App\Models\BusinessProfile;

class AccountProfileController extends Controller
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
        $user = Auth::user();

        if ($request->type == "business"){
            
            $validated = $request->validate([
                'registration_number' => ['required','string'],
                'business_name' => ['required','string'],
                'address' => ['required','string'],
                'registration_certificate' => ['required','mimes:jpeg,jpg,png,pdf'],
            ]);

            $path = $request->file('registration_certificate')->storeAs(
                'Uploads/Clients/Business', $validated['registration_number'].$validated['business_name']
            );

            $profile = BusinessProfile::create([
                'registration_number' => $validated['registration_number'],
                'business_name' => $validated['business_name'],
                'address' => $validated['address'],
                'registration_certificate' => $path,
                'user_id' => $user->id,
            ]);

            $user->type = "business";
            $user->save();

        }else if($request->type == "individual"){
            
            $validated = $request->validate([
                'firstName' => ['required','string','min:2','max:100'],
                'lastName' => ['required','string','min:2','max:100'],
                'otherName' => ['nullable','string'],
                'nrc' => ['required','string','min:11','max:11'],
                'dob' => ['required','date'],
                'nationality' => ['string'],
                'gender' => ['required','string'],
                'nrc_front' => ['required','mimes:jpeg,jpg,png,pdf'],
                'nrc_back' => ['required','mimes:jpeg,jpg,png,pdf'],
            ]);

            $nrc_front_path = $request->file('nrc_front')->storeAs(
                'Uploads/Clients/Individual', stripslashes($validated['nrc']).$validated['firstName'].date("Y-m-d-His")
            );
            $nrc_back_path = $request->file('nrc_back')->storeAs(
                'Uploads/Clients/Individual', stripslashes($validated['nrc']).$validated['firstName'].date("Y-m-d-His")
            );

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

            $user->type = "individual";
            $user->save();

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
