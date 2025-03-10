import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberFormat } from "@/lib/utils";
import { use } from "react";
import { DashboardApiResponse } from "../_lib/types";
import { MatchBarChart } from "./match-bar-chart";
import { MatchPieChart } from "./match-pie-chart";

interface DashboardProps {
  dashboard: Promise<DashboardApiResponse>;
}

export default function Dashboard({ dashboard }: DashboardProps) {
  const data = use(dashboard);

  return (
    <div className="flex flex-1 flex-col space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Нийт гүйлгээнүүд
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {numberFormat(data.totalTransactions)}
            </div>
            <p className="text-xs text-muted-foreground">
              Сүүлийн сараас +20.1%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Match хийгдсэн
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {numberFormat(data.matchedTransactions)}
            </div>
            <p className="text-xs text-muted-foreground">
              Сүүлийн сараас +8.9%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Match хийгдээгүй
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {numberFormat(data.unmatchedTransactions)}
            </div>
            <p className="text-xs text-muted-foreground">
              Сүүлийн сараас -1.3%
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <MatchPieChart data={data.byClients} />
        <MatchBarChart data={data.byClients} />
      </div>
    </div>
  );
}
