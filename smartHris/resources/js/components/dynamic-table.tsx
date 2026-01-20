import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

export interface ColumnDef<T> {
    header: string;
    accessorKey?: keyof T;
    render?: (item: T, index: number) => React.ReactNode;
    className?: string;
    sortable?: boolean;
    id?: string;
    hidden?: 'mobile' | 'tablet' | 'never';
}

interface DynamicTableProps<T> {
    title: string;
    data: T[];
    columns: ColumnDef<T>[];
    searchKeys?: (keyof T)[];
    onAddClick?: () => void;
    addButtonLabel?: string;
}

function DynamicTable<T extends { id: string | number }>({
    title,
    data,
    columns,
    searchKeys = [],
    onAddClick,
    addButtonLabel = "Tambah Data",
}: DynamicTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T;
        direction: 'asc' | 'desc';
    } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const filteredAndSortedData = useMemo(() => {
        let result = [...data];

        if (searchTerm && searchKeys.length > 0) {
            result = result.filter((item) =>
                searchKeys.some((key) => {
                    const value = item[key];
                    return String(value)
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                }),
            );
        }

        if (sortConfig) {
            result.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];

                if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [data, searchTerm, sortConfig, searchKeys]);

    const totalItems = filteredAndSortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const paginatedData = filteredAndSortedData.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    const handleSort = (key: keyof T) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'asc'
        ) {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <Card className="flex w-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border-none bg-white shadow-sm">
            <CardHeader className="px-4 py-4 pb-3 sm:px-8 sm:py-6 sm:pb-4">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <CardTitle className="text-lg font-semibold text-gray-800 sm:text-xl">
                        {title}
                    </CardTitle>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Cari..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="h-9 w-full rounded-lg border-gray-200 bg-white pl-10 text-sm focus:ring-1 focus:ring-emerald-500 sm:h-10"
                            />
                        </div>
                        {onAddClick && (
                            <Button
                                onClick={onAddClick}
                                className="h-9 w-full rounded-lg bg-[#114F38] px-4 text-sm text-white hover:bg-[#0d3f2d] sm:h-10 sm:w-auto sm:px-6"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">{addButtonLabel}</span>
                                <span className="sm:hidden">Tambah</span>
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 px-0 pb-0">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="border-b border-gray-100 bg-white text-gray-500">
                            <tr>
                                {columns.map((col, idx) => {
                                    let colClasses = 'px-2 py-3 sm:px-4 sm:py-4 font-medium whitespace-nowrap text-xs sm:text-sm';
                                    if (col.hidden === 'mobile') {
                                        colClasses += ' hidden md:table-cell';
                                    } else if (col.hidden === 'tablet') {
                                        colClasses += ' hidden lg:table-cell';
                                    }

                                    return (
                                        <th
                                            key={idx}
                                            className={`${colClasses} ${col.className || ''}`}
                                        >
                                            {col.sortable && col.accessorKey ? (
                                                <button
                                                    onClick={() =>
                                                        handleSort(col.accessorKey!)
                                                    }
                                                    className="group flex items-center gap-1 hover:text-gray-900 focus:outline-none"
                                                >
                                                    {col.header}
                                                    <ArrowUpDown className="h-3 w-3 text-gray-400 transition-colors group-hover:text-gray-900" />
                                                </button>
                                            ) : (
                                                col.header
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, rowIdx) => (
                                    <tr
                                        key={item.id}
                                        className="group transition-colors hover:bg-gray-50/50"
                                    >
                                        {columns.map((col, colIdx) => {
                                            let cellClasses = 'px-2 py-3 sm:px-4 sm:py-5 align-top font-medium whitespace-nowrap text-gray-900 text-xs sm:text-sm';
                                            if (col.hidden === 'mobile') {
                                                cellClasses += ' hidden md:table-cell';
                                            } else if (col.hidden === 'tablet') {
                                                cellClasses += ' hidden lg:table-cell';
                                            }

                                            return (
                                                <td
                                                    key={colIdx}
                                                    className={`${cellClasses} ${col.className || ''}`}
                                                >
                                                    {col.render
                                                        ? col.render(
                                                            item,
                                                            startIndex + rowIdx,
                                                        )
                                                        : col.accessorKey
                                                            ? (item[
                                                                col.accessorKey
                                                            ] as React.ReactNode)
                                                            : null}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="py-12 text-center text-gray-500"
                                    >
                                        Data tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>

            <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 sm:flex-row sm:gap-4 sm:px-8 sm:py-6">

                <div className="flex items-center justify-center gap-1 text-xs text-gray-600 sm:text-sm sm:justify-start">
                    <span className="hidden sm:inline">Show</span>
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="h-8 cursor-pointer rounded-md border-gray-200 bg-white text-xs focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="hidden sm:inline">per page</span>
                </div>

                <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
                    <span className="text-xs text-gray-600 sm:text-sm">
                        {totalItems === 0
                            ? '0'
                            : `${startIndex + 1}-${endIndex}`}{' '}
                        of {totalItems}
                    </span>

                    <div className="flex flex-wrap items-center justify-center gap-1">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent sm:h-8 sm:w-8"
                        >
                            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>

                        {Array.from(
                            { length: Math.min(totalPages, 5) },
                            (_, i) => {
                                let pageNum = i + 1;
                                if (totalPages > 5 && currentPage > 3) {
                                    pageNum = currentPage - 3 + i + 1;
                                    if (pageNum > totalPages) return null;
                                }
                                if (!pageNum) return null;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() =>
                                            handlePageChange(pageNum)
                                        }
                                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors sm:h-8 sm:w-8 sm:text-sm ${currentPage === pageNum
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            },
                        )}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={
                                currentPage === totalPages || totalPages === 0
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent sm:h-8 sm:w-8"
                        >
                            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default DynamicTable;
