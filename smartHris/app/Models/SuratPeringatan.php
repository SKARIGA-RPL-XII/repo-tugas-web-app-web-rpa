<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuratPeringatan extends Model
{
    protected $table = 'surat_peringatan';

    protected $fillable = [
        'karyawan_id',
        'pelanggaran_karyawan_id',
        'nomor_sp',
        'jenis_sp',
        'isi_pernyataan',
        'tanggal_terbit'
    ];

    protected $casts = [
        'tanggal_terbit' => 'date'
    ];

    public function pelanggaran()
    {
        return $this->belongsTo(PelanggaranKaryawan::class, 'pelanggaran_id');
    }

    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class);
    }
}