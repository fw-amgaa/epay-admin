'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Ellipsis } from 'lucide-react';
import * as React from 'react';
import moment from 'moment';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
} from '@/components/ui/dropdown-menu';

import { getStatusIcon } from '../_lib/utils';
import { Client } from '../_lib/types';
import { cn } from '@/lib/utils';
import { DataTableRowAction } from '@/types/data-table';

interface GetColumnsProps {
    setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<Client> | null>>;
}

export function getColumns({ setRowAction }: GetColumnsProps): ColumnDef<Client>[] {
    return [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-0.5"
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
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
            cell: ({ row }) => <div className="w-20">{row.getValue('id')}</div>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
            cell: ({ row }) => {
                const label = ['opt1, opt2'].find((label) => label === row.original.name);

                return (
                    <div className="flex space-x-2">
                        {label && <Badge variant="outline">{label}</Badge>}
                        <span className="max-w-[31.25rem] truncate font-medium">{row.getValue('name')}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Created at" />,
            cell: ({ row }) => {
                const label = ['opt1, opt2'].find((label) => label === row.original.created_at);

                return (
                    <div className="flex space-x-2">
                        {label && <Badge variant="outline">{label}</Badge>}
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {moment(row.getValue('created_at')).format('YYYY/MM/DD HH:mm')}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'address',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,
            cell: ({ row }) => {
                const label = ['opt1, opt2'].find((label) => label === row.original.address);

                return (
                    <div className="flex space-x-2">
                        {label && <Badge variant="outline">{label}</Badge>}
                        <span className="max-w-[31.25rem] truncate font-medium">{row.getValue('address')}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status = row.original.status ? 'active' : 'inactive';

                if (!status) return null;

                const Icon = getStatusIcon(status);

                return (
                    <div className="flex w-[6.25rem] items-center">
                        <Icon
                            className={cn(
                                'mr-2 size-4 text-muted-foreground',
                                row.original.status ? 'text-success' : 'text-destructive'
                            )}
                            aria-hidden="true"
                        />
                        <span className={cn('capitalize', row.original.status ? 'text-success' : 'text-destructive')}>
                            {status}
                        </span>
                    </div>
                );
            },
            filterFn: (row, id, value) => {
                return Array.isArray(value) && value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: 'bic',
            header: ({ column }) => <DataTableColumnHeader column={column} title="BIC" />,
            cell: ({ row }) => {
                const label = ['opt1, opt2'].find((label) => label === row.original.code);

                return (
                    <div className="flex space-x-2">
                        {label && <Badge variant="outline">{label}</Badge>}
                        <span className="max-w-[31.25rem] truncate font-medium">{row.getValue('bic')}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'code',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
            cell: ({ row }) => {
                const label = ['opt1, opt2'].find((label) => label === row.original.code);

                return (
                    <div className="flex space-x-2">
                        {label && <Badge variant="outline">{label}</Badge>}
                        <Badge variant="outline">{row.getValue('code')}</Badge>
                    </div>
                );
            },
        },
        // {
        //   accessorKey: "priority",
        //   header: ({ column }) => (
        //     <DataTableColumnHeader column={column} title="Priority" />
        //   ),
        //   cell: ({ row }) => {
        //     const priority = ['opt1, opt2'].find(
        //       (priority) => priority === row.original.priority,
        //     );

        //     if (!priority) return null;

        //     const Icon = getPriorityIcon(priority);

        //     return (
        //       <div className="flex items-center">
        //         <Icon
        //           className="mr-2 size-4 text-muted-foreground"
        //           aria-hidden="true"
        //         />
        //         <span className="capitalize">{priority}</span>
        //       </div>
        //     );
        //   },
        //   filterFn: (row, id, value) => {
        //     return Array.isArray(value) && value.includes(row.getValue(id));
        //   },
        // },
        // {
        //   accessorKey: "archived",
        //   header: ({ column }) => (
        //     <DataTableColumnHeader column={column} title="Archived" />
        //   ),
        //   cell: ({ row }) => (
        //     <Badge variant="outline">{row.original.archived ? "Yes" : "No"}</Badge>
        //   ),
        // },
        // {
        //   accessorKey: "createdAt",
        //   header: ({ column }) => (
        //     <DataTableColumnHeader column={column} title="Created At" />
        //   ),
        //   cell: ({ cell }) => formatDate(cell.getValue() as Date),
        // },
        {
            id: 'actions',
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
                            <DropdownMenuItem onSelect={() => setRowAction({ row, type: 'update' })}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuRadioGroup
                                        value={row.original.name}
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
                            <DropdownMenuItem onSelect={() => setRowAction({ row, type: 'delete' })}>
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
