"use client";

import { MoreHorizontal, Plus, Pencil, Trash, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Product, Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

type ProductWithCategory = Product & { category: Category };

export function ProductTable({ 
  products, 
}: { 
  products: ProductWithCategory[], 
}) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/products/${id}`, {
        loadingMessage: "Deleting product..."
      } as any);
      router.refresh();
    } catch (err) {
      // Handled globally
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button onClick={() => router.push("/admin/catalog/products/new")} className="gap-2">
          <Plus className="h-4 w-4" /> Create Product
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell>
                  {prod.images?.[0] ? (
                    <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 rounded object-cover" />
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xs">No img</div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{prod.name}</TableCell>
                <TableCell>{prod.category?.name || "Unknown"}</TableCell>
                <TableCell>${(prod.price / 100).toFixed(2)}</TableCell>
                <TableCell>{prod.stock}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    prod.isActive 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                  }`}>
                    {prod.isActive ? "Yes" : "No"}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/admin/catalog/products/${prod.id}/edit`)} className="cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(prod.id)} className="cursor-pointer text-destructive">
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push(`/admin/catalog/products/${prod.id}/variants`)} className="cursor-pointer">
                        <Layers className="mr-2 h-4 w-4" /> Manage Variants
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
