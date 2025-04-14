
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Settings, RefreshCw, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "Trade Executed",
      message: "Buy order for BTC/USD executed at $48,235",
      time: "14:32",
      type: "trade",
      read: false
    },
    {
      id: 2,
      title: "Risk Alert",
      message: "Portfolio drawdown approaching threshold (8.5%/10%)",
      time: "12:15",
      type: "risk",
      read: false
    },
    {
      id: 3,
      title: "API Connection",
      message: "Successfully reconnected to Binance API",
      time: "Yesterday",
      type: "system",
      read: true
    },
    {
      id: 4,
      title: "Market Alert",
      message: "Unusual volume detected in ETH/USD",
      time: "Yesterday",
      type: "market",
      read: true
    },
    {
      id: 5,
      title: "AI Agent",
      message: "Strategic Agent identified potential trade opportunity in AAPL",
      time: "2 days ago",
      type: "agent",
      read: true
    }
  ];

  // Sample notification settings
  const notificationSettings = [
    { id: 1, name: "Trade Notifications", enabled: true, channels: ["Web", "Telegram"] },
    { id: 2, name: "Risk Alerts", enabled: true, channels: ["Web", "Telegram", "Email"] },
    { id: 3, name: "System Notifications", enabled: true, channels: ["Web"] },
    { id: 4, name: "Market Alerts", enabled: false, channels: ["Web", "Telegram"] },
    { id: 5, name: "AI Agent Updates", enabled: true, channels: ["Web"] }
  ];

  const getNotificationIcon = (type) => {
    switch(type) {
      case "trade": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "risk": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "system": return <Info className="h-5 w-5 text-blue-500" />;
      case "market": return <RefreshCw className="h-5 w-5 text-purple-500" />;
      case "agent": return <MessageCircle className="h-5 w-5 text-indigo-500" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Notifications
          </h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Settings className="mr-1 h-4 w-4" />
              Configure
            </Button>
            <Button size="sm" variant="outline">
              <RefreshCw className="mr-1 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Your most recent system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <Alert key={notification.id} variant="default" className={notification.read ? "bg-muted/50" : "bg-card border-primary/20"}>
                    <div className="flex items-start">
                      <div className="mr-2">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold">{notification.title}</h4>
                          <div className="flex items-center">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            {!notification.read && <Badge variant="default" className="ml-2 bg-primary/20 text-primary text-xs">New</Badge>}
                          </div>
                        </div>
                        <AlertDescription className="mt-1">{notification.message}</AlertDescription>
                      </div>
                    </div>
                  </Alert>
                ))}
                <div className="text-center pt-2">
                  <Button variant="outline" size="sm">View All Notifications</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationSettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between pb-2 border-b border-border">
                      <div>
                        <h4 className="text-sm font-medium">{setting.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {setting.channels.join(", ")}
                        </p>
                      </div>
                      <Switch checked={setting.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
