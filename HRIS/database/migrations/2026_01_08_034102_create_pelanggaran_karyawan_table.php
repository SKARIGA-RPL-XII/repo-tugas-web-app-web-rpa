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
            'pelanggaran_karyawan',
            function (Blueprint $table) {
                $table->id();
                $table->foreignId('karyawan_id')->constrained('karyawan')->cascadeOnDelete();
                $table->foreignId('jenis_pelanggaran_id')->constrained('jenis_pelanggaran')->cascadeOnDelete();
                $table->date('tanggal');
                $table->text('catatan')->nullable();
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelanggaran_karyawan');
    }
};