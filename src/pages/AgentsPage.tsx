
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Eye, MessageSquare, Play, RefreshCcw, Settings, Terminal, XCircle, Bot, Cpu } from "lucide-react";

export default function AgentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">AI Agents Management</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-1 h-4 w-4" />
              Refresh Status
            </Button>
            <Button size="sm">
              <Play className="mr-1 h-4 w-4" />
              Start All
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AgentCard 
                name="Data Collector" 
                description="Retrieves market data from multiple sources including price data, news, and fundamental information"
                status="active"
                cpuUsage={45}
                memoryUsage={32}
                actionsPerMinute={12.5}
                lastUpdated="2 min ago"
                type="data"
              />
              
              <AgentCard 
                name="Technical Analyst" 
                description="Performs technical analysis on price data using indicators and pattern recognition"
                status="active"
                cpuUsage={78}
                memoryUsage={56}
                actionsPerMinute={8.2}
                lastUpdated="30 sec ago"
                type="analysis"
              />
              
              <AgentCard 
                name="Fundamental Analyst" 
                description="Analyzes company financials and economic data to evaluate asset value"
                status="active"
                cpuUsage={62}
                memoryUsage={48}
                actionsPerMinute={3.1}
                lastUpdated="1 min ago"
                type="analysis"
              />
              
              <AgentCard 
                name="Sentiment Analyst" 
                description="Evaluates market sentiment from news and social media using NLP"
                status="active"
                cpuUsage={55}
                memoryUsage={42}
                actionsPerMinute={7.3}
                lastUpdated="5 min ago"
                type="analysis"
              />
              
              <AgentCard 
                name="Strategic Agent" 
                description="Aggregates analysis from other agents and identifies trading opportunities"
                status="active"
                cpuUsage={85}
                memoryUsage={67}
                actionsPerMinute={1.5}
                lastUpdated="15 sec ago"
                type="decision"
              />
              
              <AgentCard 
                name="Risk Manager" 
                description="Evaluates risk, determines position sizes, and sets stop-loss and take-profit levels"
                status="active"
                cpuUsage={48}
                memoryUsage={37}
                actionsPerMinute={3.0}
                lastUpdated="1 min ago"
                type="risk"
              />
              
              <AgentCard 
                name="Execution Agent" 
                description="Interfaces with broker APIs to execute trades and monitor orders"
                status="idle"
                cpuUsage={22}
                memoryUsage={18}
                actionsPerMinute={0.9}
                lastUpdated="10 min ago"
                type="execution"
              />
              
              <AgentCard 
                name="Portfolio Manager" 
                description="Monitors portfolio performance, exposure, and key metrics"
                status="active"
                cpuUsage={41}
                memoryUsage={35}
                actionsPerMinute={1.1}
                lastUpdated="3 min ago"
                type="management"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="configuration" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Configuration</CardTitle>
                <CardDescription>Configure how AI agents work and interact with each other</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="font-medium">Model Selection</div>
                      <Select defaultValue="gemini-2.5">
                        <SelectTrigger>
                          <SelectValue placeholder="Select AI model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gemini-2.5">Gemini 2.5 Pro</SelectItem>
                          <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                          <SelectItem value="claude-3.5">Claude 3.5 Sonnet</SelectItem>
                          <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Updates Frequency</div>
                      <Select defaultValue="1m">
                        <SelectTrigger>
                          <SelectValue placeholder="Select update frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10s">10 seconds</SelectItem>
                          <SelectItem value="30s">30 seconds</SelectItem>
                          <SelectItem value="1m">1 minute</SelectItem>
                          <SelectItem value="5m">5 minutes</SelectItem>
                          <SelectItem value="15m">15 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-medium">Temperature</label>
                        <span className="text-sm text-muted-foreground">0.2</span>
                      </div>
                      <Slider defaultValue={[20]} max={100} step={1} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-medium">Max Tokens</label>
                        <span className="text-sm text-muted-foreground">4096</span>
                      </div>
                      <Slider defaultValue={[4096]} max={8192} step={256} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-medium">Agent Permissions</div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <Terminal className="mr-2 h-4 w-4" />
                          <span>Execute Orders</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Send Notifications</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          <span>Auto-Restart On Error</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Logs</CardTitle>
                <CardDescription>Real-time log output from all AI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] rounded-md border bg-muted/50 p-4 font-mono text-sm overflow-auto">
                  <div className="space-y-2">
                    <div>
                      <span className="text-blue-500">[10:45:32]</span> <span className="text-green-500">[DATA_COLLECTOR]</span> Starting market data collection...
                    </div>
                    <div>
                      <span className="text-blue-500">[10:45:33]</span> <span className="text-green-500">[DATA_COLLECTOR]</span> Connected to Binance API successfully
                    </div>
                    <div>
                      <span className="text-blue-500">[10:45:35]</span> <span className="text-green-500">[DATA_COLLECTOR]</span> Retrieved BTC/USD price: $65,432.50
                    </div>
                    <div>
                      <span className="text-blue-500">[10:45:36]</span> <span className="text-green-500">[TECHNICAL_ANALYST]</span> Calculating indicators for BTC/USD
                    </div>
                    <div>
                      <span className="text-blue-500">[10:45:38]</span> <span className="text-green-500">[TECHNICAL_ANALYST]</span> RSI(14): 62.5, MACD: 235.6
                    </div>
                    <div>
                      <span className="text-blue-500">[10:45:40]</span> <span className="text-green-500">[SENTIMENT_ANALYST]</span> Analyzing recent news articles
                    </div>
                    <div>
                      <span className="text-blue-500">[10:45:45]</span> <span className="text-green-500">[SENTIMENT_ANALYST]</span> Market sentiment: Bullish (75%)
                    </div>
                    <div>
                      <span className="text-blue-500">[10:45:50]</span> <span className="text-green-500">[STRATEGIC_AGENT]</span> Evaluating trading opportunity for BTC/USD
                    </div>
                    <div>
                      <span className="text-blue-500">[10:45:52]</span> <span className="text-green-500">[STRATEGIC_AGENT]</span> Generating trading signal...
                    </div>
                    <div>
                      <span className="text-blue-500">[10:45:55]</span> <span className="text-green-500">[STRATEGIC_AGENT]</span> Trade opportunity identified: BTC/USD LONG
                    </div>
                    <div>
                      <span className="text-blue-500">[10:46:00]</span> <span className="text-green-500">[RISK_MANAGER]</span> Calculating position size for BTC/USD trade
                    </div>
                    <div>
                      <span className="text-blue-500">[10:46:02]</span> <span className="text-green-500">[RISK_MANAGER]</span> Position size: 0.15 BTC, Risk: 2% of portfolio
                    </div>
                    <div>
                      <span className="text-blue-500">[10:46:05]</span> <span className="text-green-500">[EXECUTION_AGENT]</span> Preparing order: BUY 0.15 BTC at market
                    </div>
                    <div>
                      <span className="text-blue-500">[10:46:07]</span> <span className="text-green-500">[EXECUTION_AGENT]</span> Order executed: ID #45789 BUY 0.15 BTC at $65,432.50
                    </div>
                    <div>
                      <span className="text-blue-500">[10:46:10]</span> <span className="text-green-500">[PORTFOLIO_MANAGER]</span> Updating portfolio: Added 0.15 BTC position
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  Showing last 15 log entries
                </div>
                <Button variant="outline" size="sm">Export Logs</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance Metrics</CardTitle>
                <CardDescription>Monitor CPU, memory usage and efficiency of AI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border bg-card p-4">
                    <h4 className="font-semibold mb-2">System Resources</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <ResourceMeter label="CPU Usage" value={65} max={100} unit="%" />
                      <ResourceMeter label="Memory Usage" value={4.2} max={8} unit="GB" />
                      <ResourceMeter label="API Calls" value={1250} max={5000} unit="calls/day" />
                    </div>
                  </div>
                  
                  <div className="rounded-lg border bg-card p-4">
                    <h4 className="font-semibold mb-2">Decision Accuracy</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <ResourceMeter label="Technical Accuracy" value={85} max={100} unit="%" />
                      <ResourceMeter label="Sentiment Accuracy" value={78} max={100} unit="%" />
                      <ResourceMeter label="Trade Signal Accuracy" value={72} max={100} unit="%" />
                    </div>
                  </div>
                  
                  <div className="rounded-lg border bg-card p-4">
                    <h4 className="font-semibold mb-2">LLM Usage Metrics</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <ResourceMeter label="Daily API Tokens" value={2.5} max={10} unit="M tokens" />
                      <ResourceMeter label="Response Time" value={0.8} max={5} unit="sec" />
                      <ResourceMeter label="Cost Today" value={3.85} max={10} unit="$" />
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

