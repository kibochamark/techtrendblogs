"use client"

import { DataTableColumnHeader } from "@/components/Reusables/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table"
import { timeSince } from '../../utils/datedistance';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Blog = {
  id: number
  title:string; 
  content:string; 
  slug:string;
  updated_at:string;
  image:string;
}

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: ({column})=>{
        return <DataTableColumnHeader title="Title" column={column}/>
    },
  },
  {
    accessorKey: "content",
    header: ({column})=>{
        return <DataTableColumnHeader title="Content" column={column}/>
    },
    cell:({row})=>{
        return (
            <p className="text-ellipsis whitespace-nowrap tracking-tight leading-tight text-sm flex items-start justify-start">{row.original.content}</p>
        )
    }
  },
  {
    accessorKey: "updated_at",
    header: ({column})=>{
        return <DataTableColumnHeader title="Update Status" column={column}/>
    },
    cell:({row})=>{
        return (
            <p className="flex items-start justify-start">{timeSince(new Date(row.original.updated_at))}</p>
        )
    }
  },
]
