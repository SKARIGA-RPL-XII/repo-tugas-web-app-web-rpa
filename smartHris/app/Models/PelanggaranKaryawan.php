<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PelanggaranKaryawan extends Model
{
    protected $table = 'pelanggaran_karyawan';

    protected $fillable = [
        'karyawan_id',
        'jenis_pelanggaran_id',
        'tanggal',
        'catatan'
    ];

    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class);
    }

    public function jenisPelanggaran()
    {
        return $this->belongsTo(JenisPelanggaran::class);
    }
    public function suratPeringatan()
    {
        return $this->hasMany(SuratPeringatan::class);
    }
}