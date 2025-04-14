
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Eye, EyeOff, Trash, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ApiKeysPage() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  
  const toggleKeyVisibility = (id: number) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Sample API keys
  const apiKeys = [
    { id: 1, name: "Binance API Key", platform: "Binance", key: "ax9bc72d1ef5g7h8i9j0", secret: "••••••••••••••••••", permissions: ["Read", "Trade"], createdAt: "2025-03-15", status: "Active" },
    { id: 2, name: "MT5 Demo Account", platform: "MetaTrader 5", key: "73920541", secret: "••••••••", permissions: ["Read", "Trade"], createdAt: "2025-03-20", status: "Active" },
    { id: 3, name: "Alpha Vantage API", platform: "Alpha Vantage", key: "FG56H7J8K9L0M1N2", secret: null, permissions: ["Read"], createdAt: "2025-02-10", status: "Active" },
    { id: 4, name: "Finnhub API Key", platform: "Finnhub", key: "c9d8e7f6g5h4j3k2", secret: null, permissions: ["Read"], createdAt: "2025-01-05", status: "Inactive" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            API Keys
          </h2>
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            Add New API Key
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>API Keys Management</CardTitle>
            <CardDescription>Manage your connections to exchanges and data providers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Secret</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell className="font-medium">{apiKey.name}</TableCell>
                      <TableCell>{apiKey.platform}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-mono text-sm">
                            {showKeys[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 4) + '••••••••••'}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-2"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {apiKey.secret ? (
                          <span className="font-mono text-sm">••••••••••••••••••</span>
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {apiKey.permissions.map((perm, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={apiKey.status === "Active" ? "default" : "secondary"}>
                          {apiKey.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Add New API Key</CardTitle>
            <CardDescription>Connect a new platform or data provider</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Input id="platform" placeholder="Select Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="My API Key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input id="apiKey" placeholder="Enter your API key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secret">Secret Key (Optional)</Label>
                  <Input id="secret" type="password" placeholder="Enter your secret key" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-xs text-muted-foreground">Your credentials are stored securely</span>
            </div>
            <Button>Add API Key</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
