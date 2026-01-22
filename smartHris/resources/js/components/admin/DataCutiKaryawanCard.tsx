import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type CutiData = {
    id: number;
    user_id: string;
    jabatan: string;
    departemen: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    durasi: string;
    keterangan: string;
};

type DataCutiKaryawanCardProps = {
    data: CutiData[];
    currentPage?: number;
    totalPages?: number;
    itemsPerPage?: number;
    onPageChange?: (page: number) => void;
    onItemsPerPageChange?: (items: number) => void;
    onSearch?: (query: string) => void;
};

export default function DataCutiKaryawanCard({
    data,
    currentPage = 1,
    totalPages = 1,
    itemsPerPage = 5,
    onPageChange,
    onItemsPerPageChange,
    onSearch,
}: DataCutiKaryawanCardProps) {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#0D4838]">
                    Data Cuti Karyawan
                </h2>
                <div className="relative w-64">
                    <Icon
                        icon="mdi:magnify"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        width="20"
                        height="20"
                    />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="pl-10"
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                No
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Karyawan
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Jabatan
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Departemen
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Tanggal Cuti
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Durasi
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Keterangan
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                    {item.user_id}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {item.jabatan}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {item.departemen}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    <div className="space-y-1">
                                        <div>
                                            <span className="font-medium">Mulai:</span>{' '}
                                            {item.tanggal_mulai}
                                        </div>
                                        <div>
                                            <span className="font-medium">Selesai:</span>{' '}
                                            {item.tanggal_selesai}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {item.durasi}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {item.keterangan}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                                        >
                                            <Icon
                                                icon="mdi:check"
                                                width="20"
                                                height="20"
                                            />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                                        >
                                            <Icon
                                                icon="mdi:close"
                                                width="20"
                                                height="20"
                                            />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Show</span>
                    <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) =>
                            onItemsPerPageChange?.(parseInt(value))
                        }
                    >
                        <SelectTrigger className="h-8 w-16">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    <span>per page</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                        1-{itemsPerPage} of {totalPages}
                    </span>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onPageChange?.(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <Icon icon="mdi:chevron-left" width="20" height="20" />
                        </Button>
                        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
                            <Button
                                key={i + 1}
                                variant={currentPage === i + 1 ? 'default' : 'ghost'}
                                size="icon"
                                className={`h-8 w-8 ${
                                    currentPage === i + 1
                                        ? 'bg-[#0D4838] text-white hover:bg-[#0D4838]/90'
                                        : ''
                                }`}
                                onClick={() => onPageChange?.(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onPageChange?.(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <Icon icon="mdi:chevron-right" width="20" height="20" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}