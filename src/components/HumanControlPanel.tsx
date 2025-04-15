
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Play, Pause, PowerOff, AlertTriangle, Zap, Lock, Shield, Eye, ChevronsUp, ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  status: "online" | "offline" | "error";
  cpuUsage: number;
  memoryUsage: number;
  tasks: number;
}

export function HumanControlPanel() {
  const [systemRunning, setSystemRunning] = useState(false);
  const [expanded, setExpanded] = useState(true);

  // Sample agent states
  const [agents, setAgents] = useState<Agent[]>([
    { id: "data-collector", name: "Data Collector", status: "offline", cpuUsage: 0, memoryUsage: 0, tasks: 0 },
    { id: "technical-analyst", name: "Technical Analyst", status: "offline", cpuUsage: 0, memoryUsage: 0, tasks: 0 },
    { id: "fundamental-analyst", name: "Fundamental Analyst", status: "offline", cpuUsage: 0, memoryUsage: 0, tasks: 0 },
    { id: "sentiment-analyst", name: "Sentiment Analyst", status: "offline", cpuUsage: 0, memoryUsage: 0, tasks: 0 },
    { id: "strategic", name: "Strategic Agent", status: "offline", cpuUsage: 0, memoryUsage: 0, tasks: 0 },
    { id: "risk-manager", name: "Risk Manager", status: "offline", cpuUsage: 0, memoryUsage: 0, tasks: 0 },
    { id: "executor", name: "Trade Executor", status: "offline", cpuUsage: 0, memoryUsage: 0, tasks: 0 },
  ]);

  const [systemHealth, setSystemHealth] = useState({
    cpuUsage: 0,
    memoryUsage: 0, 
    agentsOnline: 0,
    activeTasks: 0,
    latency: 0,
  });

  const handleStartStop = () => {
    if (systemRunning) {
      // Stop system
      setSystemRunning(false);
      // Reset agent states
      setAgents(agents.map(agent => ({
        ...agent,
        status: "offline",
        cpuUsage: 0,
        memoryUsage: 0,
        tasks: 0
      })));
      
      // Reset system health
      setSystemHealth({
        cpuUsage: 0,
        memoryUsage: 0,
        agentsOnline: 0,
        activeTasks: 0,
        latency: 0,
      });
      
      toast("Sistema fermato", {
        description: "Tutti gli agenti AI sono stati spenti.",
        icon: <PowerOff className="h-4 w-4" />,
      });
    } else {
      // Start system
      setSystemRunning(true);
      
      // Simulate agents starting up
      setTimeout(() => {
        setAgents(agents.map(agent => ({
          ...agent,
          status: "online",
          cpuUsage: Math.floor(Math.random() * 30) + 10,
          memoryUsage: Math.floor(Math.random() * 40) + 20,
          tasks: Math.floor(Math.random() * 5)
        })));
        
        // Update system health
        setSystemHealth({
          cpuUsage: 45,
          memoryUsage: 60,
          agentsOnline: 7,
          activeTasks: 12,
          latency: 230,
        });
      }, 2000);
      
      toast("Sistema avviato", {
        description: "Tutti gli agenti AI sono ora in esecuzione.",
        icon: <Zap className="h-4 w-4" />,
      });
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "offline": return "bg-gray-300";
      case "error": return "bg-red-500";
      default: return "bg-gray-300";
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-96 shadow-lg">
      <CardHeader className={cn("pb-2 cursor-pointer select-none", expanded ? "" : "pb-0")} onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-3 w-3 rounded-full",
              systemRunning ? "bg-green-500" : "bg-gray-300"
            )} />
            <CardTitle className="text-base">Pannello di Controllo Umano</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}>
            {expanded ? <ChevronsDown className="h-4 w-4" /> : <ChevronsUp className="h-4 w-4" />}
          </Button>
        </div>
        {!expanded && (
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={systemRunning ? "default" : "outline"}>
              {systemRunning ? "Sistema Attivo" : "Sistema Spento"}
            </Badge>
            <Badge variant="outline">{systemHealth.agentsOnline}/7 Agenti Attivi</Badge>
          </div>
        )}
      </CardHeader>
      
      {expanded && (
        <>
          <CardContent className="space-y-4 pt-0">
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                {systemRunning ? (
                  <Badge variant="default" className="bg-green-500">Sistema Attivo</Badge>
                ) : (
                  <Badge variant="outline">Sistema Spento</Badge>
                )}
              </div>
              <Button 
                variant={systemRunning ? "outline" : "default"}
                size="sm"
                onClick={handleStartStop}
              >
                {systemRunning ? (
                  <>
                    <Pause className="mr-1 h-4 w-4" />
                    Ferma Sistema
                  </>
                ) : (
                  <>
                    <Play className="mr-1 h-4 w-4" />
                    Avvia Sistema
                  </>
                )}
              </Button>
            </div>
            
            {systemRunning && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Utilizzo CPU</span>
                      <span>{systemHealth.cpuUsage}%</span>
                    </div>
                    <Progress value={systemHealth.cpuUsage} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Memoria</span>
                      <span>{systemHealth.memoryUsage}%</span>
                    </div>
                    <Progress value={systemHealth.memoryUsage} />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex flex-col items-center bg-muted/30 rounded p-2">
                    <span className="text-muted-foreground">Agenti</span>
                    <span className="text-lg font-medium">{systemHealth.agentsOnline}/7</span>
                  </div>
                  <div className="flex flex-col items-center bg-muted/30 rounded p-2">
                    <span className="text-muted-foreground">Attività</span>
                    <span className="text-lg font-medium">{systemHealth.activeTasks}</span>
                  </div>
                  <div className="flex flex-col items-center bg-muted/30 rounded p-2">
                    <span className="text-muted-foreground">Latenza</span>
                    <span className="text-lg font-medium">{systemHealth.latency}ms</span>
                  </div>
                </div>
              </div>
            )}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Agenti AI</h4>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {agents.filter(a => a.status === "online").length}/{agents.length} Attivi
                  </span>
                </div>
              </div>
              
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2 w-2 rounded-full", getStatusColor(agent.status))} />
                      <span>{agent.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {systemRunning && agent.status === "online" && (
                        <span className="text-xs text-muted-foreground">
                          {agent.tasks} attività
                        </span>
                      )}
                      <Switch
                        checked={agent.status === "online"}
                        disabled={!systemRunning}
                        className="scale-75 origin-right"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <div className="flex items-center text-xs text-muted-foreground">
              <Shield className="h-3 w-3 mr-1" />
              Override umano disponibile
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled={!systemRunning}>
                <Eye className="h-3 w-3 mr-1" />
                Monitora
              </Button>
              <Button variant="destructive" size="sm" disabled={!systemRunning}>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Stop Emergenza
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
