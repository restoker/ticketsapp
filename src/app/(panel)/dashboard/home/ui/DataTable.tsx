'use client';

import React, { useState } from 'react'
import { Button, Input, TableColumn } from "@heroui/react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@heroui/react";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

    const [sort, setSort] = useState<SortingState>([]);
    const [columnfilters, setColumnfilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnfilters,
        state: {
            sorting: sort,
            columnFilters: columnfilters,
        }
    })

    return (
        <>
            <div className="h-full w-full">
                <div>
                    <Input
                        className="w-60"
                        placeholder="Buscar por prioridad"
                        value={(table.getColumn('priority')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('priority')?.setFilterValue(event.target.value)}
                    />
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableHeader key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableColumn className="border-x-zinc-900/10 border" key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableColumn>
                                    )
                                })}
                            </TableHeader>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length
                            ?
                            (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell className="text-center lg:w-[100px] xl:w-[200px] text-ellipsis text-sm border-x-zinc-900/10 border" key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )
                            :
                            (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results 😥.
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
                {/* botones para next and previous page */}
                <div className="flex items-center justify-end gap-4">
                    <Button
                        disabled={!table.getCanPreviousPage()}
                        onPress={() => table.previousPage()}
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                        <span>Previous</span>
                    </Button>
                    <Button
                        variant='bordered'
                        disabled={!table.getCanNextPage()}
                        onPress={() => table.nextPage()}
                    >
                        <span>Next</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    )
}

// export default DataTable