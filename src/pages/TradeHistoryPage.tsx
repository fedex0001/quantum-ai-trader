
import { useState } from "react";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink
} from "@/components/ui/pagination";
import { 
  History, 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  ArrowUpDown, 
  Trash2, 
  RefreshCw,
  FileDown
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { 
  fetchTrades, 
  deleteTrade, 
  exportToCsv, 
  Trade, 
  TradeQueryParams 
} from "@/services/tradeHistoryService";
import { usePagination } from "@/hooks/usePagination";

export default function TradeHistoryPage() {
  // Stati per filtri e ordinamento
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{key: keyof Trade; direction: 'ascending' | 'descending'}>({
    key: "timestamp",
    direction: "descending",
  });
  const [filterType, setFilterType] = useState<"all" | "Buy" | "Sell">("all");
  
  // Query iniziale per ottenere il conteggio totale
  const countQuery = useQuery({
    queryKey: ['tradeHistoryCount', searchTerm, filterType],
    queryFn: async () => {
      const result = await fetchTrades({
        page: 1,
        pageSize: 1,
        searchTerm,
        tradeType: filterType,
        sortBy: sortConfig.key,
        sortDirection: sortConfig.direction
      });
      return result.totalCount;
    },
    staleTime: 1000 * 60 * 5, // 5 minuti
  });

  // Hook di paginazione
  const pagination = usePagination({
    initialPage: 1,
    initialPageSize: 10,
    totalItems: countQuery.data || 0
  });

  // Query per i dati paginati
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      'tradeHistory', 
      pagination.currentPage, 
      pagination.pageSize, 
      searchTerm, 
      filterType, 
      sortConfig.key, 
      sortConfig.direction
    ],
    queryFn: async () => {
      return fetchTrades({
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        searchTerm,
        tradeType: filterType,
        sortBy: sortConfig.key,
        sortDirection: sortConfig.direction
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minuti
  });

  // Funzione per gestire l'ordinamento
  const handleSort = (key: keyof Trade) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Funzione per gestire l'eliminazione
  const handleDelete = async (id: number) => {
    try {
      await deleteTrade(id);
      toast("Transazione eliminata", {
        description: `La transazione #${id} è stata rimossa dalla cronologia.`,
      });
      // Aggiorna i dati dopo l'eliminazione
      refetch();
      countQuery.refetch();
    } catch (error) {
      toast.error("Errore durante l'eliminazione", {
        description: "Si è verificato un errore. Riprova.",
      });
    }
  };

  // Funzione per gestire l'esportazione
  const handleExport = async () => {
    toast("Esportazione avviata", {
      description: "Il file CSV verrà scaricato a breve.",
    });
    
    try {
      await exportToCsv();
      // In un'applicazione reale, qui scarichiamo il file
    } catch (error) {
      toast.error("Errore durante l'esportazione", {
        description: "Si è verificato un errore durante l'esportazione.",
      });
    }
  };

  // Generazione numeri di pagina per la paginazione
  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5; // Numero massimo di pagine da mostrare
    
    // Calcola il range di pagine da mostrare
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);
    
    // Aggiustamento se siamo vicini alla fine
    if (endPage - startPage + 1 < maxVisiblePages && startPage > 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={pagination.currentPage === i} 
            onClick={() => pagination.goToPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

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
              <FileDown className="mr-1 h-4 w-4" />
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
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Operazioni</span>
              <Badge variant="outline">{countQuery.data || 0} totali</Badge>
            </CardTitle>
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
              <>
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
                    {data?.trades?.map((trade) => (
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
                          <Badge variant="outline" className={
                            trade.status === "Pending" ? "border-yellow-500 text-yellow-500" :
                            trade.status === "Processing" ? "border-blue-500 text-blue-500" :
                            "border-green-500 text-green-600"
                          }>
                            {trade.status === "Completed" ? "Completata" : 
                            trade.status === "Pending" ? "In attesa" : "In elaborazione"}
                          </Badge>
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
                    
                    {(!data?.trades || data.trades.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          Nessuna operazione trovata
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => pagination.goToPreviousPage()}
                          className={pagination.currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {getPaginationItems()}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => pagination.goToNextPage()}
                          className={pagination.currentPage === pagination.totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
