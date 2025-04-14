
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight, Clock, Filter, RefreshCcw, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function MarketDataPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Market Data</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-1 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-3/4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium">BTC/USD</CardTitle>
                    <CardDescription>Bitcoin / US Dollar</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-xl font-bold">$65,432.50</div>
                      <div className="flex items-center text-green-500 text-sm">
                        +2.34% <span className="text-muted-foreground ml-1">Today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">1H</Button>
                    <Button size="sm" variant="outline">4H</Button>
                    <Button size="sm" variant="outline">1D</Button>
                    <Button size="sm" variant="outline">1W</Button>
                    <Button size="sm" variant="outline">1M</Button>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Filter className="h-4 w-4 mr-1" />
                      Indicators
                    </Button>
                    <Button size="sm" variant="outline">
                      <Clock className="h-4 w-4 mr-1" />
                      Historical
                    </Button>
                  </div>
                </div>
                
                <div className="h-[400px] rounded-md border p-4 bg-muted/20">
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    Interactive price chart would be displayed here
                    <br />
                    (Using charting library like Recharts or TradingView widget)
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div className="rounded-md border p-3">
                    <div className="text-sm text-muted-foreground">24h High</div>
                    <div className="font-medium">$66,750.25</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-sm text-muted-foreground">24h Low</div>
                    <div className="font-medium">$63,891.10</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-sm text-muted-foreground">24h Volume</div>
                    <div className="font-medium">$24.5B</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-sm text-muted-foreground">Market Cap</div>
                    <div className="font-medium">$1.2T</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Technical Indicators</CardTitle>
                <CardDescription>Key indicators for technical analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <IndicatorCard name="RSI (14)" value="62.5" interpretation="Neutral" />
                  <IndicatorCard name="MACD" value="235.6" interpretation="Bullish" type="bullish" />
                  <IndicatorCard name="MA (50)" value="$63,450" interpretation="Above" type="bullish" />
                  <IndicatorCard name="MA (200)" value="$52,780" interpretation="Above" type="bullish" />
                  <IndicatorCard name="Stochastic" value="78.5" interpretation="Overbought" type="bearish" />
                  <IndicatorCard name="Bollinger Bands" value="$65,432" interpretation="Upper Band" type="neutral" />
                  <IndicatorCard name="ATR (14)" value="$1,245" interpretation="High Volatility" type="neutral" />
                  <IndicatorCard name="OBV" value="1.2M" interpretation="Rising" type="bullish" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:w-1/4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Watchlist</CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search assets" className="pl-8" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[400px] overflow-auto">
                  <Table>
                    <TableBody>
                      <WatchlistRow name="Bitcoin" symbol="BTC/USD" price="$65,432.50" change={2.34} selected />
                      <WatchlistRow name="Ethereum" symbol="ETH/USD" price="$3,211.45" change={-0.85} />
                      <WatchlistRow name="Solana" symbol="SOL/USD" price="$125.75" change={4.2} />
                      <WatchlistRow name="Binance Coin" symbol="BNB/USD" price="$574.30" change={1.15} />
                      <WatchlistRow name="Cardano" symbol="ADA/USD" price="$0.58" change={-1.2} />
                      <WatchlistRow name="XRP" symbol="XRP/USD" price="$0.52" change={0.75} />
                      <WatchlistRow name="Dogecoin" symbol="DOGE/USD" price="$0.12" change={-2.5} />
                      <WatchlistRow name="Polkadot" symbol="DOT/USD" price="$8.25" change={3.1} />
                      <WatchlistRow name="Shiba Inu" symbol="SHIB/USD" price="$0.00002345" change={-1.8} />
                      <WatchlistRow name="Avalanche" symbol="AVAX/USD" price="$35.45" change={2.7} />
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>News & Events</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[400px] overflow-auto">
                  <div className="border-b p-3">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">News</Badge>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                    <h4 className="font-medium">Bitcoin ETF records $500M inflow as market sentiment improves</h4>
                  </div>
                  <div className="border-b p-3">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Event</Badge>
                      <span className="text-xs text-muted-foreground">5h ago</span>
                    </div>
                    <h4 className="font-medium">Ethereum network prepares for major protocol upgrade next week</h4>
                  </div>
                  <div className="border-b p-3">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Alert</Badge>
                      <span className="text-xs text-muted-foreground">8h ago</span>
                    </div>
                    <h4 className="font-medium">Regulatory concerns impact market as new framework discussed</h4>
                  </div>
                  <div className="border-b p-3">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">News</Badge>
                      <span className="text-xs text-muted-foreground">12h ago</span>
                    </div>
                    <h4 className="font-medium">Major financial institution announces crypto custody service</h4>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Event</Badge>
                      <span className="text-xs text-muted-foreground">1d ago</span>
                    </div>
                    <h4 className="font-medium">Web3 conference announces keynote speakers and agenda</h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Market Overview</CardTitle>
              <Select defaultValue="crypto">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Asset Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crypto">Cryptocurrencies</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="commodities">Commodities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead>24h Volume</TableHead>
                    <TableHead>Market Cap</TableHead>
                    <TableHead>Technical Signal</TableHead>
                    <TableHead>AI Sentiment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <MarketRow 
                    name="Bitcoin" 
                    symbol="BTC" 
                    price="$65,432.50" 
                    change={2.34} 
                    volume="$24.5B" 
                    marketCap="$1.2T" 
                    signal="Buy" 
                    sentiment="Bullish" 
                  />
                  <MarketRow 
                    name="Ethereum" 
                    symbol="ETH" 
                    price="$3,211.45" 
                    change={-0.85} 
                    volume="$12.7B" 
                    marketCap="$367B" 
                    signal="Neutral" 
                    sentiment="Neutral" 
                  />
                  <MarketRow 
                    name="Solana" 
                    symbol="SOL" 
                    price="$125.75" 
                    change={4.2} 
                    volume="$5.1B" 
                    marketCap="$54B" 
                    signal="Strong Buy" 
                    sentiment="Bullish" 
                  />
                  <MarketRow 
                    name="Binance Coin" 
                    symbol="BNB" 
                    price="$574.30" 
                    change={1.15} 
                    volume="$1.8B" 
                    marketCap="$87B" 
                    signal="Buy" 
                    sentiment="Bullish" 
                  />
                  <MarketRow 
                    name="Cardano" 
                    symbol="ADA" 
                    price="$0.58" 
                    change={-1.2} 
                    volume="$875M" 
                    marketCap="$20B" 
                    signal="Sell" 
                    sentiment="Bearish" 
                  />
                  <MarketRow 
                    name="XRP" 
                    symbol="XRP" 
                    price="$0.52" 
                    change={0.75} 
                    volume="$1.2B" 
                    marketCap="$27B" 
                    signal="Neutral" 
                    sentiment="Neutral" 
                  />
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">
                Showing 6 of 100 assets
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

