
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CircleCheck, AlertTriangle, Timer, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type AgentStatus = "active" | "idle" | "error";

interface AgentStatusCardProps {
  name: string;
  description: string;
  status: AgentStatus;
  lastAction: string;
  resourceUsage: number;
  actionCount: number;
}

export function AgentStatusCard({
  name,
  description,
  status,
  lastAction,
  resourceUsage,
  actionCount,
}: AgentStatusCardProps) {
  const statusConfig = {
    active: {
      color: "bg-green-500",
      label: "Active",
      icon: CircleCheck,
    },
    idle: {
      color: "bg-amber-500",
      label: "Idle",
      icon: Timer,
    },
    error: {
      color: "bg-red-500",
      label: "Error",
      icon: AlertTriangle,
    },
  };

  const { color, label, icon: Icon } = statusConfig[status];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{name}</CardTitle>
          <Badge
            variant="outline"
            className={cn(
              "flex items-center gap-1 px-2 py-0.5",
              status === "error" ? "border-red-500 text-red-500" : null,
              status === "active" ? "border-green-500 text-green-500" : null,
              status === "idle" ? "border-amber-500 text-amber-500" : null
            )}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
            {label}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Resource usage</span>
            <span className="font-medium">{resourceUsage}%</span>
          </div>
          <Progress value={resourceUsage} className="h-1" />
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {lastAction}
          </div>
          <div>{actionCount} actions today</div>
        </div>
      </CardFooter>
    </Card>
  );
}
