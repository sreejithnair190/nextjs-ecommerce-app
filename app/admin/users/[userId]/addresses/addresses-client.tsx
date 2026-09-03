"use client";

import { useEffect } from "react";
import { AddressTable } from "./address-table";
import { AdminPagination } from "@/components/admin/pagination";
import { AdminSearchBar } from "@/components/admin/search-bar";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchAddresses, setPage, setSearch, resetAddressesState } from "@/lib/store/features/addresses/addressesSlice";
import { Loader2 } from "lucide-react";
import { User } from "@prisma/client";

export function AddressesClient({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  const { list, total, page, perPage, search, isLoading, error } = useAppSelector((state) => state.addresses);

  useEffect(() => {
    dispatch(fetchAddresses(user.id));
  }, [dispatch, user.id, page, perPage, search]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      dispatch(resetAddressesState());
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
        <h2 className="text-2xl font-bold tracking-tight">Addresses for {user.name}</h2>
        <AdminSearchBar 
          placeholder="Search by Name or City..." 
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
        <AddressTable addresses={list} user={user} />
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
