<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    protected $table = 'karyawan';
    protected $fillable = [
        'user_id',
        'nip',
        'jabatan',
        'jenis_kelamin',
        'tanggal_lahir',
        'departemen',
        'tanggal_masuk',
        'alamat',
    ];

    public function absensis()
    {
        return $this->hasMany(Absensi::class);
    }

    public function cutis()
    {
        return $this->hasMany(Cuti::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}