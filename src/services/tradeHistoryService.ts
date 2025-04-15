
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
  userId: string;
  executionTime: number; // tempo di esecuzione in ms
  fees: string;
  exchange: string;
  orderId: string;
}

// Parametri per la paginazione e filtri
export interface TradeQueryParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
  tradeType?: "all" | "Buy" | "Sell";
  status?: "all" | "Completed" | "Pending" | "Processing" | "Failed";
  dateFrom?: string;
  dateTo?: string;
  sortBy: keyof Trade;
  sortDirection: 'ascending' | 'descending';
}

// Database simulato con più dati
const mockTradeDatabase: Trade[] = [
  { id: 1, symbol: "BTC/USD", type: "Buy", amount: "0.15", price: "$48,235", pnl: "+$320", status: "Completed", date: "2025-04-13 14:32", timestamp: 1744306320, userId: "user123", executionTime: 241, fees: "$3.50", exchange: "Binance", orderId: "BNB1234567" },
  { id: 2, symbol: "ETH/USD", type: "Sell", amount: "2.5", price: "$3,140", pnl: "-$45", status: "Completed", date: "2025-04-13 12:15", timestamp: 1744297500, userId: "user123", executionTime: 189, fees: "$2.80", exchange: "Coinbase", orderId: "CB7891234" },
  { id: 3, symbol: "AAPL", type: "Buy", amount: "10", price: "$178.25", pnl: "+$105", status: "Completed", date: "2025-04-12 15:45", timestamp: 1744224300, userId: "user123", executionTime: 312, fees: "$1.20", exchange: "Interactive Brokers", orderId: "IB4567890" },
  { id: 4, symbol: "EUR/USD", type: "Sell", amount: "5000", price: "1.0762", pnl: "+$120", status: "Completed", date: "2025-04-11 09:30", timestamp: 1744112400, userId: "user123", executionTime: 156, fees: "$1.75", exchange: "FXCM", orderId: "FX0987654" },
  { id: 5, symbol: "XRP/USD", type: "Buy", amount: "1000", price: "$0.54", pnl: "-$23", status: "Completed", date: "2025-04-10 11:22", timestamp: 1744033320, userId: "user123", executionTime: 278, fees: "$1.30", exchange: "Kraken", orderId: "KR3456789" },
  { id: 6, symbol: "BNB/USD", type: "Buy", amount: "1.8", price: "$562.30", pnl: "+$78", status: "Completed", date: "2025-04-09 16:45", timestamp: 1743967500, userId: "user123", executionTime: 203, fees: "$2.25", exchange: "Binance", orderId: "BNB2345678" },
  { id: 7, symbol: "TSLA", type: "Sell", amount: "5", price: "$154.75", pnl: "-$67", status: "Completed", date: "2025-04-08 10:15", timestamp: 1743873300, userId: "user123", executionTime: 187, fees: "$1.45", exchange: "Interactive Brokers", orderId: "IB5678901" },
  { id: 8, symbol: "SOL/USD", type: "Buy", amount: "15", price: "$157.40", pnl: "+$230", status: "Completed", date: "2025-04-07 13:40", timestamp: 1743798000, userId: "user123", executionTime: 296, fees: "$2.10", exchange: "Kraken", orderId: "KR4567890" },
  { id: 9, symbol: "DOGE/USD", type: "Buy", amount: "5000", price: "$0.12", pnl: "+$45", status: "Completed", date: "2025-04-06 09:20", timestamp: 1743704400, userId: "user123", executionTime: 132, fees: "$0.85", exchange: "Coinbase", orderId: "CB8901234" },
  { id: 10, symbol: "NVDA", type: "Sell", amount: "2", price: "$925.15", pnl: "+$135", status: "Completed", date: "2025-04-05 14:10", timestamp: 1743636600, userId: "user123", executionTime: 275, fees: "$3.20", exchange: "Interactive Brokers", orderId: "IB6789012" },
  { id: 11, symbol: "ADA/USD", type: "Buy", amount: "500", price: "$0.45", pnl: "-$12", status: "Completed", date: "2025-04-04 10:35", timestamp: 1743537300, userId: "user123", executionTime: 198, fees: "$0.95", exchange: "Kraken", orderId: "KR5678901" },
  { id: 12, symbol: "AMZN", type: "Buy", amount: "3", price: "$186.75", pnl: "+$28", status: "Completed", date: "2025-04-03 15:50", timestamp: 1743469800, userId: "user123", executionTime: 223, fees: "$1.65", exchange: "Interactive Brokers", orderId: "IB7890123" },
  { id: 13, symbol: "DOT/USD", type: "Sell", amount: "50", price: "$6.85", pnl: "-$34", status: "Completed", date: "2025-04-02 11:05", timestamp: 1743365100, userId: "user123", executionTime: 167, fees: "$1.15", exchange: "Binance", orderId: "BNB3456789" },
  { id: 14, symbol: "GOOG", type: "Buy", amount: "5", price: "$176.30", pnl: "+$67", status: "Completed", date: "2025-04-01 09:45", timestamp: 1743273900, userId: "user123", executionTime: 254, fees: "$1.90", exchange: "Interactive Brokers", orderId: "IB8901234" },
  { id: 15, symbol: "LINK/USD", type: "Buy", amount: "25", price: "$14.25", pnl: "+$18", status: "Completed", date: "2025-03-31 16:20", timestamp: 1743210000, userId: "user123", executionTime: 210, fees: "$1.25", exchange: "Coinbase", orderId: "CB9012345" },
  { id: 16, symbol: "BTC/USD", type: "Sell", amount: "0.08", price: "$47,950", pnl: "-$65", status: "Pending", date: "2025-04-14 08:15", timestamp: 1744365300, userId: "user123", executionTime: 0, fees: "$0.00", exchange: "Binance", orderId: "BNB4567890" },
  { id: 17, symbol: "ETH/USD", type: "Buy", amount: "1.5", price: "$3,155", pnl: "$0", status: "Processing", date: "2025-04-14 09:30", timestamp: 1744370100, userId: "user123", executionTime: 0, fees: "$0.00", exchange: "Kraken", orderId: "KR6789012" },
];

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
  
  // Applicazione del filtro stato
  if (params.status && params.status !== "all") {
    filteredTrades = filteredTrades.filter(trade => trade.status === params.status);
  }
  
  // Applicazione filtro ricerca
  if (params.searchTerm) {
    const term = params.searchTerm.toLowerCase();
    filteredTrades = filteredTrades.filter(trade => 
      trade.symbol.toLowerCase().includes(term) ||
      trade.status.toLowerCase().includes(term) ||
      trade.exchange.toLowerCase().includes(term) ||
      trade.orderId.toLowerCase().includes(term)
    );
  }
  
  // Applicazione filtri data
  if (params.dateFrom) {
    const fromTimestamp = new Date(params.dateFrom).getTime() / 1000;
    filteredTrades = filteredTrades.filter(trade => trade.timestamp >= fromTimestamp);
  }
  
  if (params.dateTo) {
    const toTimestamp = new Date(params.dateTo).getTime() / 1000 + 86400; // +1 giorno per includere l'intero giorno
    filteredTrades = filteredTrades.filter(trade => trade.timestamp <= toTimestamp);
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
    
    toast.success("Operazione eliminata", {
      description: `Operazione ID ${id} è stata rimossa dalla cronologia`,
    });
    
    return true;
  }
  
  toast.error("Errore di eliminazione", {
    description: "Operazione non trovata nella cronologia",
  });
  
  return false;
};

