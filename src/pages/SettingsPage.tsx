
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, Database, Shield, MessagesSquare, Zap, AlertTriangle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";

export default function SettingsPage() {
  const handleSaveSettings = () => {
    toast("Settings saved successfully", {
      description: "Your changes have been applied.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Settings
          </h2>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-1 h-4 w-4" />
            Save Changes
          </Button>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure application-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="appName">Application Name</Label>
                  <Input id="appName" defaultValue="AI Trading Platform" />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-md font-medium">Data Sources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label htmlFor="binance-source" className="font-medium">Binance Data</Label>
                        <p className="text-sm text-muted-foreground">Use Binance as data source</p>
                      </div>
                      <Switch id="binance-source" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label htmlFor="mt5-source" className="font-medium">MetaTrader 5 Data</Label>
                        <p className="text-sm text-muted-foreground">Use MT5 as data source</p>
                      </div>
                      <Switch id="mt5-source" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label htmlFor="alpha-source" className="font-medium">Alpha Vantage</Label>
                        <p className="text-sm text-muted-foreground">Use Alpha Vantage API</p>
                      </div>
                      <Switch id="alpha-source" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label htmlFor="finnhub-source" className="font-medium">Finnhub Data</Label>
                        <p className="text-sm text-muted-foreground">Use Finnhub API</p>
                      </div>
                      <Switch id="finnhub-source" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-md font-medium">UI Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Use dark theme</p>
                      </div>
                      <Switch id="dark-mode" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label htmlFor="real-time-updates" className="font-medium">Real-time Updates</Label>
                        <p className="text-sm text-muted-foreground">Update UI in real-time</p>
                      </div>
                      <Switch id="real-time-updates" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Database Configuration</CardTitle>
                <CardDescription>Configure database settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Using SQLite database</span>
                  <Badge variant="outline">Default</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-path">Database Path</Label>
                    <Input id="db-path" defaultValue="./data/trading.db" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-interval">Backup Interval (hours)</Label>
                    <Input id="backup-interval" type="number" defaultValue="24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="agents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Agent Settings</CardTitle>
                <CardDescription>Configure AI agents behavior and parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-blue-500" />
                        <Label className="font-medium">Data Collector Agent</Label>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Enabled</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="mt-2">
                        <Label htmlFor="data-interval" className="text-sm">Update Interval (sec)</Label>
                        <Input id="data-interval" type="number" defaultValue="30" className="mt-1" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-green-500" />
                        <Label className="font-medium">Technical Analyst Agent</Label>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Enabled</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="mt-2">
                        <Label htmlFor="tech-timeframes" className="text-sm">Timeframes</Label>
                        <Input id="tech-timeframes" defaultValue="1h, 4h, 1d" className="mt-1" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-purple-500" />
                        <Label className="font-medium">Fundamental Analyst Agent</Label>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Enabled</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="mt-2">
                        <Label htmlFor="fund-sources" className="text-sm">Data Sources</Label>
                        <Input id="fund-sources" defaultValue="Alpha Vantage, Finnhub" className="mt-1" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-amber-500" />
                        <Label className="font-medium">Sentiment Analyst Agent</Label>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Enabled</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="mt-2">
                        <Label htmlFor="sentiment-sources" className="text-sm">Sources</Label>
                        <Input id="sentiment-sources" defaultValue="News, Twitter, Reddit" className="mt-1" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-red-500" />
                        <Label className="font-medium">Risk Management Agent</Label>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Enabled</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="mt-2">
                        <Label htmlFor="max-drawdown" className="text-sm">Max Drawdown (%)</Label>
                        <Input id="max-drawdown" type="number" defaultValue="10" className="mt-1" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-indigo-500" />
                        <Label className="font-medium">Strategic Agent</Label>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Enabled</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="mt-2">
                        <Label htmlFor="max-trades" className="text-sm">Max Concurrent Trades</Label>
                        <Input id="max-trades" type="number" defaultValue="5" className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>LLM Integration</CardTitle>
                <CardDescription>Configure Large Language Model settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Gemini 2.5 API</h3>
                    <p className="text-sm text-muted-foreground">Connect to Google's Gemini API</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" defaultValue="••••••••••••••••••" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Model Version</Label>
                    <Input id="model" defaultValue="gemini-2.5-pro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" step="0.1" defaultValue="0.7" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risk" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-500" />
                  Risk Management Settings
                </CardTitle>
                <CardDescription>Configure risk parameters and limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-md font-medium">Position Sizing</h3>
                      <div className="space-y-2">
                        <Label htmlFor="max-position">Maximum Position Size (%)</Label>
                        <Input id="max-position" type="number" step="0.01" defaultValue="5" />
                        <p className="text-xs text-muted-foreground mt-1">Maximum % of capital per trade</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="risk-per-trade">Risk Per Trade (%)</Label>
                        <Input id="risk-per-trade" type="number" step="0.01" defaultValue="2" />
                        <p className="text-xs text-muted-foreground mt-1">Maximum risk % per trade</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-md font-medium">Risk Limits</h3>
                      <div className="space-y-2">
                        <Label htmlFor="max-drawdown">Maximum Drawdown (%)</Label>
                        <Input id="max-drawdown" type="number" step="0.1" defaultValue="10" />
                        <p className="text-xs text-muted-foreground mt-1">Maximum allowed drawdown</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="daily-loss">Daily Loss Limit (%)</Label>
                        <Input id="daily-loss" type="number" step="0.1" defaultValue="5" />
                        <p className="text-xs text-muted-foreground mt-1">Daily loss limit</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Stop Trading Conditions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">Daily Loss Limit Reached</Label>
                          <p className="text-sm text-muted-foreground">Stop trading if daily loss limit is reached</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">Maximum Drawdown Reached</Label>
                          <p className="text-sm text-muted-foreground">Stop trading if maximum drawdown is reached</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">High Market Volatility</Label>
                          <p className="text-sm text-muted-foreground">Stop trading during high market volatility</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessagesSquare className="mr-2 h-5 w-5 text-blue-500" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure notification channels and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Notification Channels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <div>
                          <Label className="font-medium">Web Notifications</Label>
                          <p className="text-sm text-muted-foreground">Show in-app notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <div>
                          <Label className="font-medium">Telegram Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send notifications via Telegram</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <div>
                          <Label className="font-medium">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send email alerts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Notification Types</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Trading</h4>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="trade-opened" className="text-sm">Trade Opened</Label>
                          <Switch id="trade-opened" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="trade-closed" className="text-sm">Trade Closed</Label>
                          <Switch id="trade-closed" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="order-failed" className="text-sm">Order Failed</Label>
                          <Switch id="order-failed" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Risk</h4>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="risk-warning" className="text-sm">Risk Warning</Label>
                          <Switch id="risk-warning" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="loss-limit" className="text-sm">Loss Limit Reached</Label>
                          <Switch id="loss-limit" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="max-drawdown" className="text-sm">Max Drawdown Alert</Label>
                          <Switch id="max-drawdown" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">System</h4>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="system-start" className="text-sm">System Start/Stop</Label>
                          <Switch id="system-start" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="api-connect" className="text-sm">API Connect/Disconnect</Label>
                          <Switch id="api-connect" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="agent-error" className="text-sm">Agent Error</Label>
                          <Switch id="agent-error" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Telegram Bot Configuration</CardTitle>
                <CardDescription>Configure Telegram bot for notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="telegram-token">Bot Token</Label>
                  <Input id="telegram-token" type="password" defaultValue="••••••••••••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram-chat">Chat ID</Label>
                  <Input id="telegram-chat" defaultValue="123456789" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="sm">Test Connection</Button>
                  <Button variant="outline" size="sm">Send Test Message</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
