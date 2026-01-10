<?php

namespace App\Http\Controllers;

use App\Models\Gaji;
use App\Models\JenisPelanggaran;
use App\Models\Kalender;
use App\Models\Karyawan;
use App\Models\PelanggaranKaryawan;
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
        return Inertia::render('Admin/pelanggaran/index', [
            'pelanggaran' => PelanggaranKaryawan::with([
                'karyawan.user',
                'jenis_pelanggaran'
            ])->latest()->get()->map(function ($p) {
                return [
                    'id' => $p->id,
                    'karyawan_id' => $p->karyawan_id,
                    'jenis_pelanggaran_id' => $p->jenis_pelanggaran_id,
                    'tanggal' => $p->tanggal,
                    'catatan' => $p->catatan,
                    'karyawan' => [
                        'nama' => $p->karyawan->user->name,
                    ],
                    'jenis_pelanggaran' => [
                        'nama' => $p->jenis_pelanggaran->nama_pelanggaran,
                    ],
                ];
            }),

            'karyawan' => Karyawan::with('user')->get()->map(fn($k) => [
                'id' => $k->id,
                'nama' => $k->user->name,
            ]),

            'jenisPelanggaran' => JenisPelanggaran::get()->map(fn($j) => [
                'id' => $j->id,
                'nama' => $j->nama_pelanggaran,
            ]),
        ]);
    }
    public function pKaryawanStore(Request $request)
    {
        $request->validate([
            'karyawan_id' => 'required|exists:karyawan,id',
            'jenis_pelanggaran_id' => 'required|exists:jenis_pelanggaran,id',
            'tanggal' => 'required|date',
            'catatan' => 'nullable|string',
        ]);

        $create = PelanggaranKaryawan::create([
            'karyawan_id' => $request->karyawan_id,
            'jenis_pelanggaran_id' => $request->jenis_pelanggaran_id,
            'tanggal' => $request->tanggal,
            'catatan' => $request->catatan,
        ]);
        if ($create) {
            return redirect()->back()->with('success', 'Pelanggaran berhasil ditambahkan');
        }
        dd($create);
    }
    public function pKaryawanUpdate(Request $request, $id)
    {
        $request->validate([
            'karyawan_id' => 'required|exists:karyawan,id',
            'jenis_pelanggaran_id' => 'required|exists:jenis_pelanggaran,id',
            'tanggal' => 'required|date',
            'catatan' => 'nullable|string',
        ]);

        $pelanggaran = PelanggaranKaryawan::findOrFail($id);

        $pelanggaran->update([
            'karyawan_id' => $request->karyawan_id,
            'jenis_pelanggaran_id' => $request->jenis_pelanggaran_id,
            'tanggal' => $request->tanggal,
            'catatan' => $request->catatan,
        ]);

        return redirect()->back()->with('success', 'Data pelanggaran berhasil diperbarui');
    }
    public function pKaryawanDestroy($id)
    {
        PelanggaranKaryawan::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Data pelanggaran berhasil dihapus');
    }
    public function gaji()
    {
        $gaji = Gaji::get();
        return Inertia::render('gaji', ['gaji' => $gaji]);
    }
}