
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  History, 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  ArrowUpDown, 
  Trash2 
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Definizione dell'interfaccia per i dati delle transazioni
interface Trade {
  id: number;
  symbol: string;
  type: "Buy" | "Sell";
  amount: string;
  price: string;
  pnl: string;
  status: string;
  date: string;
  timestamp: number;
}

// Funzione per recuperare la cronologia delle transazioni
const fetchTradeHistory = async (): Promise<Trade[]> => {
  // Simula un ritardo di rete
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In un'applicazione reale, questo sarebbe un fetch a un'API
  return [
    { id: 1, symbol: "BTC/USD", type: "Buy", amount: "0.15", price: "$48,235", pnl: "+$320", status: "Completed", date: "2025-04-13 14:32", timestamp: 1744306320 },
    { id: 2, symbol: "ETH/USD", type: "Sell", amount: "2.5", price: "$3,140", pnl: "-$45", status: "Completed", date: "2025-04-13 12:15", timestamp: 1744297500 },
    { id: 3, symbol: "AAPL", type: "Buy", amount: "10", price: "$178.25", pnl: "+$105", status: "Completed", date: "2025-04-12 15:45", timestamp: 1744224300 },
    { id: 4, symbol: "EUR/USD", type: "Sell", amount: "5000", price: "1.0762", pnl: "+$120", status: "Completed", date: "2025-04-11 09:30", timestamp: 1744112400 },
    { id: 5, symbol: "XRP/USD", type: "Buy", amount: "1000", price: "$0.54", pnl: "-$23", status: "Completed", date: "2025-04-10 11:22", timestamp: 1744033320 },
    { id: 6, symbol: "BNB/USD", type: "Buy", amount: "1.8", price: "$562.30", pnl: "+$78", status: "Completed", date: "2025-04-09 16:45", timestamp: 1743967500 },
    { id: 7, symbol: "TSLA", type: "Sell", amount: "5", price: "$154.75", pnl: "-$67", status: "Completed", date: "2025-04-08 10:15", timestamp: 1743873300 },
    { id: 8, symbol: "SOL/USD", type: "Buy", amount: "15", price: "$157.40", pnl: "+$230", status: "Completed", date: "2025-04-07 13:40", timestamp: 1743798000 },
  ];
};

export default function TradeHistoryPage() {
  // Stati per filtri e ordinamento
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{key: keyof Trade; direction: 'ascending' | 'descending'}>({
    key: "timestamp",
    direction: "descending",
  });
  const [filterType, setFilterType] = useState<"all" | "Buy" | "Sell">("all");
  
  // Memorizzazione dati
  const { data: trades, isLoading, error, refetch } = useQuery({
    queryKey: ['tradeHistory'],
    queryFn: fetchTradeHistory,
    staleTime: 1000 * 60 * 5, // 5 minuti
  });

  // Funzione per gestire l'esportazione dei dati
  const handleExport = () => {
    toast("Esportazione avviata", {
      description: "Il file CSV verrà scaricato a breve.",
    });
    
    // In un'implementazione reale, qui ci sarebbe la logica per creare e scaricare il CSV
    setTimeout(() => {
      toast("Esportazione completata", {
        description: "I dati sono stati esportati con successo.",
      });
    }, 1500);
  };

  // Funzione per gestire l'eliminazione di una transazione
  const handleDelete = (id: number) => {
    toast("Transazione eliminata", {
      description: `La transazione #${id} è stata rimossa dalla cronologia.`,
    });
    // In un'applicazione reale, qui faremmo una chiamata API per eliminare la transazione
  };

  // Funzione per ordinare i dati
  const handleSort = (key: keyof Trade) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Funzione per filtrare e ordinare i dati
  const getSortedAndFilteredTrades = () => {
    if (!trades) return [];
    
    let filteredTrades = [...trades];
    
    // Applicazione filtro tipo (Buy/Sell)
    if (filterType !== "all") {
      filteredTrades = filteredTrades.filter(trade => trade.type === filterType);
    }
    
    // Applicazione filtro ricerca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredTrades = filteredTrades.filter(trade => 
        trade.symbol.toLowerCase().includes(term) ||
        trade.status.toLowerCase().includes(term)
      );
    }
    
    // Applicazione ordinamento
    filteredTrades.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortConfig.direction === 'ascending') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }
      
      // Gestione numeri e timestamp
      if (sortConfig.direction === 'ascending') {
        return (aValue as number) - (bValue as number);
      } else {
        return (bValue as number) - (aValue as number);
      }
    });
    
    return filteredTrades;
  };
  
  // Per mantenere le prestazioni ottimali con molte transazioni
  const displayedTrades = getSortedAndFilteredTrades();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <History className="h-6 w-6" />
            Cronologia Operazioni
          </h2>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Filter className="mr-1 h-4 w-4" />
                  Filtri
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filtri Operazioni</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="type-filter">Tipo Operazione</Label>
                    <div className="flex gap-2">
                      <Button 
                        variant={filterType === "all" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setFilterType("all")}
                      >
                        Tutte
                      </Button>
                      <Button 
                        variant={filterType === "Buy" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setFilterType("Buy")}
                      >
                        Acquisto
                      </Button>
                      <Button 
                        variant={filterType === "Sell" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setFilterType("Sell")}
                      >
                        Vendita
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button size="sm" variant="outline" onClick={handleExport}>
              <Download className="mr-1 h-4 w-4" />
              Esporta
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca per simbolo o stato..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <Calendar className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Operazioni Recenti</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-3 w-3 bg-muted-foreground rounded-full"></div>
                  <div className="h-3 w-3 bg-muted-foreground rounded-full"></div>
                  <div className="h-3 w-3 bg-muted-foreground rounded-full"></div>
                </div>
              </div>
            ) : error ? (
              <div className="text-center p-4 text-red-500">
                Si è verificato un errore nel caricamento dei dati. Riprova.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("symbol")}>
                      <div className="flex items-center gap-1">
                        Simbolo
                        {sortConfig.key === "symbol" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                      <div className="flex items-center gap-1">
                        Tipo
                        {sortConfig.key === "type" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Quantità</TableHead>
                    <TableHead>Prezzo</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("pnl")}>
                      <div className="flex items-center gap-1">
                        PnL
                        {sortConfig.key === "pnl" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("timestamp")}>
                      <div className="flex items-center gap-1">
                        Data/Ora
                        {sortConfig.key === "timestamp" && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedTrades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="font-medium">{trade.symbol}</TableCell>
                      <TableCell>
                        <Badge variant={trade.type === "Buy" ? "default" : "secondary"}>
                          {trade.type === "Buy" ? "Acquisto" : "Vendita"}
                        </Badge>
                      </TableCell>
                      <TableCell>{trade.amount}</TableCell>
                      <TableCell>{trade.price}</TableCell>
                      <TableCell className={trade.pnl.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {trade.pnl}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{trade.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{trade.date}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(trade.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {displayedTrades.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Nessuna operazione trovata
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
