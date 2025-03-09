// "use client";

// import * as React from "react";

// import { DataTable } from "@/components/data-table/data-table";
// import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
// import { useFeatureFlags } from "@/components/data-table/data-table-feature-flags";
// import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
// import { useDataTable } from "@/hooks/use-data-table";
// import { toSentenceCase } from "@/lib/utils";
// import { Client } from "../_lib/types";
// import { getStatusIcon } from "../_lib/utils";
// import { getColumns } from "./clients-table-columns";
// import { TasksTableToolbarActions } from "./clients-table-toolbar-actions";
// import { DataTableRowAction, DataTableFilterField, DataTableAdvancedFilterField } from "@/types/data-table";

// export function ClientsTable() {
//   const { featureFlags } = useFeatureFlags();

//   const [, setRowAction] =
//     React.useState<DataTableRowAction<Client> | null>(null);

//   const columns = React.useMemo(() => getColumns({ setRowAction }), []);

//   const filterFields: DataTableFilterField<Client>[] = [
//     {
//       id: "name",
//       label: "Name",
//       placeholder: "Filter name...",
//     },
//     {
//       id: "status",
//       label: "Status",
//       options: ['active, inactive'].map((status) => ({
//         label: toSentenceCase(status),
//         value: status,
//         icon: getStatusIcon(status as 'active' | 'inactive'),
//         count: 50,
//       })),
//     },
//   ];

//   const advancedFilterFields: DataTableAdvancedFilterField<Client>[] = [
//     {
//       id: "name",
//       label: "Name",
//       type: "text",
//     },
//     {
//       id: "status",
//       label: "Status",
//       type: "multi-select",
//       options: ['active, inactive'].map((status) => ({
//         label: toSentenceCase(status),
//         value: status,
//         icon: getStatusIcon(status as 'active' | 'inactive'),
//         count: 100,
//       })),
//     },
//     {
//       id: "created_at",
//       label: "Created at",
//       type: "date",
//     },
//   ];

//   const enableAdvancedTable = featureFlags.includes("advancedTable");

//   const { table } = useDataTable({
//     columns,
//     pageCount: 10,
//     filterFields,
//     enableAdvancedFilter: enableAdvancedTable,
//     initialState: {
//       sorting: [{ id: "created_at", desc: true }],
//       columnPinning: { right: ["actions"] },
//     },
//     getRowId: (originalRow) => originalRow.id,
//     shallow: false,
//     clearOnDefault: true,
//     resource: 'clients'
//   });

//   return (
//     <DataTable
//       table={table}
//     >
//       {enableAdvancedTable ? (
//         <DataTableAdvancedToolbar
//           table={table}
//           filterFields={advancedFilterFields}
//           shallow={false}
//         >
//           <TasksTableToolbarActions table={table} />
//         </DataTableAdvancedToolbar>
//       ) : (
//         <DataTableToolbar table={table} filterFields={filterFields}>
//           <TasksTableToolbarActions table={table} />
//         </DataTableToolbar>
//       )}
//     </DataTable>
//   );
// }
