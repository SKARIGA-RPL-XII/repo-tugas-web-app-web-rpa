<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Cuti;
use App\Models\Karyawan;
use App\Models\PelanggaranKaryawan;
use App\Models\SuratPeringatan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserController extends Controller
{
    private string $jamMasukAkhir = '08:00:00';
    private string $jamPulangMulai = '17:00:00';

    public function profileUpdate(Request $request)
    {
        $karyawan = Karyawan::where('user_id', auth()->id())->firstOrFail();

        $validated = $request->validate([
            'nama'           => 'required|string|max:100',
            'jenis_kelamin'  => 'required|in:Laki-laki,Perempuan',
            'tanggal_lahir'  => 'required|date',
            'alamat'         => 'nullable|string',
            'departemen_id'  => 'required|exists:departemen,id',
        ]);

        $karyawan->update($validated);

        return response()->json([
            'message' => 'Profil berhasil diperbarui'
        ]);
    }
    public function absensi()
    {
        $user = auth()->user();
        $karyawan = $user->karyawan;

        $today = Carbon::today();

        // Jadwal kerja (hanya untuk tampilan)
        $jadwalMasuk = Carbon::createFromTime(8, 0);
        $jadwalPulang = Carbon::createFromTime(17, 0);

        $absensiHariIni = Absensi::where('karyawan_id', $karyawan->id)->whereDate('tanggal', $today)->first();

        $status = $absensiHariIni?->status;
        $keterangan = $absensiHariIni?->keterangan;

        $canAbsenMasuk = !$absensiHariIni;
        $canAbsenPulang = $absensiHariIni && $absensiHariIni->jam_masuk && !$absensiHariIni->jam_pulang;
        $canCuti = !$absensiHariIni;

        return Inertia::render('User/absensi', [
            'user' => [
                'name' => $user->name,
            ],

            'tanggalHariIni' => $today->translatedFormat('l, d F Y'),

            'absensiHariIni' => $absensiHariIni ? [
                'status' => $status,
                'keterangan' => $keterangan,
                'jamMasuk' => $absensiHariIni->jam_masuk,
                'jamPulang' => $absensiHariIni->jam_pulang,
            ] : null,

            'jadwalKerja' => [
                'jamMasuk' => $jadwalMasuk->format('H:i'),
                'jamPulang' => $jadwalPulang->format('H:i'),
            ],

            'canAbsenMasuk' => $canAbsenMasuk,
            'canAbsenPulang' => $canAbsenPulang,
            'canCuti' => $canCuti,
        ]);
    }
    public function masukStore(Request $request)
    {
        $request->validate([
            'foto' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $karyawan = auth()->user()->karyawan;
        $today = now()->toDateString();
        $now = now()->toTimeString();

        $cuti = Cuti::where('karyawan_id', $karyawan->id)->where('tanggal_mulai', '<=', $today)->where('tanggal_selesai', '>=', $today)->exists();

        if ($cuti) {
            Absensi::updateOrCreate(
                [
                    'karyawan_id' => $karyawan->id,
                    'tanggal' => $today,
                ],
                [
                    'status' => 'cuti',
                ]
            );

            return response()->json(['message' => 'Anda sedang cuti']);
        }

        $absen = Absensi::where('karyawan_id', $karyawan->id)->where('tanggal', $today)->first();

        if ($absen && $absen->jam_masuk) {
            return response()->json(['message' => 'Sudah absen masuk'], 400);
        }

        // ⛔ TERLAMBAT
        if ($now > $this->jamMasukAkhir) {
            Absensi::updateOrCreate(
                [
                    'karyawan_id' => $karyawan->id,
                    'tanggal' => $today,
                ],
                [
                    'status' => 'alpha',
                ]
            );

            return response()->json(['message' => 'Terlambat, status alpha'], 403);
        }

        // 📸 SIMPAN FOTO
        $file = $request->file('foto');
        $filename = 'masuk_' . $karyawan->id . '_' . time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('images/absensi/masuk'), $filename);

        Absensi::updateOrCreate(
            [
                'karyawan_id' => $karyawan->id,
                'tanggal' => $today,
            ],
            [
                'jam_masuk' => $now,
                'foto_masuk' => $filename,
                'status' => 'hadir',
            ]
        );

        return response()->json(['message' => 'Absen masuk berhasil']);
    }
    public function pulangStore(Request $request)
    {
        $request->validate([
            'foto' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $karyawan = auth()->user()->karyawan;
        $today = now()->toDateString();
        $now = now()->toTimeString();

        $absen = Absensi::where('karyawan_id', $karyawan->id)
            ->where('tanggal', $today)
            ->first();

        if (!$absen || !$absen->jam_masuk) {
            return response()->json(['message' => 'Belum absen masuk'], 400);
        }

        if ($absen->jam_pulang) {
            return response()->json(['message' => 'Sudah absen pulang'], 400);
        }

        if ($now < $this->jamPulangMulai) {
            return response()->json(['message' => 'Belum waktunya pulang'], 403);
        }

        // 📸 SIMPAN FOTO
        $file = $request->file('foto');
        $filename = 'pulang_' . $karyawan->id . '_' . time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('images/absensi/pulang'), $filename);

        $absen->update([
            'jam_pulang' => $now,
            'foto_pulang' => $filename,
        ]);

        return response()->json(['message' => 'Absen pulang berhasil']);
    }
    public function autoAlpha()
    {
        $karyawan = auth()->user()->karyawan;
        $yesterday = now()->subDay()->toDateString();

        $absen = Absensi::where('karyawan_id', $karyawan->id)
            ->where('tanggal', $yesterday)
            ->first();

        if (!$absen) {
            Absensi::create([
                'karyawan_id' => $karyawan->id,
                'tanggal' => $yesterday,
                'status' => 'alpha',
            ]);
        }
    }
    public function riwayat(Request $request)
    {
        $user = auth()->user();
        $karyawan = $user->karyawan;

        $query = Absensi::where('karyawan_id', $karyawan->id)
            ->orderBy('tanggal', 'desc');

        if ($request->filled('bulan')) {
            $bulan = Carbon::parse($request->bulan);
            $query->whereMonth('tanggal', $bulan->month)->whereYear('tanggal', $bulan->year);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('keterangan')) {
            $query->where('keterangan', $request->keterangan);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('status', 'like', "%{$request->search}%")->orWhere('keterangan', 'like', "%{$request->search}%");
            });
        }

        //jangan lupa atur paginationnya
        $absensi = $query->paginate(5)->withQueryString();

        return Inertia::render('User/absensi/riwayat', [
            'absensi' => $absensi->through(fn($item) => [
                'id'          => $item->id,
                'tanggal'     => Carbon::parse($item->tanggal)->translatedFormat('d F Y'),
                'jam_masuk'   => $item->jam_masuk ?? '-',
                'jam_pulang'  => $item->jam_pulang ?? '-',
                'status'      => ucfirst($item->status),
                'keterangan'  => $item->keterangan ?? 'Tanpa Keterangan',
            ]),

            // kirim balik filter supaya tidak reset di UI
            'filters' => $request->only([
                'bulan',
                'status',
                'keterangan',
                'search'
            ]),
        ]);
    }
    public function pelanggaran(Request $request)
    {
        $karyawan = auth()->user()->karyawan;

        $query = PelanggaranKaryawan::with('jenisPelanggaran')->where('karyawan_id', $karyawan->id)->orderBy('tanggal', 'desc');

        if ($request->filled('bulan')) {
            $bulan = Carbon::parse($request->bulan);
            $query->whereMonth('tanggal', $bulan->month)->whereYear('tanggal', $bulan->year);
        }

        if ($request->filled('tingkat_pelanggaran')) {
            $query->whereHas('jenisPelanggaran', function ($q) use ($request) {
                $q->where('tingkat', $request->tingkat_pelanggaran);
            });
        }

        if ($request->filled('search')) {
            $query->where('keterangan', 'like', "%{$request->search}%");
        }

        $pelanggaran = $query->paginate(5)->withQueryString();

        $summaryQuery = PelanggaranKaryawan::where('karyawan_id', $karyawan->id)->whereMonth('tanggal', now()->month)->whereYear('tanggal', now()->year);

        $summary = [
            'total' => $summaryQuery->count(),
            'ringan' => (clone $summaryQuery)->whereHas('jenisPelanggaran', fn($q) => $q->where('tingkat', 'ringan'))->count(),
            'berat' => (clone $summaryQuery)->whereHas('jenisPelanggaran', fn($q) => $q->where('tingkat', 'berat'))->count(),
        ];

        return Inertia::render('User/Pelanggaran', [
            'summary' => $summary,

            'pelanggaran' => $pelanggaran->through(fn($item) => [
                'id' => $item->id,
                'tanggal' => Carbon::parse($item->tanggal)->translatedFormat('d F Y'),
                'status' => ucfirst($item->status),
                'tingkat_pelanggaran' => ucfirst($item->jenisPelanggaran->tingkat),

                'sanksi' => $item->keterangan ?? '-',
            ]),

            'filters' => $request->only([
                'bulan',
                'tingkat_pelanggaran',
                'search'
            ]),
        ]);
    }
    public function cuti(Request $request)
    {
        $query = Cuti::query()
            ->where('karyawan_id', auth()->user()->karyawan->id);

        if ($request->filled('bulan')) {
            $query->whereMonth('created_at', substr($request->bulan, 5, 2))
                ->whereYear('created_at', substr($request->bulan, 0, 4));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $query->where('alasan', 'like', '%' . $request->search . '%');
        }

        $cuti = $query->orderBy('tanggal_pengajuan', 'desc')->paginate(10);

        return response()->json($cuti);
    }
    public function cutiStore(Request $request)
    {
        $request->validate([
            'tanggal_mulai'   => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'alasan'          => 'required|string',
        ]);

        $tanggalMulai   = Carbon::parse($request->tanggal_mulai);
        $tanggalSelesai = Carbon::parse($request->tanggal_selesai);

        // HITUNG JUMLAH HARI (INKLUSIF)
        $jumlahHari = $tanggalMulai->diffInDays($tanggalSelesai) + 1;

        Cuti::create([
            'karyawan_id'    => auth()->user()->karyawan->id,
            'tanggal_mulai'  => $tanggalMulai,
            'tanggal_selesai' => $tanggalSelesai,
            'jumlah_hari'    => $jumlahHari,
            'alasan'         => $request->alasan,
            'status'         => 'pending',
        ]);

        return back()->with('success', 'Pengajuan cuti berhasil dikirim');
    }
}