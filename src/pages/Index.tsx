
import { DashboardLayout } from "@/components/dashboard/Layout";
import { MarketDataCard } from "@/components/dashboard/MarketDataCard";
import { AgentStatusCard } from "@/components/dashboard/AgentStatusCard";
import { ActiveTradesTable } from "@/components/dashboard/ActiveTradesTable";
import { SimplePriceChart } from "@/components/dashboard/SimplePriceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const marketData = [
  { title: "BTC/USD", value: "$65,432.50", change: 2.34, timeframe: "24h" },
  { title: "ETH/USD", value: "$3,211.45", change: -0.85, timeframe: "24h" },
  { title: "Portfolio Value", value: "$125,430.25", change: 1.22, timeframe: "24h" },
  { title: "Daily P&L", value: "+$1,532.70", change: 3.1, timeframe: "24h" },
];

const agents = [
  {
    name: "Data Collector Agent",
    description: "Collecting market data from multiple sources",
    status: "active" as const,
    lastAction: "2 min ago",
    resourceUsage: 45,
    actionCount: 1205,
  },
  {
    name: "Technical Analyst Agent",
    description: "Running pattern recognition on BTC/USD",
    status: "active" as const,
    lastAction: "30 sec ago",
    resourceUsage: 72,
    actionCount: 847,
  },
  {
    name: "Fundamental Analyst Agent",
    description: "Analyzing recent financial news",
    status: "active" as const,
    lastAction: "1 min ago",
    resourceUsage: 60,
    actionCount: 324,
  },
  {
    name: "Sentiment Analyst Agent",
    description: "Processing social media sentiment",
    status: "active" as const,
    lastAction: "5 min ago",
    resourceUsage: 55,
    actionCount: 721,
  },
  {
    name: "Strategic Agent",
    description: "Evaluating trading opportunities",
    status: "active" as const,
    lastAction: "15 sec ago",
    resourceUsage: 85,
    actionCount: 152,
  },
  {
    name: "Risk Manager Agent",
    description: "Monitoring portfolio risk metrics",
    status: "active" as const,
    lastAction: "1 min ago",
    resourceUsage: 50,
    actionCount: 312,
  },
  {
    name: "Execution Agent",
    description: "Managing trade execution",
    status: "idle" as const,
    lastAction: "10 min ago",
    resourceUsage: 20,
    actionCount: 87,
  },
  {
    name: "Portfolio Manager Agent",
    description: "Tracking overall portfolio performance",
    status: "active" as const,
    lastAction: "3 min ago",
    resourceUsage: 40,
    actionCount: 92,
  },
];

const activeTrades = [
  {
    id: "1",
    symbol: "BTC/USD",
    direction: "long" as const,
    entryPrice: 64215.50,
    currentPrice: 65432.50,
    pnl: 1217.00,
    pnlPercentage: 1.89,
    riskLevel: "medium" as const,
    openTime: "Today, 10:32 AM",
    confidence: 85,
    strategy: "Momentum",
  },
  {
    id: "2",
    symbol: "ETH/USD",
    direction: "short" as const,
    entryPrice: 3250.25,
    currentPrice: 3211.45,
    pnl: 38.80,
    pnlPercentage: 1.19,
    riskLevel: "low" as const,
    openTime: "Yesterday, 8:15 PM",
    confidence: 72,
    strategy: "Mean Reversion",
  },
  {
    id: "3",
    symbol: "SOL/USD",
    direction: "long" as const,
    entryPrice: 120.45,
    currentPrice: 125.75,
    pnl: 5.30,
    pnlPercentage: 4.40,
    riskLevel: "medium" as const,
    openTime: "Today, 9:45 AM",
    confidence: 68,
    strategy: "Breakout",
  },
];

// Generate some fake chart data
const generateChartData = (length: number, trending: "up" | "down" | "sideways") => {
  const data: number[] = [];
  let value = 100;
  
  for (let i = 0; i < length; i++) {
    if (trending === "up") {
      value += Math.random() * 5 - 1; // More likely to go up
    } else if (trending === "down") {
      value -= Math.random() * 5 - 1; // More likely to go down
    } else {
      value += Math.random() * 6 - 3; // Equally likely to go up or down
    }
    data.push(Math.max(0, value));
  }
  
  return data;
};

const btcChart = generateChartData(24, "up");
const ethChart = generateChartData(24, "down");
const portfolioChart = generateChartData(24, "up");

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {marketData.map((item) => (
            <MarketDataCard key={item.title} {...item} />
          ))}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SimplePriceChart title="Bitcoin" symbol="BTC/USD" data={btcChart} isPositive={true} />
          <SimplePriceChart title="Ethereum" symbol="ETH/USD" data={ethChart} isPositive={false} />
          <SimplePriceChart title="Portfolio Value" symbol="USD" data={portfolioChart} isPositive={true} />
        </div>
        
        <div className="grid gap-4 grid-cols-1">
          <ActiveTradesTable trades={activeTrades} />
        </div>
        
        <Tabs defaultValue="agents">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">System Status</h2>
            <TabsList className="ml-auto">
              <TabsTrigger value="agents">AI Agents</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="connections">API Connections</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="agents" className="m-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {agents.map((agent) => (
                <AgentStatusCard key={agent.name} {...agent} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="strategies" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Active Trading Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Trading strategies information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="connections" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>API Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <p>API connection status information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Index;
