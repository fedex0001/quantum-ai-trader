
import { Activity, AlertCircle, Bell, ChevronDown, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'reconnecting' | 'disconnected'>('connected');
  const [activeAgents, setActiveAgents] = useState(8);
  const [notifications, setNotifications] = useState(3);

  const statusColor = {
    connected: "bg-green-500",
    reconnecting: "bg-yellow-500",
    disconnected: "bg-red-500"
  };

  const statusText = {
    connected: "Connected",
    reconnecting: "Reconnecting...",
    disconnected: "Disconnected"
  };

  return (
    <header className="border-b border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="flex items-center text-xl font-bold">
            <Zap className="mr-2 h-6 w-6 text-blue-500" />
            Quantum AI Trader
          </h1>
          
          <div className="hidden md:flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${statusColor[connectionStatus]}`} />
            <span className="text-sm text-muted-foreground">{statusText[connectionStatus]}</span>
          </div>
          
          <Badge variant="outline" className="hidden md:flex">
            <Activity className="mr-1 h-3 w-3" />
            <span>{activeAgents} Agents Active</span>
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="relative"
            onClick={() => toast({
              title: "Notifications",
              description: "You have 3 new trading signals and 1 risk alert",
            })}
          >
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>

          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => toast({
              title: "System Status",
              description: "All systems operational. Last update: 2 minutes ago.",
              variant: "default",
            })}
          >
            <AlertCircle className="mr-1 h-4 w-4" />
            Status
          </Button>
          
          <Button size="sm" variant="outline" className="hidden md:flex">
            <Globe className="mr-1 h-4 w-4" />
            EN
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </header>
  );
}
