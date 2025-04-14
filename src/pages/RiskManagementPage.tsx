
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle, BarChart2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RiskManagementPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Risk Management</h2>
          <Button size="sm" variant="outline">
            <Settings className="mr-1 h-4 w-4" />
            Risk Settings
          </Button>
        </div>
        
        <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Current drawdown is 3.2%. Maximum allowed drawdown is 10%.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RiskMetricCard 
            title="Portfolio Risk" 
            value="24%" 
            maxValue="35%"
            percentage={68}
            color="bg-green-500"
          />
          <RiskMetricCard 
            title="Market Exposure" 
            value="$45,250" 
            maxValue="$60,000"
            percentage={75}
            color="bg-yellow-500"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-4 w-4 text-green-500" />
                Risk Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Maximum position size:</span>
                  <span className="font-medium">5% of capital</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Stop-loss policy:</span>
                  <span className="font-medium">2% per trade</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Maximum open positions:</span>
                  <span className="font-medium">5 trades</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Correlation limit:</span>
                  <span className="font-medium">0.7 max</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Volatility adjustment:</span>
                  <span className="font-medium">Enabled</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-4 w-4 text-blue-500" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center bg-muted/20">
              <div className="text-center text-muted-foreground">
                <p>Risk analysis visualization will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>
              Current portfolio risk metrics and assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Risk Metrics</h4>
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
                      <span>Maximum Drawdown</span>
                      <span className="font-medium">8.5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Exposure by Asset Class</h4>
                  <div className="space-y-3">
                    <ExposureItem name="Cryptocurrencies" percentage={45} color="bg-blue-500" />
                    <ExposureItem name="Forex" percentage={30} color="bg-green-500" />
                    <ExposureItem name="Commodities" percentage={15} color="bg-yellow-500" />
                    <ExposureItem name="Stocks" percentage={10} color="bg-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

interface RiskMetricCardProps {
  title: string;
  value: string;
  maxValue: string;
  percentage: number;
  color: string;
}

function RiskMetricCard({ title, value, maxValue, percentage, color }: RiskMetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-sm font-medium">
              {value} <span className="text-muted-foreground">/ {maxValue}</span>
            </p>
          </div>
          <Progress value={percentage} className="h-2">
            <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
          </Progress>
        </div>
      </CardContent>
    </Card>
  );
}

interface ExposureItemProps {
  name: string;
  percentage: number;
  color: string;
}

function ExposureItem({ name, percentage, color }: ExposureItemProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{name}</span>
        <span className="font-medium">{percentage}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
