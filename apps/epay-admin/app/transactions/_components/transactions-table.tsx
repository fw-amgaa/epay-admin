"use client";

import type {
  DataTableAdvancedFilterField,
  DataTableFilterField,
  DataTableRowAction,
} from "@/types/data-table";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { useFeatureFlags } from "@/components/data-table/data-table-feature-flags";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { toSentenceCase } from "@/lib/utils";
import { getStatusIcon } from "../_lib/utils";
import { getColumns } from "./transactions-table-columns";
import { TransactionsTableToolbarActions } from "./transactions-table-toolbar-actions";
import { Transaction, TransactionListApiResponse } from "../_lib/types";
import { bankOptions } from "@/lib/bank-codes";

interface TransactionsTableProps {
  promises: Promise<
    [
      Awaited<TransactionListApiResponse>,
      // Awaited<ReturnType<typeof getTaskStatusCounts>>,
      // Awaited<ReturnType<typeof getTaskPriorityCounts>>,
    ]
  >;
}

export function TransactionsTable({promises}: TransactionsTableProps) {
  const { featureFlags } = useFeatureFlags();

  const [{ data, meta }] =
  React.use(promises);


  const [, setRowAction] =
    React.useState<DataTableRowAction<Transaction> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const filterFields: DataTableFilterField<Transaction>[] = [
    {
      id: "debitor_code",
      label: "Илгээгч харилцагч",
      options: bankOptions,
    },
    {
      id: "creditor_code",
      label: "Xүлээн авагч харилцагч",
      options: bankOptions,
    },
  ];

  const advancedFilterFields: DataTableAdvancedFilterField<Transaction>[] = [
    {
      id: "debitor_code",
      label: "Xарилцагч банк",
      type: "multi-select",
      options: bankOptions,
    },
    {
      id: "debitor_account",
      label: "Xарилцагчийн данс",
      type: "text",
    },
    {
      id: "debitor_name",
      label: "Xарилцагчийн нэр",
      type: "text",
    },
    {
      id: "creditor_code",
      label: "Xүлээн авагч банк",
      type: "multi-select",
      options: bankOptions,
    },
    {
      id: "creditor_account",
      label: "Xүлээн авагчын данс",
      type: "text",
    },
    {
      id: "creditor_name",
      label: "Xүлээн авагчын нэр",
      type: "text",
    },
    {
      id: "amount",
      label: "Дүн",
      type: "text",
    },
    {
      id: "description",
      label: "Гүйлгээний утга",
      type: "text",
    },
    {
      id: "is_approved",
      label: "Статус",
      type: "multi-select",
      options: [true, false].map((status) => ({
        label: toSentenceCase(status ? 'Matched' : 'Mismatched'),
        value: status ? 'true' : 'false',
        icon: getStatusIcon(status),
      })),
    },
    {
      id: "createdAt",
      label: "Огноо",
      type: "date",
    },
  ];

  const enableAdvancedTable = featureFlags.includes("advancedTable");

  const { table } = useDataTable({
    data,
    columns,
    pageCount: meta.pagination.pageCount,
    filterFields,
    enableAdvancedFilter: enableAdvancedTable,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable
      table={table}
    >
      {enableAdvancedTable ? (
        <DataTableAdvancedToolbar
          table={table}
          filterFields={advancedFilterFields}
          shallow={false}
        >
          <TransactionsTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TransactionsTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
    </DataTable>
  );
}
