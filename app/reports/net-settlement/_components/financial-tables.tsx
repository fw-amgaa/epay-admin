"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBankName } from "@/lib/bank-codes";
import { NetSettlementApiResponse } from "../_lib/types";
import { numberFormat } from "@/lib/utils";

interface Props {
  bankData: NetSettlementApiResponse["data"];
  from: string;
  to: string;
}

export function FinancialTables({ bankData, from, to }: Props) {
  if (!bankData?.length || bankData.length === 0) return <></>;

  return (
    <div className="space-y-4">
      {/* Individual bank tables */}
      <div className="rounded-md border border-border bg-white overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b hover:bg-transparent">
              <TableHead className="w-1/3 py-2 px-4 text-xs font-bold text-gray-700">
                Хаалтын хамрах үе
              </TableHead>
              <TableHead className="w-1/3 py-2 px-4 text-xs font-bold text-gray-700">
                Эхэлсэн цаг {from}
              </TableHead>
              <TableHead className="w-1/3 py-2 px-4 text-xs font-bold text-gray-700">
                Дууссан цаг {to}
              </TableHead>
            </TableRow>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-1/3 py-2 px-4 text-xs font-bold text-gray-700">
                Хаалтын оролцогч
              </TableHead>
              <TableHead className="w-1/3 py-2 px-4 text-xs font-bold text-gray-700">
                Кредит дүн
              </TableHead>
              <TableHead className="w-1/3 py-2 px-4 text-xs font-bold text-gray-700">
                Дебит дүн
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bankData.map((bank, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="py-2 px-4 text-xs">
                  {getBankName(bank.operatorCode)}
                </TableCell>
                <TableCell className="py-2 px-4 text-xs">
                  {numberFormat(bank.credit_amount || 0, 2)}
                </TableCell>
                <TableCell className="py-2 px-4 text-xs">
                  {numberFormat(bank.debit_amount || 0, 2)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableCell className="py-2 px-4 text-xs font-bold">
                Нийт дүн
              </TableCell>
              <TableCell className="py-2 px-4 text-xs font-bold">
                {numberFormat(
                  (bankData || []).reduce(
                    (sum, bank) => sum + bank.credit_amount,
                    0
                  ) || 0,
                  2
                )}
              </TableCell>
              <TableCell className="py-2 px-4 text-xs font-bold">
                {numberFormat(
                  (bankData || []).reduce(
                    (sum, bank) => sum + bank.debit_amount,
                    0
                  ) || 0,
                  2
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
