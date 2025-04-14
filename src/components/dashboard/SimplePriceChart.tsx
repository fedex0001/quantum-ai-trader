
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SimplePriceChartProps {
  title: string;
  symbol: string;
  data: number[];
  isPositive: boolean;
}

export function SimplePriceChart({ title, symbol, data, isPositive }: SimplePriceChartProps) {
  // In a real app, we would use a charting library like Recharts
  // This is a simplified visual representation
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{symbol}</span>
          <Select defaultValue="1d">
            <SelectTrigger className="w-16 h-8 text-xs">
              <SelectValue placeholder="1D" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1H</SelectItem>
              <SelectItem value="4h">4H</SelectItem>
              <SelectItem value="1d">1D</SelectItem>
              <SelectItem value="1w">1W</SelectItem>
              <SelectItem value="1m">1M</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <div className="flex h-full items-end gap-[2px]">
            {data.map((value, index) => {
              const height = ((value - minValue) / range) * 100;
              return (
                <div
                  key={index}
                  className="flex-1"
                  style={{ height: `${Math.max(5, height)}%` }}
                >
                  <div
                    className={`w-full h-full rounded-sm ${
                      isPositive ? "bg-green-500/20" : "bg-red-500/20"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
