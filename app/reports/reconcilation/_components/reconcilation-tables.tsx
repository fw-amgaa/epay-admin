"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { numberFormat } from "@/lib/utils";
import { ReconcilationApiResponse } from "../_lib/types";
import { getBankName } from "@/lib/bank-codes";

interface TransactionSummaryProps {
  datas: ReconcilationApiResponse["data"];
}

export function ReconcilationTables({ datas }: TransactionSummaryProps) {
  if (!datas || datas.length === 0) return <></>;

  return (
    <div className="flex flex-col gap-4">
      {datas.map((data, index: number) => {
        const totalSentCount = data.data.reduce(
          (sum, item) => sum + parseInt(item.debit_count),
          0
        );
        const totalSentAmount = data.data.reduce(
          (sum, item) => sum + item.debit_amount,
          0
        );
        const totalReceivedCount = data.data.reduce(
          (sum, item) => sum + parseInt(item.credit_count),
          0
        );
        const totalReceivedAmount = data.data.reduce(
          (sum, item) => sum + item.credit_amount,
          0
        );

        return (
          <div
            key={index}
            className="border border-border rounded-md overflow-hidden bg-white "
          >
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r">
                    Гүйлгээний төрөл
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r">
                    Төлөв
                  </TableHead>
                  <TableHead
                    colSpan={2}
                    className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 text-center border-r"
                  >
                    Илгээсэн
                  </TableHead>
                  <TableHead
                    colSpan={2}
                    className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 text-center"
                  >
                    Хүлээн авсан
                  </TableHead>
                </TableRow>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r"></TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r"></TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r text-center">
                    Тоо
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r text-center">
                    Дүн
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r text-center">
                    Тоо
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 text-center">
                    Дүн
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Bank name row */}
                <TableRow className="hover:bg-gray-50 bg-gray-100">
                  <TableCell
                    colSpan={6}
                    className="py-2 px-4 text-xs font-bold border-b"
                  >
                    {getBankName(data.operatorCode)}
                  </TableCell>
                </TableRow>

                {/* Transaction data rows */}
                {data.data
                  .sort((a, b) => {
                    if (a.is_approved === b.is_approved) {
                      return 0;
                    }
                    return a.is_approved ? -1 : 1;
                  })
                  .map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="py-2 px-4 text-xs border-r">
                        Худалдан авалт (данс)
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs border-r">
                        {item.is_approved ? "Matched" : "Mismatched"}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs text-right border-r">
                        {numberFormat(parseInt(item.debit_count))}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs text-right border-r">
                        {numberFormat(item.debit_amount, 2)}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs text-right border-r">
                        {numberFormat(parseInt(item.credit_count))}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs text-right">
                        {numberFormat(item.credit_amount, 2)}
                      </TableCell>
                    </TableRow>
                  ))}

                {/* Total row */}
                <TableRow className="bg-gray-100 hover:bg-gray-100 font-bold">
                  <TableCell colSpan={2} className="py-2 px-4 text-xs border-r">
                    Нийт гүйлгээ
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs text-right border-r">
                    {numberFormat(totalSentCount)}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs text-right border-r">
                    {numberFormat(totalSentAmount, 2)}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs text-right border-r">
                    {numberFormat(totalReceivedCount)}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs text-right">
                    {numberFormat(totalReceivedAmount, 2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
}
