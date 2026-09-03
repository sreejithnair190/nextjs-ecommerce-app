"use client";

import { useEffect } from "react";
import { VariantTable } from "./variant-table";
import { AdminPagination } from "@/components/admin/pagination";
import { AdminSearchBar } from "@/components/admin/search-bar";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchVariants, setPage, setSearch, resetVariantsState } from "@/lib/store/features/variants/variantsSlice";
import { Loader2 } from "lucide-react";
import { Product } from "@prisma/client";

export function VariantsClient({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const { list, total, page, perPage, search, isLoading, error } = useAppSelector((state) => state.variants);

  useEffect(() => {
    dispatch(fetchVariants(product.id));
  }, [dispatch, product.id, page, perPage, search]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      dispatch(resetVariantsState());
    };
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleSearch = (newSearch: string) => {
    dispatch(setSearch(newSearch));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Variants</h2>
        <AdminSearchBar 
          placeholder="Search by SKU, Size, or Color..." 
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
        <VariantTable variants={list} product={product} />
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
