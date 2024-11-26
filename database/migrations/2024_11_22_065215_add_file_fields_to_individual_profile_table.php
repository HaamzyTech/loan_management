<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('individual_profiles', function (Blueprint $table) {
            $table->string("nrc_front");
            $table->string("nrc_back");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('individual_profiles', function (Blueprint $table) {
            $table->dropColumn('nrc_front');
            $table->dropColumn('nrc_back');
        });
    }
};
