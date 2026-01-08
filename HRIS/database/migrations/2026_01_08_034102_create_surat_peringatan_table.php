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
            'surat_peringatan',
            function (Blueprint $table) {
                $table->id();
                $table->foreignId('karyawan_id')->constrained('karyawan')->cascadeOnDelete();
                $table->foreignId('pelanggaran_id')->constrained('pelanggaran_karyawan')->cascadeOnDelete();
                $table->string('nomor_sp');
                $table->enum('jenis_sp', ['SP1', 'SP2', 'SP3']);
                $table->date('tanggal_terbit');
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_peringatan');
    }
};