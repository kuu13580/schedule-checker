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
        Schema::create('authenticate_history', function (Blueprint $table) {
            $table->id();
            $table->string('ip_addr')->nullable(false);
            $table->bigInteger('user_id')->unsigned()->nullable(false);
            $table->date('date')->nullable(false)->default(today());
            $table->decimal("time")->nullable(false)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authenticate_history');
    }
};
