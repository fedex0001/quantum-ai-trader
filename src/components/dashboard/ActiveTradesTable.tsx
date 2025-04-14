
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Edit, Eye, XCircle } from "lucide-react";

interface Trade {
  id: string;
  symbol: string;
  direction: "long" | "short";
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
  riskLevel: "low" | "medium" | "high";
  openTime: string;
  confidence: number;
  strategy: string;
}

interface ActiveTradesTableProps {
  trades: Trade[];
}

export function ActiveTradesTable({ trades }: ActiveTradesTableProps) {
  const directionColor = {
    long: "text-green-500",
    short: "text-red-500",
  };

  const directionSymbol = {
    long: "↑",
    short: "↓",
  };

  const riskBadgeVariant = {
    low: "bg-green-500/20 text-green-700 hover:bg-green-500/20",
    medium: "bg-amber-500/20 text-amber-700 hover:bg-amber-500/20",
    high: "bg-red-500/20 text-red-700 hover:bg-red-500/20",
  };

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold">Active Trades (5 max)</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs h-7 px-2">
            Filter
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-7 px-2">
            Sort by: Newest
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>Entry</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>P&L</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Opened</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Strategy</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell className="font-medium">{trade.symbol}</TableCell>
                <TableCell className={directionColor[trade.direction]}>
                  {directionSymbol[trade.direction]} {trade.direction.toUpperCase()}
                </TableCell>
                <TableCell>${trade.entryPrice.toFixed(2)}</TableCell>
                <TableCell>${trade.currentPrice.toFixed(2)}</TableCell>
                <TableCell
                  className={
                    trade.pnl >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  ${Math.abs(trade.pnl).toFixed(2)} ({trade.pnlPercentage.toFixed(2)}%)
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={riskBadgeVariant[trade.riskLevel]}
                  >
                    {trade.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {trade.openTime}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          trade.confidence > 70
                            ? "bg-green-500"
                            : trade.confidence > 40
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${trade.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs w-8">{trade.confidence}%</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{trade.strategy}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500">
                      <XCircle className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
