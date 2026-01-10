<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    protected $table = 'karyawan';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}