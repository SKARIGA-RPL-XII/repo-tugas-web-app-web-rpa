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
        Schema::create(
            'gaji',
            function (Blueprint $table) {
                $table->id();
                $table->foreignId('karyawan_id')->constrained('karyawan')->cascadeOnDelete();
                $table->string('bulan');
                $table->decimal('gaji_pokok');
                $table->decimal('total_potongan')->default(0);
                $table->decimal('total_gaji');
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gaji');
    }
};