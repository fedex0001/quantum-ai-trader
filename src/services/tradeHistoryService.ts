
import { toast } from "@/components/ui/sonner";

// Definizione dell'interfaccia per i dati delle transazioni
export interface Trade {
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

// Database simulato con più dati
const mockTradeDatabase: Trade[] = [
  { id: 1, symbol: "BTC/USD", type: "Buy", amount: "0.15", price: "$48,235", pnl: "+$320", status: "Completed", date: "2025-04-13 14:32", timestamp: 1744306320 },
  { id: 2, symbol: "ETH/USD", type: "Sell", amount: "2.5", price: "$3,140", pnl: "-$45", status: "Completed", date: "2025-04-13 12:15", timestamp: 1744297500 },
  { id: 3, symbol: "AAPL", type: "Buy", amount: "10", price: "$178.25", pnl: "+$105", status: "Completed", date: "2025-04-12 15:45", timestamp: 1744224300 },
  { id: 4, symbol: "EUR/USD", type: "Sell", amount: "5000", price: "1.0762", pnl: "+$120", status: "Completed", date: "2025-04-11 09:30", timestamp: 1744112400 },
  { id: 5, symbol: "XRP/USD", type: "Buy", amount: "1000", price: "$0.54", pnl: "-$23", status: "Completed", date: "2025-04-10 11:22", timestamp: 1744033320 },
  { id: 6, symbol: "BNB/USD", type: "Buy", amount: "1.8", price: "$562.30", pnl: "+$78", status: "Completed", date: "2025-04-09 16:45", timestamp: 1743967500 },
  { id: 7, symbol: "TSLA", type: "Sell", amount: "5", price: "$154.75", pnl: "-$67", status: "Completed", date: "2025-04-08 10:15", timestamp: 1743873300 },
  { id: 8, symbol: "SOL/USD", type: "Buy", amount: "15", price: "$157.40", pnl: "+$230", status: "Completed", date: "2025-04-07 13:40", timestamp: 1743798000 },
  { id: 9, symbol: "DOGE/USD", type: "Buy", amount: "5000", price: "$0.12", pnl: "+$45", status: "Completed", date: "2025-04-06 09:20", timestamp: 1743704400 },
  { id: 10, symbol: "NVDA", type: "Sell", amount: "2", price: "$925.15", pnl: "+$135", status: "Completed", date: "2025-04-05 14:10", timestamp: 1743636600 },
  { id: 11, symbol: "ADA/USD", type: "Buy", amount: "500", price: "$0.45", pnl: "-$12", status: "Completed", date: "2025-04-04 10:35", timestamp: 1743537300 },
  { id: 12, symbol: "AMZN", type: "Buy", amount: "3", price: "$186.75", pnl: "+$28", status: "Completed", date: "2025-04-03 15:50", timestamp: 1743469800 },
  { id: 13, symbol: "DOT/USD", type: "Sell", amount: "50", price: "$6.85", pnl: "-$34", status: "Completed", date: "2025-04-02 11:05", timestamp: 1743365100 },
  { id: 14, symbol: "GOOG", type: "Buy", amount: "5", price: "$176.30", pnl: "+$67", status: "Completed", date: "2025-04-01 09:45", timestamp: 1743273900 },
  { id: 15, symbol: "LINK/USD", type: "Buy", amount: "25", price: "$14.25", pnl: "+$18", status: "Completed", date: "2025-03-31 16:20", timestamp: 1743210000 },
  { id: 16, symbol: "BTC/USD", type: "Sell", amount: "0.08", price: "$47,950", pnl: "-$65", status: "Pending", date: "2025-04-14 08:15", timestamp: 1744365300 },
  { id: 17, symbol: "ETH/USD", type: "Buy", amount: "1.5", price: "$3,155", pnl: "$0", status: "Processing", date: "2025-04-14 09:30", timestamp: 1744370100 },
];

// Parametri per la paginazione e filtri
export interface TradeQueryParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
  tradeType?: "all" | "Buy" | "Sell";
  sortBy: keyof Trade;
  sortDirection: 'ascending' | 'descending';
}

// Funzione per recuperare le operazioni con paginazione e filtri
export const fetchTrades = async (params: TradeQueryParams): Promise<{ trades: Trade[], totalCount: number }> => {
  console.log("Fetching trades with params:", params);
  
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredTrades = [...mockTradeDatabase];
  
  // Applicazione del filtro tipo
  if (params.tradeType && params.tradeType !== "all") {
    filteredTrades = filteredTrades.filter(trade => trade.type === params.tradeType);
  }
  
  // Applicazione filtro ricerca
  if (params.searchTerm) {
    const term = params.searchTerm.toLowerCase();
    filteredTrades = filteredTrades.filter(trade => 
      trade.symbol.toLowerCase().includes(term) ||
      trade.status.toLowerCase().includes(term)
    );
  }
  
  // Conteggio totale per la paginazione
  const totalCount = filteredTrades.length;
  
  // Ordinamento
  filteredTrades.sort((a, b) => {
    let aValue = a[params.sortBy];
    let bValue = b[params.sortBy];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return params.sortDirection === 'ascending' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    // Gestione numeri e timestamp
    return params.sortDirection === 'ascending' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });
  
  // Paginazione
  const start = (params.page - 1) * params.pageSize;
  const end = start + params.pageSize;
  const paginatedTrades = filteredTrades.slice(start, end);
  
  return {
    trades: paginatedTrades,
    totalCount: totalCount
  };
};

// Funzione per eliminare un'operazione
export const deleteTrade = async (id: number): Promise<boolean> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Normalmente qui ci sarebbe una chiamata API
  const index = mockTradeDatabase.findIndex(trade => trade.id === id);
  if (index !== -1) {
    mockTradeDatabase.splice(index, 1);
    return true;
  }
  return false;
};

// Funzione per esportare i dati in formato CSV
export const exportToCsv = async (): Promise<string> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // In un'applicazione reale, qui ci sarebbe la logica per creare un vero file CSV
    const headers = ["ID", "Symbol", "Type", "Amount", "Price", "PnL", "Status", "Date"];
    let csvContent = headers.join(",") + "\n";
    
    mockTradeDatabase.forEach(trade => {
      const row = [
        trade.id,
        trade.symbol,
        trade.type,
        trade.amount,
        trade.price,
        trade.pnl,
        trade.status,
        trade.date
      ].join(",");
      csvContent += row + "\n";
    });
    
    // In un'applicazione reale, qui creeremmo e scaricheremmo il file
    toast.success("Esportazione completata", {
      description: "File CSV pronto per il download",
    });
    
    return csvContent;
  } catch (error) {
    toast.error("Errore durante l'esportazione", {
      description: "Si è verificato un errore. Riprova più tardi.",
    });
    throw error;
  }
};
