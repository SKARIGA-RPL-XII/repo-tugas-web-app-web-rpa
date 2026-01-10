<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    protected $fillable = ['nama', 'jabatan', 'status'];
    protected $table = 'karyawan';

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