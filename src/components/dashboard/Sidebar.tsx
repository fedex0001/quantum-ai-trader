
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Briefcase,
  Cog,
  CreditCard,
  History,
  Home,
  LineChart,
  MessageCircle,
  Network,
  Shield,
  AlertTriangle,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
  hasAlert?: boolean;
}

function NavItem({ icon: Icon, label, to, collapsed, hasAlert }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive 
          ? "bg-secondary text-secondary-foreground" 
          : "hover:bg-secondary/80 text-muted-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <div className="relative">
        <Icon className="h-5 w-5" />
        {hasAlert && (
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </div>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "flex flex-col border-r bg-card h-[calc(100vh-65px)] p-2",
      collapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="flex-1 py-2">
        <div className="mb-8 px-3 py-2">
          {!collapsed && (
            <h2 className="text-lg font-semibold mb-2">Dashboard</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="w-full h-8 justify-end"
            onClick={toggleCollapse}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="space-y-1 px-1">
          <NavItem icon={Home} label="Overview" to="/" collapsed={collapsed} />
          <NavItem icon={BarChart3} label="Market Data" to="/market" collapsed={collapsed} />
          <NavItem icon={Network} label="AI Agents" to="/agents" collapsed={collapsed} hasAlert />
          <NavItem icon={Briefcase} label="Portfolio" to="/portfolio" collapsed={collapsed} />
          <NavItem icon={LineChart} label="Analytics" to="/analytics" collapsed={collapsed} />
          <NavItem icon={History} label="Trade History" to="/history" collapsed={collapsed} />
          <NavItem icon={Shield} label="Risk Management" to="/risk" collapsed={collapsed} hasAlert />
          <NavItem icon={AlertTriangle} label="Alerts" to="/alerts" collapsed={collapsed} />
          <NavItem icon={MessageCircle} label="Notifications" to="/notifications" collapsed={collapsed} hasAlert />
        </div>
        
        <div className="mt-auto px-1 pt-4 space-y-1 border-t border-border mt-4">
          <NavItem icon={CreditCard} label="API Keys" to="/api-keys" collapsed={collapsed} />
          <NavItem icon={Cog} label="Settings" to="/settings" collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
}
