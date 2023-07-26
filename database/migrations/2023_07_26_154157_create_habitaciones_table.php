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
        Schema::create('habitaciones', function (Blueprint $table) {
            $table->id();

            $table->tinyInteger('cantidad')->default(0);
            
            $table->foreignId('hotel_id')->constrained('hoteles');
            $table->foreignId('acomodacion_tipo_habitacion_id')->constrained('acomodacion_tipo_habitaciones');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habitaciones');
    }
};
