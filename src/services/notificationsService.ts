
import { toast } from "@/components/ui/sonner";

// Definizione dell'interfaccia per i dati delle notifiche
export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  timestamp: number;
  type: "trade" | "risk" | "system" | "market" | "agent";
  read: boolean;
  userId: string;
  importance: "high" | "medium" | "low";
  actionUrl?: string;
  actionLabel?: string;
}

// Parametri per la paginazione e filtri
export interface NotificationQueryParams {
  page: number;
  pageSize: number;
  userId: string;
  filterByType?: string[];
  readStatus?: "all" | "read" | "unread";
  sortDirection?: 'ascending' | 'descending';
}

// Database simulato con notifiche
const mockNotificationsDatabase: Notification[] = [
  {
    id: 1,
    title: "Trade Executed",
    message: "Buy order for BTC/USD executed at $48,235",
    time: "14:32",
    timestamp: 1744306320,
    type: "trade",
    read: false,
    userId: "user123",
    importance: "medium"
  },
  {
    id: 2,
    title: "Risk Alert",
    message: "Portfolio drawdown approaching threshold (8.5%/10%)",
    time: "12:15",
    timestamp: 1744297500,
    type: "risk",
    read: false,
    userId: "user123",
    importance: "high",
    actionUrl: "/risk",
    actionLabel: "View Risk Dashboard"
  },
  {
    id: 3,
    title: "API Connection",
    message: "Successfully reconnected to Binance API",
    time: "Yesterday",
    timestamp: 1744224300,
    type: "system",
    read: true,
    userId: "user123",
    importance: "low"
  },
  {
    id: 4,
    title: "Market Alert",
    message: "Unusual volume detected in ETH/USD",
    time: "Yesterday",
    timestamp: 1744112400,
    type: "market",
    read: true,
    userId: "user123",
    importance: "medium",
    actionUrl: "/market",
    actionLabel: "View Chart"
  },
  {
    id: 5,
    title: "AI Agent",
    message: "Strategic Agent identified potential trade opportunity in AAPL",
    time: "2 days ago",
    timestamp: 1743967500,
    type: "agent",
    read: true,
    userId: "user123",
    importance: "medium",
    actionUrl: "/agents",
    actionLabel: "View Agent"
  }
];

// Funzione per recuperare le notifiche con paginazione e filtri
export const fetchNotifications = async (params: NotificationQueryParams): Promise<{ notifications: Notification[], totalCount: number, unreadCount: number }> => {
  console.log("Fetching notifications with params:", params);
  
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 600));
  
  let filteredNotifications = [...mockNotificationsDatabase].filter(
    notification => notification.userId === params.userId
  );
  
  // Applicazione del filtro per tipo di notifica
  if (params.filterByType && params.filterByType.length > 0) {
    filteredNotifications = filteredNotifications.filter(
      notification => params.filterByType!.includes(notification.type)
    );
  }
  
  // Applicazione del filtro per stato di lettura
  if (params.readStatus && params.readStatus !== "all") {
    const isRead = params.readStatus === "read";
    filteredNotifications = filteredNotifications.filter(
      notification => notification.read === isRead
    );
  }
  
  // Ordinamento per timestamp
  filteredNotifications.sort((a, b) => {
    return params.sortDirection === 'ascending'
      ? a.timestamp - b.timestamp
      : b.timestamp - a.timestamp;
  });
  
  // Conteggio totale per la paginazione
  const totalCount = filteredNotifications.length;
  
  // Conteggio notifiche non lette
  const unreadCount = mockNotificationsDatabase.filter(
    notification => notification.userId === params.userId && !notification.read
  ).length;
  
  // Paginazione
  const start = (params.page - 1) * params.pageSize;
  const end = start + params.pageSize;
  const paginatedNotifications = filteredNotifications.slice(start, end);
  
  return {
    notifications: paginatedNotifications,
    totalCount,
    unreadCount
  };
};

// Funzione per contrassegnare una notifica come letta
export const markNotificationAsRead = async (id: number): Promise<boolean> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const index = mockNotificationsDatabase.findIndex(notification => notification.id === id);
  if (index !== -1 && !mockNotificationsDatabase[index].read) {
    mockNotificationsDatabase[index].read = true;
    return true;
  }
  return false;
};

// Funzione per contrassegnare tutte le notifiche come lette
export const markAllNotificationsAsRead = async (userId: string): Promise<number> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let count = 0;
  mockNotificationsDatabase.forEach(notification => {
    if (notification.userId === userId && !notification.read) {
      notification.read = true;
      count++;
    }
  });
  
  if (count > 0) {
    toast.success(`${count} notifiche contrassegnate come lette`);
  }
  
  return count;
};

// Funzione per inviare una nuova notifica
export const sendNotification = async (notification: Omit<Notification, 'id' | 'timestamp' | 'time' | 'read'>): Promise<Notification> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const now = new Date();
  const timeStr = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  
  const newNotification: Notification = {
    ...notification,
    id: Math.max(...mockNotificationsDatabase.map(n => n.id)) + 1,
    timestamp: Math.floor(now.getTime() / 1000),
    time: timeStr,
    read: false
  };
  
  mockNotificationsDatabase.unshift(newNotification);
  
  // In un'applicazione reale, qui si invierebbe anche una notifica push al client
  console.log("Notification sent:", newNotification);
  
  return newNotification;
};

// Funzione per eliminare una notifica
export const deleteNotification = async (id: number): Promise<boolean> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const index = mockNotificationsDatabase.findIndex(notification => notification.id === id);
  if (index !== -1) {
    mockNotificationsDatabase.splice(index, 1);
    return true;
  }
  return false;
};

// Funzione per ottenere i settaggi delle notifiche dell'utente
export interface NotificationSettings {
  id: number;
  name: string;
  enabled: boolean;
  channels: string[];
}

export const fetchNotificationSettings = async (userId: string): Promise<NotificationSettings[]> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Dati simulati dei settaggi
  return [
    { id: 1, name: "Trade Notifications", enabled: true, channels: ["Web", "Telegram"] },
    { id: 2, name: "Risk Alerts", enabled: true, channels: ["Web", "Telegram", "Email"] },
    { id: 3, name: "System Notifications", enabled: true, channels: ["Web"] },
    { id: 4, name: "Market Alerts", enabled: false, channels: ["Web", "Telegram"] },
    { id: 5, name: "AI Agent Updates", enabled: true, channels: ["Web"] }
  ];
};

// Funzione per aggiornare i settaggi delle notifiche
export const updateNotificationSetting = async (id: number, enabled: boolean): Promise<NotificationSettings> => {
  // Simulazione di una richiesta di rete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simula l'aggiornamento dei settaggi
  // In un'applicazione reale, qui ci sarebbe una chiamata API per aggiornare le impostazioni
  
  toast.success("Impostazioni aggiornate", {
    description: `Le preferenze di notifica sono state aggiornate`
  });
  
  // Ritorna un setting fittizio aggiornato
  return {
    id,
    name: id === 1 ? "Trade Notifications" : 
          id === 2 ? "Risk Alerts" : 
          id === 3 ? "System Notifications" : 
          id === 4 ? "Market Alerts" : 
          "AI Agent Updates",
    enabled,
    channels: ["Web", "Telegram"]
  };
};
