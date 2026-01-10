<?php

namespace App\Http\Controllers;

use App\Models\Gaji;
use App\Models\JenisPelanggaran;
use App\Models\Kalender;
use App\Models\SuratPeringatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function kalender()
    {
        $kalender = Kalender::get();
        return Inertia::render('Admin/kalender/index', ['kalender' => $kalender]);
    }

    public function event()
    {
        $kalender = Kalender::orderBy('tanggal')->get();
        return Inertia::render('Admin/kalender/event', ['events' => $kalender]);
    }
    public function eventStore(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date',
            'keterangan' => 'required|string|max:255',
            'jenis_hari' => 'required|in:event,libur',
        ]);

        $create = Kalender::create([
            'tanggal' => $request->tanggal,
            'keterangan' => $request->keterangan,
            'jenis_hari' => $request->jenis_hari,
        ]);
        if ($create) {
            return redirect()->route('admin.event')->with('success', 'Event berhasil ditambahkan');
        }
        return back();
    }
    public function eventUpdate(Request $request, $id)
    {
        $request->validate([
            'tanggal' => 'required|date',
            'keterangan' => 'required|string|max:255',
            'jenis_hari' => 'required|in:event,libur',
        ]);

        $event = Kalender::findOrFail($id);

        $event->update([
            'tanggal' => $request->tanggal,
            'keterangan' => $request->keterangan,
            'jenis_hari' => $request->jenis_hari,
        ]);
        if ($event) {
            return redirect()->route('admin.event')->with('success', 'Event berhasil diperbarui');
        }
        return redirect()->route('admin.event')->with('error', 'Event gagal diperbarui');
    }
    public function eventDestroy($id)
    {
        $event = Kalender::findOrFail($id);
        $event->delete();

        return redirect()->route('admin.event')->with('success', 'Event berhasil dihapus');
    }

    public function jPelanggaran()
    {
        $pelanggaran = JenisPelanggaran::get();
        return Inertia::render('jenis-pelanggaran', ['jPelanggaran' => $pelanggaran]);
    }
    public function sPeringatan()
    {
        $peringatan = SuratPeringatan::get();
        return Inertia::render('surat-peringatan', ['peringatan' => $peringatan]);
    }
    public function pKaryawan()
    {
        $pKaryawan = JenisPelanggaran::get();
        return Inertia::render('jenis-pelanggaran', ['pKaryawan' => $pKaryawan]);
    }
    public function gaji()
    {
        $gaji = Gaji::get();
        return Inertia::render('gaji', ['gaji' => $gaji]);
    }
}