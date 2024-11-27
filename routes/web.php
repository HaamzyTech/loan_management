<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Http\Middleware\CheckProfileCompletion;
use App\Http\Controllers\AccountProfileController;
use App\Http\Controllers\LoanApplicationController;
use App\Http\Controllers\LoanAccountController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RepaymentController;


Route::get('/', function () {

    if(Auth::user()){
        return Auth::user()->isCustomer() ? 
            Redirect::route('profile.edit') : 
            Redirect::route('dashboard');
        
    }else {
        return Redirect::route('login');
    }

    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

Route::get('/dashboard', [DashboardController::class,'index'])->middleware(['auth', 'verified',CheckProfileCompletion::class])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile',[AccountProfileController::class, 'store'])->name('account_profile.create');
    Route::get('/resource-file/{filePath}',[ProfileController::class,'downloadFile'])->name('file.download');
});

Route::middleware('auth')->group(function(){
    Route::get('/apply', [LoanApplicationController::class, 'myResource'])->name('application.view');
    Route::get('/search', [loanApplicationController::class,'clientSearch'])->name('application.search');
    Route::post('/apply', [LoanApplicationController::class, 'store'])->name('application.apply');
    Route::patch('/apply/{id}', [LoanApplicationController::class, 'update'])->name('application.update');
    
    Route::get('/applications/{status}', [LoanApplicationController::class, 'index'])->name('application.manage');
    Route::get('/search-applicant', [LoanApplicationController::class,'clientSearch'])->name('applicant.search');
    Route::patch('/applications/{id}',[LoanApplicationController::class,'edit'])->name('application.submit');
    Route::patch('/approve/{id}',[LoanApplicationController::class,'approveApplication'])->name('application.approve');
    Route::patch('/decline/{id}',[LoanApplicationController::class,'declineApplication'])->name('application.decline');
    Route::get('/approve/{status}', [LoanApplicationController::class, 'index'])->name('application.approved');
    Route::get('/decline/', [LoanApplicationController::class, 'decline'])->name('application.declined');
});

Route::middleware('auth')->group(function(){
    Route::post('/account',[LoanAccountController::class, 'store'])->name('account.create');
    Route::patch('/account/{id}',[LoanAccountController::class,'update'])->name('account.update');

    Route::post('/repayment',[RepaymentController::class,'store'])->name('repayment.create');
});

Route::middleware('auth')->group(function(){
    Route::get('/active-loans',[CreditController::class,'index'])->name('credit.view');
    Route::get('/paid/', [CreditController::class, 'paidLoans'])->name('credit.paid');
});

Route::middleware('auth')->group(function(){
    Route::get('/employees',[AdminUserController::class,'index'])->name('employee.view');
    Route::post('/employees',[AdminUserController::class,'store'])->name('employee.create');
});

require __DIR__.'/auth.php';
