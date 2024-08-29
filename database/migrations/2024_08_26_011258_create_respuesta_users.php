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
        Schema::create('respuesta_users', function (Blueprint $table) {
            $table->foreignId('respuesta_id')->references('id')->on('respuestas');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->string('text')->nullable();
            $table->timestamps();

            $table->primary(['respuesta_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('respuesta_users');
    }
};
