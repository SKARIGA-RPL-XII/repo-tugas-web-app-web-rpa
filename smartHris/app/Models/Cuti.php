<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cuti extends Model
{
    protected $table = 'cuti';
    protected $fillable = [
        'karyawan_id',
        'tanggal_mulai',
        'tanggal_selesai',
        'jumlah_hari',
        'alasan',
        'status'
    ];

    public function karyawan()
    {
         return $this->belongsTo(Karyawan::class, 'karyawan_id', 'id');
    }
}