// Funzione per esportare i dati in formato CSV
export const exportToCsv = async (): Promise<string> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // In un'applicazione reale, qui ci sarebbe la logica per creare un vero file CSV
    const headers = ["ID", "Symbol", "Type", "Amount", "Price", "PnL", "Status", "Date", "Exchange", "Order ID", "Fees"];
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
        trade.date,
        trade.exchange,
        trade.orderId,
        trade.fees
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

// Funzione per creare una nuova operazione
export const createTrade = async (trade: Omit<Trade, 'id' | 'date' | 'timestamp'>): Promise<Trade> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const now = new Date();
  
  const newTrade: Trade = {
    ...trade,
    id: Math.max(...mockTradeDatabase.map(t => t.id)) + 1,
    date: now.toLocaleString(),
    timestamp: Math.floor(now.getTime() / 1000),
  };
  
  mockTradeDatabase.unshift(newTrade);
  
  toast.success("Operazione registrata", {
    description: `${newTrade.type} ${newTrade.amount} ${newTrade.symbol} registrata con successo`,
  });
  
  return newTrade;
};

// Funzione per ottenere statistiche sulle operazioni
export const fetchTradeStatistics = async (userId: string): Promise<{
  totalTrades: number;
  buyTrades: number;
  sellTrades: number;
  completedTrades: number;
  pendingTrades: number;
  totalPnL: string;
  avgExecutionTime: number;
}> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 900));
  
  const userTrades = mockTradeDatabase.filter(trade => trade.userId === userId);
  
  const buyTrades = userTrades.filter(trade => trade.type === "Buy").length;
  const sellTrades = userTrades.filter(trade => trade.type === "Sell").length;
  const completedTrades = userTrades.filter(trade => trade.status === "Completed").length;
  const pendingTrades = userTrades.filter(trade => trade.status === "Pending" || trade.status === "Processing").length;
  
  // Calcolo del PnL totale
  let totalPnL = 0;
  userTrades.forEach(trade => {
    const pnlValue = parseFloat(trade.pnl.replace(/[^-0-9.]/g, ''));
    if (!isNaN(pnlValue)) {
      totalPnL += pnlValue;
    }
  });
  
  // Calcolo del tempo medio di esecuzione (solo per operazioni completate)
  const completedTradesData = userTrades.filter(trade => trade.status === "Completed");
  const totalExecutionTime = completedTradesData.reduce((sum, trade) => sum + trade.executionTime, 0);
  const avgExecutionTime = completedTradesData.length > 0 ? Math.round(totalExecutionTime / completedTradesData.length) : 0;
  
  return {
    totalTrades: userTrades.length,
    buyTrades,
    sellTrades,
    completedTrades,
    pendingTrades,
    totalPnL: totalPnL >= 0 ? `+$${totalPnL.toFixed(2)}` : `-$${Math.abs(totalPnL).toFixed(2)}`,
    avgExecutionTime,
  };
};
