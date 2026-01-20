import { Head } from '@inertiajs/react';

type UserSummary = {
  hadir: number;
  terlambat: number;
  cuti: number;
  hariKerja: number;
};

type Props = {
  summary?: UserSummary;
};

export default function UserDashboard({ summary }: Props) {
  const s: UserSummary = summary ?? {
    hadir: 0,
    terlambat: 0,
    cuti: 0,
    hariKerja: 0,
  };

  return (
    <>
      <Head title="Dashboard" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-slate-500">Jumlah Kehadiran</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-bold text-slate-700">{s.hadir}</h3>
              <span className="mb-1 text-sm font-semibold text-emerald-600">Hadir</span>
            </div>
            <p className="text-xs text-slate-400">
              Dari total {s.hariKerja} hari kerja
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-slate-500">Jumlah Keterlambatan</p>
             <div className="flex items-end gap-2">
              <h3 className="text-3xl font-bold text-slate-700">{s.terlambat}</h3>
              <span className="mb-1 text-sm font-semibold text-amber-500">Kali</span>
            </div>
            <p className="text-xs text-slate-400">
              Dari total {s.hariKerja} hari kerja
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col gap-2">
             <p className="text-sm font-medium text-slate-500">Jumlah Cuti</p>
             <div className="flex items-end gap-2">
              <h3 className="text-3xl font-bold text-slate-700">{s.cuti}</h3>
              <span className="mb-1 text-sm font-semibold text-blue-500">Hari</span>
            </div>
            <p className="text-xs text-slate-400">
              Dari total {s.hariKerja} hari kerja
            </p>
          </div>
        </div>
      </div>
    </>
  );
}