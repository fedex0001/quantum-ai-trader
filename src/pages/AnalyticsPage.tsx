
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Activity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trading Analytics</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-1 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button size="sm">
              <Activity className="mr-1 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnalyticsCard 
            title="Success Rate" 
            value="72%" 
            description="Win/Loss Ratio: 2.6"
            icon={BarChart}
          />
          <AnalyticsCard 
            title="Profit Factor" 
            value="1.85"
            description="Total Profit: $15,430"
            icon={LineChart}
          />
          <AnalyticsCard 
            title="Average Trade" 
            value="$235.40"
            description="Avg. Duration: 2d 14h"
            icon={PieChart}
          />
        </div>
        
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Advanced Analytics</CardTitle>
            <CardDescription>
              Comprehensive trading performance metrics and analysis will be displayed here.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center bg-muted/20">
            <div className="text-center text-muted-foreground">
              <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium mb-2">Analytics Dashboard Coming Soon</h3>
              <p>Advanced trading performance metrics and analysis tools will be available in the next update.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

interface AnalyticsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
}

function AnalyticsCard({ title, value, description, icon: Icon }: AnalyticsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
