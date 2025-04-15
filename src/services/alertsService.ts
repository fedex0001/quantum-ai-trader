
import { toast } from "@/components/ui/sonner";

// Definizione dell'interfaccia per i dati degli alert
export interface Alert {
  id: number;
  name: string;
  condition: string;
  status: "Active" | "Inactive";
  priority: "Critical" | "High" | "Medium" | "Low";
  lastTriggered: string;
  createdAt: string;
  updatedAt: string;
  notificationChannels: string[];
  userId: string;
}

// Parametri per la paginazione e filtri degli alert
export interface AlertQueryParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
  statusFilter?: "all" | "Active" | "Inactive";
  priorityFilter?: "all" | "Critical" | "High" | "Medium" | "Low";
  sortBy?: keyof Alert;
  sortDirection?: 'ascending' | 'descending';
}

// Database simulato con dati di alert
const mockAlertDatabase: Alert[] = [
  { 
    id: 1, 
    name: "BTC Price Alert", 
    condition: "Price above $50,000", 
    status: "Active", 
    priority: "High", 
    lastTriggered: "Never", 
    createdAt: "2025-04-01T10:00:00Z", 
    updatedAt: "2025-04-01T10:00:00Z",
    notificationChannels: ["Email", "SMS"],
    userId: "user123"
  },
  { 
    id: 2, 
    name: "ETH Volume Spike", 
    condition: "24h volume > 150% average", 
    status: "Active", 
    priority: "Medium", 
    lastTriggered: "2025-04-12 14:30", 
    createdAt: "2025-04-02T15:20:00Z", 
    updatedAt: "2025-04-10T08:45:00Z",
    notificationChannels: ["Email"],
    userId: "user123"
  },
  { 
    id: 3, 
    name: "Portfolio Drawdown", 
    condition: "Daily drawdown > 5%", 
    status: "Active", 
    priority: "Critical", 
    lastTriggered: "Never", 
    createdAt: "2025-04-03T09:30:00Z", 
    updatedAt: "2025-04-03T09:30:00Z",
    notificationChannels: ["Email", "SMS", "Push"],
    userId: "user123"
  },
  { 
    id: 4, 
    name: "AAPL Earnings Report", 
    condition: "News mention 'AAPL earnings'", 
    status: "Inactive", 
    priority: "Medium", 
    lastTriggered: "2025-03-25 09:15", 
    createdAt: "2025-03-20T11:15:00Z", 
    updatedAt: "2025-03-26T14:20:00Z",
    notificationChannels: ["Email"],
    userId: "user123"
  },
  { 
    id: 5, 
    name: "Market Volatility", 
    condition: "VIX > 30", 
    status: "Active", 
    priority: "High", 
    lastTriggered: "Never", 
    createdAt: "2025-04-05T16:45:00Z", 
    updatedAt: "2025-04-05T16:45:00Z",
    notificationChannels: ["SMS", "Push"],
    userId: "user123"
  },
];

// Funzione per recuperare gli alert con paginazione e filtri
export const fetchAlerts = async (params: AlertQueryParams): Promise<{ alerts: Alert[], totalCount: number }> => {
  console.log("Fetching alerts with params:", params);
  
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredAlerts = [...mockAlertDatabase];
  
  // Applicazione del filtro stato
  if (params.statusFilter && params.statusFilter !== "all") {
    filteredAlerts = filteredAlerts.filter(alert => alert.status === params.statusFilter);
  }

  // Applicazione del filtro priorità
  if (params.priorityFilter && params.priorityFilter !== "all") {
    filteredAlerts = filteredAlerts.filter(alert => alert.priority === params.priorityFilter);
  }
  
  // Applicazione filtro ricerca
  if (params.searchTerm) {
    const term = params.searchTerm.toLowerCase();
    filteredAlerts = filteredAlerts.filter(alert => 
      alert.name.toLowerCase().includes(term) ||
      alert.condition.toLowerCase().includes(term)
    );
  }
  
  // Conteggio totale per la paginazione
  const totalCount = filteredAlerts.length;
  
  // Ordinamento
  if (params.sortBy) {
    filteredAlerts.sort((a, b) => {
      let aValue = a[params.sortBy!];
      let bValue = b[params.sortBy!];
      
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
  }
  
  // Paginazione
  const start = (params.page - 1) * params.pageSize;
  const end = start + params.pageSize;
  const paginatedAlerts = filteredAlerts.slice(start, end);
  
  return {
    alerts: paginatedAlerts,
    totalCount: totalCount
  };
};

// Funzione per creare un nuovo alert
export const createAlert = async (alert: Omit<Alert, 'id' | 'createdAt' | 'updatedAt'>): Promise<Alert> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newAlert: Alert = {
    ...alert,
    id: Math.max(...mockAlertDatabase.map(a => a.id)) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockAlertDatabase.push(newAlert);
  
  toast.success("Alert creato con successo", {
    description: `${newAlert.name} è stato aggiunto al sistema`,
  });
  
  return newAlert;
};

// Funzione per aggiornare un alert esistente
export const updateAlert = async (id: number, alertData: Partial<Alert>): Promise<Alert> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const index = mockAlertDatabase.findIndex(alert => alert.id === id);
  
  if (index === -1) {
    toast.error("Errore di aggiornamento", {
      description: "Alert non trovato nel sistema",
    });
    throw new Error("Alert not found");
  }
  
  const updatedAlert: Alert = {
    ...mockAlertDatabase[index],
    ...alertData,
    updatedAt: new Date().toISOString()
  };
  
  mockAlertDatabase[index] = updatedAlert;
  
  toast.success("Alert aggiornato", {
    description: `${updatedAlert.name} è stato aggiornato con successo`,
  });
  
  return updatedAlert;
};

// Funzione per eliminare un alert
export const deleteAlert = async (id: number): Promise<boolean> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockAlertDatabase.findIndex(alert => alert.id === id);
  
  if (index !== -1) {
    const deletedAlert = mockAlertDatabase[index];
    mockAlertDatabase.splice(index, 1);
    
    toast.success("Alert eliminato", {
      description: `${deletedAlert.name} è stato rimosso dal sistema`,
    });
    
    return true;
  }
  
  toast.error("Errore di eliminazione", {
    description: "Alert non trovato nel sistema",
  });
  
  return false;
};

// Funzione di test per attivare un alert (simulazione)
export const triggerAlert = async (id: number): Promise<boolean> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const index = mockAlertDatabase.findIndex(alert => alert.id === id);
  
  if (index !== -1) {
    mockAlertDatabase[index] = {
      ...mockAlertDatabase[index],
      lastTriggered: new Date().toLocaleString(),
      updatedAt: new Date().toISOString()
    };
    
    toast.success("Alert attivato", {
      description: `${mockAlertDatabase[index].name} è stato testato con successo`,
    });
    
    return true;
  }
  
  return false;
};
