<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    protected $fillable = [
        'user_id','nip','jabatan','jenis_kelamin',
        'tanggal_lahir','departemen','tanggal_masuk','alamat'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function absensi() {
        return $this->hasMany(Absensi::class);
    }

    public function cuti() {
        return $this->hasMany(Cuti::class);
    }

    public function pelanggaran() {
        return $this->hasMany(PelanggaranKaryawan::class);
    }
}
