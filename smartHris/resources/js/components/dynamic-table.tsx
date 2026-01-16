import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

// ================= TYPES =================
export interface ColumnDef<T> {
    header: string;
    accessorKey?: keyof T;
    render?: (item: T, index: number) => React.ReactNode;
    className?: string;
    sortable?: boolean;
    id?: string;
}

interface DynamicTableProps<T> {
    title: string;
    data: T[];
    columns: ColumnDef<T>[];
    searchKeys?: (keyof T)[];
}

// ================= COMPONENT =================
function DynamicTable<T extends { id: string | number }>({
    title,
    data = [],
    columns,
    searchKeys = [],
}: DynamicTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Filter
    const filteredData = useMemo(() => {
        if (!searchTerm || searchKeys.length === 0) return data;
        const lower = searchTerm.toLowerCase();
        return data.filter(item =>
            searchKeys.some(key =>
                String(item[key] ?? '').toLowerCase().includes(lower)
            )
        );
    }, [data, searchTerm, searchKeys]);

    // Pagination
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="bg-white rounded-xl border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                </h2>

                {searchKeys.length > 0 && (
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            value={searchTerm}
                            onChange={e => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search..."
                            className="w-full h-9 pl-9 pr-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className={`px-6 py-3 text-xs font-medium text-gray-500 text-left ${col.className ?? ''}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, rowIdx) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    {columns.map((col, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className={`px-6 py-4 text-sm text-gray-700 ${col.className ?? ''}`}
                                        >
                                            {col.render
                                                ? col.render(item, startIndex + rowIdx)
                                                : col.accessorKey
                                                ? String(item[col.accessorKey] ?? '-')
                                                : '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-10 text-center text-sm text-gray-400"
                                >
                                    Data tidak ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <span>Show</span>
                    <select
                        value={itemsPerPage}
                        onChange={e => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border border-gray-200 rounded-md px-2 py-1 text-sm"
                    >
                        {[5, 10, 20].map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                    <span>per page</span>
                </div>

                <div className="flex items-center gap-4">
                    <span>
                        {totalItems === 0 ? 0 : startIndex + 1}-{endIndex} of {totalItems}
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-40"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => {
                            const page = i + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 rounded-full text-sm ${
                                        currentPage === page
                                            ? 'bg-emerald-500 text-white'
                                            : 'border border-gray-200'
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-40"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DynamicTable;
