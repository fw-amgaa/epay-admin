"use client";

import type {
  DataTableAdvancedFilterField,
  DataTableFilterField,
  DataTableRowAction,
} from "@/types";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { toSentenceCase } from "@/lib/utils";
import { getPriorityIcon, getStatusIcon } from "../_lib/utils";
import { getColumns } from "./clients-table-columns";
import { TasksTableToolbarActions } from "./clients-table-toolbar-actions";
import { useFeatureFlags } from "./feature-flags-provider";
import { Client } from "../_lib/types";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

export function ClientsTable() {
  const { featureFlags } = useFeatureFlags();

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<Client> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const filterFields: DataTableFilterField<Client>[] = [
    {
      id: "name",
      label: "Name",
      placeholder: "Filter name...",
    },
    {
      id: "status",
      label: "Status",
      options: [true, false].map((status) => ({
        label: toSentenceCase(status ? "Active" : "Inactive"),
        value: status ? "active" : "inactive",
        icon: getStatusIcon(status ? "Active" : "Inactive"),
        count: 50,
      })),
    },
    // {
    //   id: "status",
    //   label: "Status",
    //   options: Client.map((priority) => ({
    //     label: toSentenceCase(priority),
    //     value: priority,
    //     icon: getPriorityIcon(priority),
    //     count: 100,
    //   })),
    // },
  ];

  const advancedFilterFields: DataTableAdvancedFilterField<Client>[] = [
    {
      id: "name",
      label: "Name",
      type: "text",
    },
    {
      id: "status",
      label: "Status",
      type: "multi-select",
      options: ['option1, option2'].map((status) => ({
        label: toSentenceCase(status),
        value: status,
        icon: getStatusIcon(status),
        count: 100,
      })),
    },
    // {
    //   id: "priority",
    //   label: "Priority",
    //   type: "multi-select",
    //   options: ['option1, option2'].map((priority) => ({
    //     label: toSentenceCase(priority),
    //     value: priority,
    //     icon: getPriorityIcon(priority),
    //     count: 50,
    //   })),
    // },
    {
      id: "created_at",
      label: "Created at",
      type: "date",
    },
  ];

  const enableAdvancedTable = featureFlags.includes("advancedTable");

  const { table } = useDataTable({
    columns,
    filterFields,
    enableAdvancedFilter: enableAdvancedTable,
    initialState: {
      sorting: [{ id: "created_at", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
    resource: 'clients'
  });

  return (
    <>
      <DataTable
        table={table}
      // floatingBar={
      //   enableFloatingBar ? <TasksTableFloatingBar table={table} /> : null
      // }
      >
        {enableAdvancedTable ? (
          <DataTableAdvancedToolbar
            table={table}
            filterFields={advancedFilterFields}
            shallow={false}
          >
            <TasksTableToolbarActions table={table} />
          </DataTableAdvancedToolbar>
        ) : (
          <DataTableToolbar table={table} filterFields={filterFields}>
            <TasksTableToolbarActions table={table} />
          </DataTableToolbar>
        )}
      </DataTable>
    </>
  );
}
