
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketDataCardProps {
  title: string;
  value: string | number;
  change: number;
  timeframe: string;
  chart?: React.ReactNode;
}

export function MarketDataCard({
  title,
  value,
  change,
  timeframe,
  chart,
}: MarketDataCardProps) {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="flex items-center gap-1 text-xs">
              <div
                className={cn(
                  "flex items-center",
                  isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {isPositive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{Math.abs(change).toFixed(2)}%</span>
              </div>
              <span className="text-muted-foreground">in {timeframe}</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            {isPositive ? (
              <TrendingUp className={cn("h-5 w-5 text-green-500")} />
            ) : (
              <TrendingDown className={cn("h-5 w-5 text-red-500")} />
            )}
          </div>
        </div>
        {chart && <div className="mt-4">{chart}</div>}
      </CardContent>
    </Card>
  );
}
