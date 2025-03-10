"use client";

import type {
  DataTableAdvancedFilterField,
  DataTableRowAction,
} from "@/types/data-table";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { bankOptions } from "@/lib/bank-codes";
import { toSentenceCase } from "@/lib/utils";
import { Transaction, TransactionListApiResponse } from "../_lib/types";
import { getStatusIcon } from "../_lib/utils";
import { getColumns } from "./transactions-table-columns";
import { TransactionsTableToolbarActions } from "./transactions-table-toolbar-actions";

interface TransactionsTableProps {
  promises: Promise<[Awaited<TransactionListApiResponse>]>;
}

export function TransactionsTable({ promises }: TransactionsTableProps) {
  const [{ data, meta }] = React.use(promises);

  const [, setRowAction] =
    React.useState<DataTableRowAction<Transaction> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const advancedFilterFields: DataTableAdvancedFilterField<Transaction>[] = [
    {
      id: "debitor_code",
      label: "Илгээгчийн банк",
      type: "multi-select",
      options: bankOptions,
    },
    {
      id: "debitor_account",
      label: "Илгээгчийн дансны дугаар",
      type: "text",
    },
    {
      id: "debitor_name",
      label: "Илгээгчийн дансны нэр",
      type: "text",
    },
    {
      id: "creditor_code",
      label: "Xүлээн авагчийн банк",
      type: "multi-select",
      options: bankOptions,
    },
    {
      id: "creditor_account",
      label: "Хүлээн авагчийн дансны дугаар",
      type: "text",
    },
    {
      id: "creditor_name",
      label: "Хүлээн авагчийн дансны нэр",
      type: "text",
    },
    {
      id: "amount",
      label: "Гүйлгээний дүн",
      type: "text",
    },
    {
      id: "description",
      label: "Гүйлгээний утга",
      type: "text",
    },
    {
      id: "is_approved",
      label: "Төлөв",
      type: "multi-select",
      options: [true, false].map((status) => ({
        label: toSentenceCase(status ? "Matched" : "Mismatched"),
        value: status ? "true" : "false",
        icon: getStatusIcon(status),
      })),
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount: meta.pagination.pageCount,
    enableAdvancedFilter: true,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable table={table}>
      <DataTableAdvancedToolbar
        table={table}
        filterFields={advancedFilterFields}
        shallow={false}
      >
        <TransactionsTableToolbarActions table={table} />
      </DataTableAdvancedToolbar>
    </DataTable>
  );
}
