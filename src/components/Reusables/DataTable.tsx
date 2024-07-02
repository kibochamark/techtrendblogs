"use client"

import {
    ColumnDef,
    flexRender,
    SortingState,
    getCoreRowModel,
    useReactTable, getFilteredRowModel,
    ColumnFiltersState,
    getSortedRowModel,
    getPaginationRowModel,
    GlobalFilterColumn,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import React from "react"
import { DataTablePagination } from "./Pagination"
import { DataTableViewOptions } from "./ViewOption"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { TrashIcon } from "@radix-ui/react-icons"
import { EditIcon, EllipsisIcon } from "lucide-react"
import { useDispatch } from "react-redux"
import { handleDeleteData, handleEdit } from "@/utils/Redux/slices/HandleDialogSlice"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    props:{deleteblog:any}

}

export function DataTable<TData, TValue>({
    columns,
    data,
    props

}: DataTableProps<TData, TValue>) {

    const dispatch = useDispatch()

    const generateActionColumn = () => {
        return {
            id: "actions",
            header: () => <div className="text-left text-gray-300">Actions</div>,

            cell: ({ row }: { row: any }) => {
                return (
                    <div className="flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger>

                                <Button variant={"ghost"}>
                                    <EllipsisIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Access</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    key="delete"
                                    className=""
                                    onClick={() => {
                                        dispatch(handleDeleteData({ ...row?.original }))
                                        // props.deleteblog(row)
                                    }}
                                >

                                    <TrashIcon className=" w-4 h-4 text-rose-400" />



                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    key="edit"
                                    className=""
                                    onClick={() => {
                                        dispatch(handleEdit({ edit: true, data: { ...row.original } }))
                                    }}
                                >

                                    <EditIcon className="dark:text-white h-4 w-4" />

                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div >
                );
            },
            enableColumnFilter: false,
        };
    };
    const actionColumn = generateActionColumn();
    let newcolumns = [actionColumn, ...columns];


    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [sorting, setSorting] = React.useState<SortingState>([])


    const table = useReactTable({
        data,
        columns: newcolumns,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
    })



    return (
        <div className="rounded-md w-full border  overflow-x-auto p-4">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter All columns..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="p-2 font-lg max-w-[200px] shadow border border-primary border-block"
                //   className="max-w-sm border-primary"
                />
                <DataTableViewOptions table={table} />
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DataTablePagination table={table} />
        </div>
    )
}
