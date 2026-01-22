<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    protected $fillable = [
        'karyawan_id',
        'tanggal',
        'jam_masuk',
        'jam_pulang',
        'foto_masuk',
        'foto_pulang',
        'status',
        'keterangan',
    ];
    protected $table = 'absensi';

    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class);
    }
}
