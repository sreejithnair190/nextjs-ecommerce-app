"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTransition, useState, useEffect } from "react";

interface AdminSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function AdminSearchBar({ placeholder = "Search...", value: controlledValue, onChange }: AdminSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(controlledValue !== undefined ? controlledValue : searchParams.get("search") || "");

  useEffect(() => {
    if (controlledValue !== undefined) {
      setQuery(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange) {
        if (query !== controlledValue) {
          onChange(query);
        }
      } else {
        const params = new URLSearchParams(searchParams);
        if (query) {
          params.set("search", query);
          params.set("page", "1"); // Reset to page 1 on new search
        } else {
          params.delete("search");
        }

        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query, pathname, router, searchParams, onChange, controlledValue]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isPending && (
        <div className="absolute right-3 top-3 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      )}
    </div>
  );
}
