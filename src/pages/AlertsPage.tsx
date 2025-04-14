
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bell, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AlertsPage() {
  // Sample alerts data
  const alerts = [
    { id: 1, name: "BTC Price Alert", condition: "Price above $50,000", status: "Active", priority: "High", lastTriggered: "Never" },
    { id: 2, name: "ETH Volume Spike", condition: "24h volume > 150% average", status: "Active", priority: "Medium", lastTriggered: "2025-04-12 14:30" },
    { id: 3, name: "Portfolio Drawdown", condition: "Daily drawdown > 5%", status: "Active", priority: "Critical", lastTriggered: "Never" },
    { id: 4, name: "AAPL Earnings Report", condition: "News mention 'AAPL earnings'", status: "Inactive", priority: "Medium", lastTriggered: "2025-03-25 09:15" },
    { id: 5, name: "Market Volatility", condition: "VIX > 30", status: "Active", priority: "High", lastTriggered: "Never" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Alerts
          </h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Settings className="mr-1 h-4 w-4" />
              Configure
            </Button>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              New Alert
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alert Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Last Triggered</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.name}</TableCell>
                    <TableCell>{alert.condition}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alert.priority === "Critical" 
                            ? "destructive" 
                            : alert.priority === "High" 
                              ? "default" 
                              : "secondary"
                        }
                      >
                        {alert.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.lastTriggered}</TableCell>
                    <TableCell>
                      <Switch checked={alert.status === "Active"} />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TableCell>
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
