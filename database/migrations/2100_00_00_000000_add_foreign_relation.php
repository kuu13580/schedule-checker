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
        Schema::table('users', function (Blueprint $table) {
            //
            $table->foreign('event_id')->references('id')->on('events');
        });
        Schema::table('schedules', function (Blueprint $table) {
            //
            $table->foreign('event_id')->references('id')->on('events');
            $table->foreign('user_id')->references('id')->on('users');
        });
        Schema::table('event_owner_rel', function (Blueprint $table) {
            //
            $table->foreign('event_id')->references('id')->on('events');
            $table->foreign('owner_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            //
        });
    }
};
