
import { useState, useEffect } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export function usePagination({ 
  initialPage = 1, 
  initialPageSize = 10, 
  totalItems,
  onPageChange,
  onPageSizeChange
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Calcola il numero totale di pagine
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Effetto per gestire il cambiamento di pagina
  useEffect(() => {
    // Assicura che la pagina corrente sia nel range valido
    if (currentPage > totalPages) {
      const newPage = Math.max(1, totalPages);
      setCurrentPage(newPage);
      if (onPageChange) onPageChange(newPage);
    }
  }, [totalItems, pageSize, currentPage, totalPages, onPageChange]);

  // Funzioni per la navigazione tra le pagine
  const goToPage = (page: number) => {
    const validPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validPage);
    if (onPageChange) onPageChange(validPage);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (onPageChange) onPageChange(newPage);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (onPageChange) onPageChange(newPage);
    }
  };

  // Cambia la dimensione della pagina e resetta alla prima pagina
  const changePageSize = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
    if (onPageSizeChange) onPageSizeChange(newSize);
    if (onPageChange) onPageChange(1);
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    changePageSize,
    // Aggiungi metadati utili per l'integrazione con API
    paginationMeta: {
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      page: currentPage,
      total: totalItems
    }
  };
}
