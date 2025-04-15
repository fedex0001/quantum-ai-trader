import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Plus, Settings, Search, Filter, Trash2, RefreshCw, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { usePagination } from "@/hooks/usePagination";
import { 
  fetchAlerts, 
  deleteAlert, 
  updateAlert, 
  triggerAlert,
  Alert as AlertType, 
  AlertQueryParams
} from "@/services/alertsService";

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Inactive">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "Critical" | "High" | "Medium" | "Low">("all");
  const [sortBy, setSortBy] = useState<keyof AlertType>("id");
  const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("descending");
  const [alertToDelete, setAlertToDelete] = useState<number | null>(null);
  
  const queryClient = useQueryClient();

  const { 
    data, 
    isLoading, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ["alerts", searchTerm, statusFilter, priorityFilter, sortBy, sortDirection],
    queryFn: async () => {
      const queryParams: AlertQueryParams = {
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        searchTerm,
        statusFilter,
        priorityFilter,
        sortBy,
        sortDirection
      };
      return fetchAlerts(queryParams);
    },
    staleTime: 30000, // 30 secondi
  });

  const pagination = usePagination({
    totalItems: data?.totalCount || 0,
    onPageChange: () => {
      refetch();
    },
    onPageSizeChange: () => {
      refetch();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      setAlertToDelete(null);
    },
    onError: () => {
      toast.error("Errore durante l'eliminazione", {
        description: "Si è verificato un errore. Riprova più tardi.",
      });
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: (params: { id: number; isActive: boolean }) => {
      return updateAlert(params.id, { status: params.isActive ? "Active" : "Inactive" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
    onError: () => {
      toast.error("Errore durante l'aggiornamento dello stato", {
        description: "Si è verificato un errore. Riprova più tardi.",
      });
    }
  });

  const triggerAlertMutation = useMutation({
    mutationFn: triggerAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
    onError: () => {
      toast.error("Errore durante il test dell'alert", {
        description: "Si è verificato un errore. Riprova più tardi.",
      });
    }
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as "all" | "Active" | "Inactive");
  };

  const handlePriorityFilterChange = (value: string) => {
    setPriorityFilter(value as "all" | "Critical" | "High" | "Medium" | "Low");
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as keyof AlertType);
  };

  const handleSortDirectionToggle = () => {
    setSortDirection(current => current === "ascending" ? "descending" : "ascending");
  };

  const handleDeleteConfirm = () => {
    if (alertToDelete !== null) {
      deleteMutation.mutate(alertToDelete);
    }
  };

  const handleToggleStatus = (id: number, currentStatus: "Active" | "Inactive") => {
    updateStatusMutation.mutate({
      id,
      isActive: currentStatus === "Inactive"
    });
  };

  const handleTriggerAlert = (id: number) => {
    triggerAlertMutation.mutate(id);
  };

  const getBadgeVariant = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive";
      case "High":
        return "default";
      case "Medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxItems = Math.min(5, pagination.totalPages);
    
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxItems / 2));
    const endPage = Math.min(startPage + maxItems - 1, pagination.totalPages);
    
    if (endPage - startPage + 1 < maxItems) {
      startPage = Math.max(1, endPage - maxItems + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={i === pagination.currentPage} 
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
            <AlertTriangle className="h-6 w-6" />
            Gestione Alert
          </h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-1 h-4 w-4" />
              )}
              Aggiorna
            </Button>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Nuovo Alert
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca alert..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Stato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli stati</SelectItem>
                <SelectItem value="Active">Attivi</SelectItem>
                <SelectItem value="Inactive">Inattivi</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={handlePriorityFilterChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priorità" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte</SelectItem>
                <SelectItem value="Critical">Critiche</SelectItem>
                <SelectItem value="High">Alte</SelectItem>
                <SelectItem value="Medium">Medie</SelectItem>
                <SelectItem value="Low">Basse</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Ordina per" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="priority">Priorità</SelectItem>
                <SelectItem value="status">Stato</SelectItem>
                <SelectItem value="createdAt">Data creazione</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSortDirectionToggle}
              title={sortDirection === "ascending" ? "Crescente" : "Decrescente"}
            >
              <Filter className={`h-4 w-4 ${sortDirection === "ascending" ? "" : "rotate-180"}`} />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Regole di Alert</CardTitle>
            <CardDescription>
              Gestisci e configura le tue regole di alert per il monitoraggio del mercato
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : isError ? (
              <div className="text-center py-8 text-destructive">
                Si è verificato un errore nel caricamento degli alert. 
                <Button variant="link" onClick={() => refetch()}>Riprova</Button>
              </div>
            ) : (data?.alerts.length === 0) ? (
              <div className="text-center py-8 text-muted-foreground">
                Nessun alert trovato con i filtri applicati.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Condizione</TableHead>
                    <TableHead>Priorità</TableHead>
                    <TableHead>Ultima attivazione</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.name}</TableCell>
                      <TableCell>{alert.condition}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(alert.priority)}>
                          {alert.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.lastTriggered}</TableCell>
                      <TableCell>
                        <Switch 
                          checked={alert.status === "Active"} 
                          onCheckedChange={() => handleToggleStatus(alert.id, alert.status)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Testa alert"
                            onClick={() => handleTriggerAlert(alert.id)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Configura"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Elimina"
                            onClick={() => setAlertToDelete(alert.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {data && data.totalCount > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostra {((pagination.currentPage - 1) * pagination.pageSize) + 1} - {Math.min(pagination.currentPage * pagination.pageSize, data.totalCount)} di {data.totalCount} risultati
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {pagination.currentPage > 1 ? (
                        <PaginationLink onClick={() => pagination.goToPreviousPage()}>
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          <span>Previous</span>
                        </PaginationLink>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 gap-1 pl-2.5 opacity-50"
                          disabled
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Previous</span>
                        </Button>
                      )}
                    </PaginationItem>
                    
                    {renderPaginationItems()}
                    
                    <PaginationItem>
                      {pagination.currentPage < pagination.totalPages ? (
                        <PaginationLink onClick={() => pagination.goToNextPage()}>
                          <span>Next</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </PaginationLink>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 gap-1 pr-2.5 opacity-50"
                          disabled
                        >
                          <span>Next</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={alertToDelete !== null} onOpenChange={(open) => !open && setAlertToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sei sicuro di voler eliminare questo alert?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione non può essere annullata. L'alert verrà rimosso permanentemente dal sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminazione...
                </>
              ) : (
                "Elimina"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
