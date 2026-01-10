<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Karyawan;
use App\Models\Absensi;
use App\Models\Cuti;


class AdminController extends Controller
{
    /* ========= KARYAWAN ========= */
    public function indexKaryawan()
    {
        return Karyawan::all();
    }

    public function storeKaryawan(Request $request)
    {
        return Karyawan::create($request->only('nama', 'jabatan'));
    }

    public function updateKaryawan(Request $request, $id)
    {
        $karyawan = Karyawan::findOrFail($id);
        $karyawan->update($request->only('nama', 'jabatan', 'status'));
        return $karyawan;
    }

    public function destroyKaryawan($id)
    {
        Karyawan::findOrFail($id)->delete();
        return response()->json(['message' => 'Karyawan dihapus']);
    }

   /* ========= ABSENSI ========= */

public function indexAbsensi()
{
    return Absensi::with('karyawan')->get();
}

public function updateAbsensi(Request $request, $id)
{
    $absensi = Absensi::findOrFail($id);
    $absensi->update($request->only('status'));
    return $absensi;
}

public function destroyAbsensi($id)
{
    Absensi::findOrFail($id)->delete();
    return response()->json(['message' => 'Absensi dihapus']);
}

    /* ========= CUTI ========= */
    public function indexCuti()
    {
        return Cuti::with('karyawan')->get();
    }

    public function approveCuti($id)
    {
        Cuti::findOrFail($id)->update(['status' => 'approved']);
        return response()->json(['message' => 'Cuti disetujui']);
    }

    public function rejectCuti($id)
    {
        Cuti::findOrFail($id)->update(['status' => 'rejected']);
        return response()->json(['message' => 'Cuti ditolak']);
    }
}
