
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TradeHistoryPage() {
  // Sample trade history data
  const trades = [
    { id: 1, symbol: "BTC/USD", type: "Buy", amount: "0.15", price: "$48,235", pnl: "+$320", status: "Completed", date: "2025-04-13 14:32" },
    { id: 2, symbol: "ETH/USD", type: "Sell", amount: "2.5", price: "$3,140", pnl: "-$45", status: "Completed", date: "2025-04-13 12:15" },
    { id: 3, symbol: "AAPL", type: "Buy", amount: "10", price: "$178.25", pnl: "+$105", status: "Completed", date: "2025-04-12 15:45" },
    { id: 4, symbol: "EUR/USD", type: "Sell", amount: "5000", price: "1.0762", pnl: "+$120", status: "Completed", date: "2025-04-11 09:30" },
    { id: 5, symbol: "XRP/USD", type: "Buy", amount: "1000", price: "$0.54", pnl: "-$23", status: "Completed", date: "2025-04-10 11:22" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <History className="h-6 w-6" />
            Trade History
          </h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Filter className="mr-1 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" variant="outline">
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>PnL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date/Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell className="font-medium">{trade.symbol}</TableCell>
                    <TableCell>
                      <Badge variant={trade.type === "Buy" ? "default" : "secondary"}>
                        {trade.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{trade.amount}</TableCell>
                    <TableCell>{trade.price}</TableCell>
                    <TableCell className={trade.pnl.startsWith("+") ? "text-green-600" : "text-red-600"}>
                      {trade.pnl}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{trade.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{trade.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
