<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kalender extends Model
{
    //
    protected $table = 'kalender';
    protected $fillable = [
        'tanggal',
        'keterangan',
        'jenis_hari',
    ];
}