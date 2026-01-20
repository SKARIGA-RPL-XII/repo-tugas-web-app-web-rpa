<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Cuti;
use App\Models\JenisPelanggaran;
use App\Models\Kalender;
use App\Models\Karyawan;
use App\Models\PelanggaranKaryawan;
use App\Models\SuratPeringatan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{

    /* ========= SABIL ========= */
    /* ========= KARYAWAN ========= */
    public function indexKaryawan()
    {
        $karyawan = Karyawan::with('user')->orderBy('nip', 'desc')->get()->map(function ($item) {
            $isPasswordDefault = $item->user && password_verify($item->nip, $item->user->password);

            return [
                'id'             => $item->id,
                'nama'           => $item->user->name ?? '-',
                'email'          => $item->user->email ?? '',
                'nip'            => $item->nip ?? '-',
                'jabatan'        => $item->jabatan ?? '-',
                'departemen'     => $item->departemen ?? '-',
                'alamat'         => $item->alamat ?? '-',
                'tanggal_masuk'  => $item->tanggal_masuk,
                'tanggal_lahir'  => $item->tanggal_lahir,
                'jenis_kelamin'  => $item->jenis_kelamin,
                'is_password_default' => $isPasswordDefault,
            ];
        });

        return Inertia::render('Admin/karyawan/index', [
            'karyawan' => $karyawan,
            'jenisPelanggaranList' => JenisPelanggaran::select('id', 'nama_pelanggaran')->get(),
        ]);
    }
    public function storeKaryawan(Request $request)
    {
        $request->validate([
            'nama'           => 'required|string|max:255',
            'email'          => 'required|email|unique:users,email',
            'jabatan'        => 'required|string',
            'jenis_kelamin'  => 'required|in:L,P',
            'tanggal_lahir'  => 'required|date',
            'departemen'     => 'required|string',
            'alamat'         => 'required|string',
        ]);

        DB::transaction(function () use ($request) {

            $lastKaryawan = Karyawan::where('nip', 'like', 'K%')->orderBy('nip', 'desc')->lockForUpdate()->first();

            $lastNumber = $lastKaryawan
                ? (int) substr($lastKaryawan->nip, 1)
                : 0;

            $nip = 'K' . str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
            $password = Carbon::parse($request->tanggal_lahir)->format('dmY');

            $user = User::create([
                'name'     => $request->nama,
                'email'    => $request->email,
                'password' => bcrypt($password),
                'role'     => 'user',
            ]);

            Karyawan::create([
                'user_id'        => $user->id,
                'nip'            => $nip,
                'jabatan'        => $request->jabatan,
                'jenis_kelamin'  => $request->jenis_kelamin,
                'tanggal_lahir'  => $request->tanggal_lahir,
                'departemen'     => $request->departemen,
                'alamat'         => $request->alamat,
                'tanggal_masuk'  => Carbon::now()->toDateString(),
            ]);
        });

        return redirect()->route('admin.karyawan')->with('success', 'Karyawan berhasil ditambahkan');
    }

    public function updateKaryawan(Request $request, $id)
    {
        $karyawan = Karyawan::findOrFail($id);

        $request->validate([
            'nama'           => 'required',
            'email'          => 'required|email|unique:users,email,' . $karyawan->user_id,
            'jabatan'        => 'required',
            'jenis_kelamin'  => 'required|in:L,P',
            'tanggal_lahir'  => 'required|date',
            'departemen'     => 'required',
            'alamat'         => 'required',
        ]);

        $karyawan->user->update([
            'name'  => $request->nama,
            'email' => $request->email,
        ]);

        $karyawan->update([
            'jabatan'       => $request->jabatan,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'departemen'    => $request->departemen,
            'alamat'        => $request->alamat,
        ]);

        return back()->with('success', 'Karyawan diperbarui');
    }
    public function destroyKaryawan($id)
    {
        $karyawan = Karyawan::findOrFail($id);

        DB::transaction(function () use ($karyawan) {
            $karyawan->user()->delete();
            $karyawan->delete();
        });

        return redirect()->route('admin.karyawan')->with('success', 'Data karyawan berhasil dihapus');
    }
    public function resetPassword($id)
    {
        Log::info("Reset password called for karyawan ID: $id");

        $karyawan = Karyawan::find($id);

        if (!$karyawan) {
            throw ValidationException::withMessages([
                'error' => 'Data karyawan tidak ditemukan.'
            ]);
        }

        $user = $karyawan->user;

        if (!$user) {
            throw ValidationException::withMessages([
                'error' => 'User tidak ditemukan.'
            ]);
        }

        // Cek apakah mereset diri sendiri
        if ($user->id === Auth::id()) {
            throw ValidationException::withMessages([
                'error' => 'Tidak dapat mereset password akun sendiri.'
            ]);
        }

        if (!$karyawan->nip) {
            throw ValidationException::withMessages([
                'error' => 'NIP karyawan tidak valid (kosong).'
            ]);
        }

        try {
            $user->update([
                'password' => bcrypt($karyawan->tanggal_lahir),
            ]);

            Log::info("Password reset successfully for user ID: " . $user->id);

            return redirect()->back()->with('success', 'Password berhasil direset ke Tanggal Lahir.');
        } catch (\Exception $e) {
            Log::error("Error resetting password: " . $e->getMessage());

            throw ValidationException::withMessages([
                'error' => 'Gagal mereset password: ' . $e->getMessage()
            ]);
        }
    }

    /* ========= ABSENSI ========= */

    public function indexAbsensi(Request $request)
    {
        $tanggal = $request->query('tanggal');

        $query = Absensi::query()
            ->join('karyawan', 'absensi.karyawan_id', '=', 'karyawan.id')
            ->join('users', 'karyawan.user_id', '=', 'users.id')
            ->select(
                'absensi.id',
                'absensi.tanggal',
                'absensi.jam_masuk',
                'absensi.jam_pulang',
                'absensi.status',
                'users.name as nama',
                'karyawan.jabatan',
                'karyawan.departemen'
            )->orderBy('absensi.tanggal', 'desc')->orderBy('absensi.jam_masuk');

        if ($tanggal) {
            $query->whereDate('absensi.tanggal', $tanggal);
        }

        $absensi = $query->get()->map(function ($item) {
            $batasMasuk = Carbon::createFromTime(8, 30);

            if ($item->jam_masuk) {
                $jamMasuk = Carbon::parse($item->jam_masuk);

                if ($jamMasuk->greaterThan($batasMasuk)) {
                    $totalMenit = $batasMasuk->diffInMinutes($jamMasuk);

                    $jam   = intdiv($totalMenit, 60);
                    $menit = $totalMenit % 60;

                    if ($jam > 0) {
                        $item->keterangan =
                            $menit > 0
                            ? "Terlambat {$jam} jam {$menit} menit"
                            : "Terlambat {$jam} jam";
                    } else {
                        $item->keterangan = "Terlambat {$menit} menit";
                    }
                } else {
                    $item->keterangan = 'Tepat waktu';
                }
            } else {
                $item->keterangan = 'Tidak hadir';
            }
            return $item;
        });

        return Inertia::render('Admin/karyawan/absensi-karyawan', [
            'tanggal' => $tanggal,
            'absensi' => $absensi,
        ]);
    }

    /* ========= CUTI ========= */

    public function indexCuti()
    {
        $cutiData = Cuti::with('karyawan.user')->latest()->get()
            ->map(function ($cuti) {
                return [
                    'id' => $cuti->id,

                    'karyawan_id' => $cuti->karyawan_id,
                    'karyawan_nama' => $cuti->karyawan->user->name ?? '-',
                    'karyawan_email' => $cuti->karyawan->user->email ?? '-',
                    'karyawan_nip' => $cuti->karyawan->nip ?? '-',
                    'karyawan_jabatan' => $cuti->karyawan->jabatan ?? '-',

                    'karyawan_departemen' => $cuti->karyawan->departemen ?? '-',

                    'tanggal_mulai' => $cuti->tanggal_mulai,
                    'tanggal_selesai' => $cuti->tanggal_selesai,
                    'jumlah_hari' => $cuti->jumlah_hari,
                    'jenis_cuti' => $cuti->jenis_cuti,
                    'alasan' => $cuti->alasan,

                    'status' => $cuti->status,
                    'keterangan' => $cuti->keterangan,

                    'created_at' => $cuti->created_at,
                    'updated_at' => $cuti->updated_at,
                ];
            });

        return Inertia::render('Admin/cuti/index', [
            'cutiData' => $cutiData,
        ]);
    }


    public function approveCuti($id)
    {
        Cuti::findOrFail($id)->update(['status' => 'disetujui']);
        return redirect()->route('admin.cuti');
    }

    public function rejectCuti($id)
    {
        Cuti::findOrFail($id)->update(['status' => 'ditolak']);
        return redirect()->route('admin.cuti');
    }

    /* ========= DAUS ========= */
    /* ========= KALENDER + EVENT ========= */
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

    /* ========= JENIS PELANGGARAN ========= */

    public function jPelanggaran()
    {
        $pelanggaran = JenisPelanggaran::get();
        // return $pelanggaran;
        return Inertia::render('Admin/pelanggaran/jenis-pelanggaran', ['jPelanggaran' => $pelanggaran]);
    }
    public function jPelanggaranStore(Request $request)
    {
        $request->validate([
            'nama_pelanggaran' => 'required|string',
            'tingkat' => 'required|string',
            'potongan' => 'required|numeric',
            'keterangan' => 'nullable|string'
        ]);

        JenisPelanggaran::create($request->all());

        return back()->with('success', 'Jenis pelanggaran berhasil ditambahkan');
    }
    public function jPelanggaranUpdate(Request $request, $id)
    {
        $request->validate([
            'nama_pelanggaran' => 'required|string',
            'tingkat' => 'required|string',
            'potongan' => 'required|numeric',
            'keterangan' => 'nullable|string'
        ]);

        JenisPelanggaran::findOrFail($id)->update($request->all());

        return back()->with('success', 'Data berhasil diupdate');
    }
    public function jPelanggaranDestroy($id)
    {
        JenisPelanggaran::findOrFail($id)->delete();

        return back()->with('success', 'Data berhasil dihapus');
    }

    /* ========= PELANGGARAN KARYAWAN ========= */

    public function pKaryawan()
    {
        return Inertia::render('Admin/pelanggaran/index', [
            'pelanggaran' => PelanggaranKaryawan::with([
                'karyawan.user',
                'jenisPelanggaran'
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
                        'nama' => $p->jenisPelanggaran->nama_pelanggaran,
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
        if ((int) $request->sp != 0) {
            SuratPeringatan::create([
                'karyawan_id' => $request->karyawan_id,
                'pelanggaran_karyawan_id' => $create->id,
                'tanggal' => $request->tanggal,
                'isi_pernyataan' => $request->catatan,
            ]);
        }
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

    /* ========= SP ========= */

    public function sp()
    {
        $pelanggaran = PelanggaranKaryawan::with([
            'karyawan.user',
            'jenisPelanggaran',
            'suratPeringatan'
        ])->get();
        return $pelanggaran;
        return Inertia::render('Admin/pelanggaran/surat-peringatan', ['pelanggaran' => $pelanggaran]);
    }
    public function spStore(Request $request)
    {
        $request->validate([
            'pelanggaran_id' => 'required',
            'tingkat_sp' => 'required',
        ]);

        $last = SuratPeringatan::latest()->first();
        $nomor = 'SP-' . str_pad(($last?->id ?? 0) + 1, 4, '0', STR_PAD_LEFT);

        $pelanggaran = PelanggaranKaryawan::findOrFail($request->pelanggaran_id);

        SuratPeringatan::create([
            'karyawan_id' => $pelanggaran->karyawan_id,
            'pelanggaran_karyawan_id' => $pelanggaran->id,
            'nomor_sp' => $nomor,
            'jenis_sp' => $request->tingkat_sp,
            'isi_pernyataan' => $request->isi_pernyataan ?: 'Belum diisi',
            'tanggal_terbit' => Carbon::now(),
        ]);

        return redirect()->back();
    }
    public function spDestroy($id)
    {
        SuratPeringatan::findOrFail($id)->delete();
        return back()->with('success', 'Surat Pernyataan dihapus');
    }
}