"use client";

import type { DataTableRowAction } from "@/types/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import * as React from "react";
import moment from 'moment'

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getStatusIcon } from "../_lib/utils";
import { Transaction } from "../_lib/types";
import { cn, currencyFormat } from "@/lib/utils";
import { getBankName } from "@/lib/bank-codes";

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<Transaction> | null>
  >;
}

export function getColumns({
  setRowAction,
}: GetColumnsProps): ColumnDef<Transaction>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5 mr-2"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "debitor_code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Илгээгч харилцагч" />
      ),
      cell: ({ row }) => <div>{getBankName(row.getValue("debitor_code"))}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "debitor_account",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Илгээгчийн данс" />
      ),
      cell: ({ row }) => <div>{row.getValue("debitor_account")}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "debitor_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Илгээгчийн нэр" />
      ),
      cell: ({ row }) => <div className="w-36">{row.getValue("debitor_name")}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "creditor_code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Xүлээн авагч харилцагч" />
      ),
      cell: ({ row }) => <div className="w-36">{getBankName(row.getValue("creditor_code"))}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "creditor_account",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Xүлээн авагчын данс" />
      ),
      cell: ({ row }) => <div>{row.getValue("creditor_account")}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "creditor_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Xүлээн авагчын нэр" />
      ),
      cell: ({ row }) => <div>{row.getValue("creditor_name")}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Дүн" />
      ),
      cell: ({ row }) => <div>{currencyFormat(row.getValue("amount"))}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Гүйлгээний утга" />
      ),
      cell: ({ row }) => <div> {row.getValue("description")}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.is_approved ? 'Matched' : 'Mismatched';

        if (!status) return null;

        const Icon = getStatusIcon(row.original.is_approved);

        return (
          <div className="flex w-[6.25rem] items-center">
            <Icon
              className={cn('mr-2 size-4 text-muted-foreground', row.original.is_approved ? 'text-success' : 'text-destructive')}
              aria-hidden="true"
            />
            <span className={cn('capitalize', row.original.is_approved ? 'text-success' : 'text-destructive')}>{status}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Огноо" />
      ),
      cell: ({ row }) => {
        const label = ['opt1, opt2'].find(
          (label) => label === row.original.createdAt,
        );

        return (
          <div className="flex space-x-2">
            {label && <Badge variant="outline">{label}</Badge>}
            <span className="max-w-[31.25rem] truncate font-medium">
              {moment(row.getValue("createdAt")).format('YYYY/MM/DD HH:mm')}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition();

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "update" })}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={row.original.debitor_name}
                    onValueChange={() => {
                      startUpdateTransition(() => {
                        // toast.promise(
                        //   updateTask({
                        //     id: row.original.id,
                        //     label: value as any["label"],
                        //   }),
                        //   {
                        //     loading: "Updating...",
                        //     success: "Label updated",
                        //     error: (err) => getErrorMessage(err),
                        //   },
                        // );
                      });
                    }}
                  >
                    {['opt1, opt2'].map((label) => (
                      <DropdownMenuRadioItem
                        key={label}
                        value={label}
                        className="capitalize"
                        disabled={isUpdatePending}
                      >
                        {label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "delete" })}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
