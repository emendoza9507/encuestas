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
        Schema::create('encuestas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by')->references('id')->on('users');
            $table->string('title', 150);
            $table->text('description');
            $table->date('start_date');
            $table->date('exp_date');
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('encuestas');
    }
};
