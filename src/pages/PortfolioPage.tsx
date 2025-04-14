
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowUpRight, ArrowDownRight, BarChart2, Clock, Download, FileText, PieChart, RefreshCcw } from "lucide-react";

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Portfolio Management</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-1 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <FileText className="mr-1 h-4 w-4" />
              Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Portfolio Value</CardTitle>
              <CardDescription>Total value over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">$125,430.25</h3>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +$1,532.70 (1.22%) <span className="text-muted-foreground ml-1">Today</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Button size="sm" variant="outline">24H</Button>
                  <Button size="sm" variant="default">7D</Button>
                  <Button size="sm" variant="outline">1M</Button>
                  <Button size="sm" variant="outline">3M</Button>
                  <Button size="sm" variant="outline">1Y</Button>
                  <Button size="sm" variant="outline">All</Button>
                </div>
              </div>
              
              <div className="h-[300px] rounded-md border p-4 bg-muted/20">
                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                  Portfolio value chart would be displayed here
                  <br />
                  (Using charting library like Recharts)
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="rounded-md border p-3">
                  <div className="text-sm text-muted-foreground">Starting Balance</div>
                  <div className="font-medium">$100,000.00</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-sm text-muted-foreground">Net Profit</div>
                  <div className="font-medium text-green-500">+$25,430.25</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-sm text-muted-foreground">Total Return</div>
                  <div className="font-medium text-green-500">+25.43%</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-sm text-muted-foreground">Annual ROI</div>
                  <div className="font-medium text-green-500">+32.8%</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Current portfolio distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] relative flex items-center justify-center mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PieChart className="h-40 w-40 text-muted-foreground/30" />
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Total Assets</div>
                  <div className="text-xl font-bold">8</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <AssetAllocation name="Bitcoin (BTC)" percentage={42} value="$52,680.75" color="bg-blue-500" />
                <AssetAllocation name="Ethereum (ETH)" percentage={28} value="$35,120.45" color="bg-purple-500" />
                <AssetAllocation name="Solana (SOL)" percentage={12} value="$15,051.60" color="bg-green-500" />
                <AssetAllocation name="USDT" percentage={10} value="$12,543.03" color="bg-yellow-500" />
                <AssetAllocation name="Others" percentage={8} value="$10,034.42" color="bg-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="positions">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="positions">Active Positions</TabsTrigger>
            <TabsTrigger value="history">Trade History</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="positions" className="space-y-4 mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Entry Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>P&L</TableHead>
                      <TableHead>P&L %</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">BTC/USD</TableCell>
                      <TableCell className="text-green-500">Long</TableCell>
                      <TableCell>$64,215.50</TableCell>
                      <TableCell>$65,432.50</TableCell>
                      <TableCell>0.15 BTC</TableCell>
                      <TableCell>$9,814.87</TableCell>
                      <TableCell className="text-green-500">+$182.55</TableCell>
                      <TableCell className="text-green-500">+1.89%</TableCell>
                      <TableCell>2d 4h</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Open
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ETH/USD</TableCell>
                      <TableCell className="text-red-500">Short</TableCell>
                      <TableCell>$3,250.25</TableCell>
                      <TableCell>$3,211.45</TableCell>
                      <TableCell>2.5 ETH</TableCell>
                      <TableCell>$8,028.63</TableCell>
                      <TableCell className="text-green-500">+$97.00</TableCell>
                      <TableCell className="text-green-500">+1.19%</TableCell>
                      <TableCell>1d 7h</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Open
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SOL/USD</TableCell>
                      <TableCell className="text-green-500">Long</TableCell>
                      <TableCell>$120.45</TableCell>
                      <TableCell>$125.75</TableCell>
                      <TableCell>25 SOL</TableCell>
                      <TableCell>$3,143.75</TableCell>
                      <TableCell className="text-green-500">+$132.50</TableCell>
                      <TableCell className="text-green-500">+4.40%</TableCell>
                      <TableCell>5h 23m</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Open
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4 mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Entry Price</TableHead>
                      <TableHead>Exit Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>P&L</TableHead>
                      <TableHead>P&L %</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Open Date</TableHead>
                      <TableHead>Close Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">BTC/USD</TableCell>
                      <TableCell className="text-green-500">Long</TableCell>
                      <TableCell>$62,150.75</TableCell>
                      <TableCell>$64,325.50</TableCell>
                      <TableCell>0.2 BTC</TableCell>
                      <TableCell className="text-green-500">+$434.95</TableCell>
                      <TableCell className="text-green-500">+3.5%</TableCell>
                      <TableCell>3d 5h</TableCell>
                      <TableCell>Apr 10, 2025</TableCell>
                      <TableCell>Apr 13, 2025</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ETH/USD</TableCell>
                      <TableCell className="text-green-500">Long</TableCell>
                      <TableCell>$2,950.25</TableCell>
                      <TableCell>$3,150.45</TableCell>
                      <TableCell>3 ETH</TableCell>
                      <TableCell className="text-green-500">+$600.60</TableCell>
                      <TableCell className="text-green-500">+6.8%</TableCell>
                      <TableCell>5d 12h</TableCell>
                      <TableCell>Apr 5, 2025</TableCell>
                      <TableCell>Apr 10, 2025</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ADA/USD</TableCell>
                      <TableCell className="text-red-500">Short</TableCell>
                      <TableCell>$0.62</TableCell>
                      <TableCell>$0.58</TableCell>
                      <TableCell>5000 ADA</TableCell>
                      <TableCell className="text-green-500">+$200.00</TableCell>
                      <TableCell className="text-green-500">+6.5%</TableCell>
                      <TableCell>2d 8h</TableCell>
                      <TableCell>Apr 8, 2025</TableCell>
                      <TableCell>Apr 10, 2025</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">DOT/USD</TableCell>
                      <TableCell className="text-green-500">Long</TableCell>
                      <TableCell>$7.85</TableCell>
                      <TableCell>$7.25</TableCell>
                      <TableCell>200 DOT</TableCell>
                      <TableCell className="text-red-500">-$120.00</TableCell>
                      <TableCell className="text-red-500">-7.6%</TableCell>
                      <TableCell>1d 15h</TableCell>
                      <TableCell>Apr 9, 2025</TableCell>
                      <TableCell>Apr 11, 2025</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard 
                title="Win Rate" 
                value="68%" 
                change={+5.2} 
                description="vs. previous month" 
                icon={BarChart2}
              />
              <MetricCard 
                title="Avg. Profit/Trade" 
                value="$253.45" 
                change={+12.8} 
                description="vs. previous month" 
                icon={ArrowUp}
              />
              <MetricCard 
                title="Max Drawdown" 
                value="8.2%" 
                change={-2.4} 
                changeIsGood={true}
                description="vs. previous month" 
                icon={Clock}
              />
              <MetricCard 
                title="Sharpe Ratio" 
                value="1.85" 
                change={+0.32} 
                description="vs. previous month" 
                icon={BarChart2}
              />
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Monthly Returns</h4>
                      <div className="h-[200px] rounded-md border p-4 bg-muted/20 flex items-center justify-center text-muted-foreground">
                        Monthly returns chart would be displayed here
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Drawdown Analysis</h4>
                      <div className="h-[200px] rounded-md border p-4 bg-muted/20 flex items-center justify-center text-muted-foreground">
                        Drawdown chart would be displayed here
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Trading Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Total Trades</span>
                          <span className="font-medium">78</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Win/Loss Ratio</span>
                          <span className="font-medium">2.1</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Average Trade Duration</span>
                          <span className="font-medium">2d 8h</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Largest Winner</span>
                          <span className="font-medium text-green-500">+$1,245.32</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Largest Loser</span>
                          <span className="font-medium text-red-500">-$528.75</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Risk Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Value at Risk (VaR)</span>
                          <span className="font-medium">$3,762</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Expected Shortfall</span>
                          <span className="font-medium">$5,234</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Beta</span>
                          <span className="font-medium">1.25</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Sortino Ratio</span>
                          <span className="font-medium">2.1</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Calmar Ratio</span>
                          <span className="font-medium">3.5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

interface AssetAllocationProps {
  name: string;
  percentage: number;
  value: string;
  color: string;
}

function AssetAllocation({ name, percentage, value, color }: AssetAllocationProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{name}</span>
        <span className="font-medium">{percentage}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
      <div className="text-sm text-muted-foreground">{value}</div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeIsGood?: boolean;
  description: string;
  icon: React.ElementType;
}

function MetricCard({ title, value, change, changeIsGood = false, description, icon: Icon }: MetricCardProps) {
  const isPositive = change >= 0;
  const showPositiveColor = (isPositive && !changeIsGood) || (!isPositive && changeIsGood);
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <div className="flex items-center mt-1">
              <div
                className={`flex items-center text-xs ${
                  showPositiveColor ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {Math.abs(change).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground ml-1.5">{description}</p>
            </div>
          </div>
          <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
