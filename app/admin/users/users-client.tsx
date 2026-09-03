"use client";

import { useEffect } from "react";
import { UserTable } from "./user-table";
import { AdminPagination } from "@/components/admin/pagination";
import { AdminSearchBar } from "@/components/admin/search-bar";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUsers, setPage, setSearch } from "@/lib/store/features/users/usersSlice";
import { Loader2 } from "lucide-react";

export function UsersClient() {
  const dispatch = useAppDispatch();
  const { list, total, page, perPage, search, isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
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
        <h1 className="text-3xl font-bold">Users</h1>
        <AdminSearchBar 
          placeholder="Search users..." 
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
        <UserTable users={list} />
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
