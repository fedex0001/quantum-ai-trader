
import { useState } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  totalItems: number;
}

export function usePagination({ initialPage = 1, initialPageSize = 10, totalItems }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Calcola il numero totale di pagine
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Assicura che la pagina corrente sia nel range valido
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  // Funzioni per la navigazione tra le pagine
  const goToPage = (page: number) => {
    const validPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validPage);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Cambia la dimensione della pagina e resetta alla prima pagina
  const changePageSize = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    changePageSize
  };
}
