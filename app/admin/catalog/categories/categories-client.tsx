"use client";

import { useEffect } from "react";
import { CategoryTable } from "./category-table";
import { AdminPagination } from "@/components/admin/pagination";
import { AdminSearchBar } from "@/components/admin/search-bar";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCategories, setPage, setSearch } from "@/lib/store/features/categories/categoriesSlice";
import { Loader2 } from "lucide-react";

export function CategoriesClient() {
  const dispatch = useAppDispatch();
  const { list, total, page, perPage, search, isLoading, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, page, perPage, search]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleSearch = (newSearch: string) => {
    dispatch(setSearch(newSearch));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories</h1>
        <AdminSearchBar 
          placeholder="Search categories..." 
          value={search}
          onChange={handleSearch}
        />
      </div>
      
      {error && (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <CategoryTable categories={list} />
      )}

      {!isLoading && total > perPage && (
        <AdminPagination 
          totalItems={total} 
          perPage={perPage} 
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