interface AgentCardProps {
  name: string;
  description: string;
  status: "active" | "idle" | "error";
  cpuUsage: number;
  memoryUsage: number;
  actionsPerMinute: number;
  lastUpdated: string;
  type: "data" | "analysis" | "decision" | "risk" | "execution" | "management";
}

function AgentCard({ name, description, status, cpuUsage, memoryUsage, actionsPerMinute, lastUpdated, type }: AgentCardProps) {
  const statusColor = {
    active: "bg-green-500",
    idle: "bg-yellow-500",
    error: "bg-red-500",
  };
  
  const statusText = {
    active: "Active",
    idle: "Idle",
    error: "Error",
  };

  const typeIcons = {
    data: <Bot className="h-5 w-5 text-blue-500" />,
    analysis: <BrainCircuit className="h-5 w-5 text-purple-500" />,
    decision: <Play className="h-5 w-5 text-green-500" />,
    risk: <Terminal className="h-5 w-5 text-orange-500" />,
    execution: <Cpu className="h-5 w-5 text-red-500" />,
    management: <Settings className="h-5 w-5 text-gray-500" />,
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {typeIcons[type]}
            <CardTitle className="text-md font-medium">{name}</CardTitle>
          </div>
          <Badge 
            variant="outline" 
            className={`px-2 py-0.5 ${status === 'active' ? 'border-green-500 text-green-500' : status === 'idle' ? 'border-yellow-500 text-yellow-500' : 'border-red-500 text-red-500'}`}
          >
            <div className={`mr-1 h-2 w-2 rounded-full ${statusColor[status]}`} />
            {statusText[status]}
          </Badge>
        </div>
        <CardDescription className="mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>CPU</span>
              <span className="font-medium">{cpuUsage}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary">
              <div 
                className={`h-1.5 rounded-full ${cpuUsage > 80 ? 'bg-red-500' : cpuUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                style={{ width: `${cpuUsage}%` }} 
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Memory</span>
              <span className="font-medium">{memoryUsage}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary">
              <div 
                className={`h-1.5 rounded-full ${memoryUsage > 80 ? 'bg-red-500' : memoryUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                style={{ width: `${memoryUsage}%` }} 
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div>{actionsPerMinute} actions/min</div>
          <div>Updated {lastUpdated}</div>
        </div>
      </CardFooter>
    </Card>
  );
}

interface ResourceMeterProps {
  label: string;
  value: number;
  max: number;
  unit: string;
}

function ResourceMeter({ label, value, max, unit }: ResourceMeterProps) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span>{value} {unit}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary">
        <div 
          className={`h-2 rounded-full ${percentage > 80 ? 'bg-red-500' : percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>0 {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}