interface IndicatorCardProps {
  name: string;
  value: string;
  interpretation: string;
  type?: "bullish" | "bearish" | "neutral";
}

function IndicatorCard({ name, value, interpretation, type = "neutral" }: IndicatorCardProps) {
  return (
    <div className="rounded-md border p-3 space-y-1">
      <div className="text-sm font-medium">{name}</div>
      <div className="text-lg font-semibold">{value}</div>
      <div className={`text-sm ${
        type === "bullish" ? "text-green-500" : 
        type === "bearish" ? "text-red-500" : 
        "text-muted-foreground"
      }`}>
        {interpretation}
      </div>
    </div>
  );
}

interface WatchlistRowProps {
  name: string;
  symbol: string;
  price: string;
  change: number;
  selected?: boolean;
}

function WatchlistRow({ name, symbol, price, change, selected }: WatchlistRowProps) {
  return (
    <TableRow className={selected ? "bg-secondary/50" : ""}>
      <TableCell className="py-2">
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{symbol}</div>
        </div>
      </TableCell>
      <TableCell className="text-right py-2">
        <div className="font-medium">{price}</div>
        <div className={`text-xs ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
          {change >= 0 ? "+" : ""}{change}%
        </div>
      </TableCell>
    </TableRow>
  );
}

interface MarketRowProps {
  name: string;
  symbol: string;
  price: string;
  change: number;
  volume: string;
  marketCap: string;
  signal: "Strong Buy" | "Buy" | "Neutral" | "Sell" | "Strong Sell";
  sentiment: "Bullish" | "Neutral" | "Bearish";
}

function MarketRow({ name, symbol, price, change, volume, marketCap, signal, sentiment }: MarketRowProps) {
  const signalColor = {
    "Strong Buy": "bg-green-500/20 text-green-700 border-green-500/20",
    "Buy": "bg-green-500/10 text-green-600 border-green-500/10",
    "Neutral": "bg-gray-500/10 text-gray-600 border-gray-500/10",
    "Sell": "bg-red-500/10 text-red-600 border-red-500/10",
    "Strong Sell": "bg-red-500/20 text-red-700 border-red-500/20",
  };
  
  const sentimentColor = {
    "Bullish": "text-green-500",
    "Neutral": "text-gray-500",
    "Bearish": "text-red-500",
  };
  
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{symbol}</div>
      </TableCell>
      <TableCell>{price}</TableCell>
      <TableCell className={change >= 0 ? "text-green-500" : "text-red-500"}>
        {change >= 0 ? "+" : ""}{change}%
      </TableCell>
      <TableCell>{volume}</TableCell>
      <TableCell>{marketCap}</TableCell>
      <TableCell>
        <Badge variant="outline" className={signalColor[signal]}>
          {signal}
        </Badge>
      </TableCell>
      <TableCell className={sentimentColor[sentiment]}>
        {sentiment}
      </TableCell>
    </TableRow>
  );
}
