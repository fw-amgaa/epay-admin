"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SuccessfulTransactionsApiResponse } from "../_lib/types";
import { currencyFormat, numberFormat } from "@/lib/utils";
import { getBankName } from "@/lib/bank-codes";

interface Props {
  bankData: SuccessfulTransactionsApiResponse["data"];
}

export function FinancialTables({ bankData }: Props) {
  if (!bankData?.length || bankData.length === 0) return <></>;

  return (
    <div className="space-y-4">
      {bankData.map((bank, index) => (
        <div key={index} className="w-full">
          <h1 className="text-lg font-bold mb-2">
            {getBankName(bank.operatorCode)}
          </h1>
          <div className="rounded-md border border-border bg-white overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700">
                    Огноо
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700">
                    Дебит гүйлгээний тоо
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700">
                    Кредит гүйлгээний тоо
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700">
                    Дебит гүйлгээний дүн
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700">
                    Кредит гүйлгээний дүн
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bank.data.map((row, index) => (
                  <TableRow key={index} className="border-t hover:bg-gray-50">
                    <TableCell className="py-2 px-4 text-xs">
                      {row.transaction_day}
                    </TableCell>
                    <TableCell className="py-2 px-4 text-xs">
                      {numberFormat(parseInt(row.debit_count))}
                    </TableCell>
                    <TableCell className="py-2 px-4 text-xs">
                      {numberFormat(parseInt(row.credit_count))}
                    </TableCell>
                    <TableCell className="py-2 px-4 text-xs">
                      {currencyFormat(row.debit_amount)}
                    </TableCell>
                    <TableCell className="py-2 px-4 text-xs">
                      {currencyFormat(row.credit_amount)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t bg-muted/30 font-medium hover:bg-gray-50">
                  <TableCell className="py-2 px-4 text-xs font-bold">
                    Нийт
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs font-bold">
                    {numberFormat(parseInt(bank.total_data.debit_count))}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs font-bold">
                    {numberFormat(parseInt(bank.total_data.credit_count))}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs font-bold">
                    {currencyFormat(bank.total_data.debit_amount)}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs font-bold">
                    {currencyFormat(bank.total_data.credit_amount)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
}
