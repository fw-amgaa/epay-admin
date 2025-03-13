"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MonthlyBillApiResponse } from "../_lib/types";
import { getBankName } from "@/lib/bank-codes";
import { numberFormat } from "@/lib/utils";
import React from "react";

interface TransactionSummaryProps {
  datas: MonthlyBillApiResponse["data"];
}

export function MonthlyBillTables({ datas }: TransactionSummaryProps) {
  if (!datas || datas.length === 0) return <></>;

  return (
    <div className="flex flex-col gap-4">
      {datas.map((data, index: number) => {
        return (
          <div
            key={index}
            className="w-full border border-border rounded-md overflow-hidden bg-white"
          >
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r">
                    Огноо
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r">
                    Систем
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r">
                    Гүйлгээний төрөл
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r text-center">
                    Гүйлгээний тоо
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 border-r text-center">
                    Нэхэмжлэх шимтгэл дүн
                  </TableHead>
                  <TableHead className="py-2 px-4 text-xs font-bold text-gray-700 bg-gray-50 text-right">
                    Гүйлгээний нийт дүн
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
                    {getBankName(data.operatorCode)} - Хүлээн авсан гүйлгээнүүд
                  </TableCell>
                </TableRow>

                {/* Transaction row */}

                {data.incoming.data.map((d, index) => (
                  <React.Fragment key={index}>
                    <TableRow className="hover:bg-gray-50">
                      <TableCell className="py-2 px-4 text-xs border-r">
                        {d.transaction_day}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs border-r">
                        ePay
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs border-r">
                        Худалдан авалт (данс)
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs border-r text-center">
                        {numberFormat(parseInt(d.debit_count))}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs border-r text-center">
                        {numberFormat(d.fee_epay, 2)}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs text-right">
                        {numberFormat(d.debit_amount, 2)}
                      </TableCell>
                    </TableRow>

                    {/* Daily summary row */}
                    <TableRow className="hover:bg-gray-50 bg-gray-50">
                      <TableCell
                        className="py-2 px-4 text-xs font-medium text-right border-r"
                        colSpan={5}
                      >
                        {d.transaction_day} -ны нийт гүйлгээ
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs font-bold text-right">
                        {numberFormat(d.debit_amount, 2)}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}

                {/* Bank total row */}
                <TableRow className="hover:bg-gray-50 bg-gray-100">
                  <TableCell
                    className="py-2 px-4 text-xs font-bold border-r"
                    colSpan={3}
                  >
                    {getBankName(data.operatorCode)} Нийт хүлээн авсан дүн
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs font-bold text-center border-r">
                    {numberFormat(
                      parseInt(data.incoming.total?.[0]?.total_count || "0"),
                      2
                    )}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs font-bold text-center border-r">
                    {numberFormat(data.incoming.total?.[0]?.total_fee || 0, 2)}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs font-bold text-right">
                    {numberFormat(
                      data.incoming.total?.[0]?.total_amount || 0,
                      2
                    )}
                  </TableCell>
                </TableRow>

                {/* Second bank section */}
                <TableRow className="hover:bg-gray-50 bg-gray-100">
                  <TableCell
                    colSpan={6}
                    className="py-2 px-4 text-xs font-bold border-b"
                  >
                    {getBankName(data.operatorCode)} - Илгээсэн гүйлгээнүүд
                  </TableCell>
                </TableRow>

                {data.outgoing.data.map((d, index) => (
                  <React.Fragment key={index}>
                    <TableRow className="hover:bg-gray-50">
                      <TableCell className="py-2 px-4 text-xs border-r">
                        {d.transaction_day}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs border-r">
                        ePay
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs border-r">
                        Худалдан авалт (данс)
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs border-r text-center">
                        {numberFormat(parseInt(d.creditor_count))}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs border-r text-center">
                        {numberFormat(d.fee_epay, 2)}
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs text-right">
                        {numberFormat(d.creditor_amount, 2)}
                      </TableCell>
                    </TableRow>

                    {/* Daily summary row */}
                    <TableRow className="hover:bg-gray-50 bg-gray-50">
                      <TableCell
                        className="py-2 px-4 text-xs font-medium text-right border-r"
                        colSpan={5}
                      >
                        {d.transaction_day} -ны нийт гүйлгээ
                      </TableCell>
                      <TableCell className="py-2 px-4 text-xs font-bold text-right">
                        {numberFormat(d.creditor_amount, 2)}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}

                {/* Bank total row */}
                <TableRow className="hover:bg-gray-50 bg-gray-100">
                  <TableCell
                    className="py-2 px-4 text-xs font-bold border-r"
                    colSpan={3}
                  >
                    {getBankName(data.operatorCode)} Нийт илгээсэн дүн
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs font-bold text-center border-r">
                    {numberFormat(
                      parseInt(data.outgoing.total?.[0]?.total_count || "0"),
                      2
                    )}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs font-bold text-center border-r">
                    {numberFormat(data.outgoing.total?.[0]?.total_fee || 0, 2)}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-xs font-bold text-right">
                    {numberFormat(
                      data.outgoing.total?.[0]?.total_amount || 0,
                      2
                    )}
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
