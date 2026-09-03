"use client";

import { MoreHorizontal, Plus, Pencil, Trash, ArrowLeft, Star } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";
import { Address, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export function AddressTable({ 
  addresses, 
  user 
}: { 
  addresses: Address[], 
  user: User 
}) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/users/${user.id}/addresses/${id}`, {
        loadingMessage: "Deleting address..."
      } as any);
      router.refresh();
    } catch (err) {
      // Handled globally
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/admin/users")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Addresses for {user.name || user.email}</h2>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={() => router.push(`/admin/users/${user.id}/addresses/new`)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Address
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Default</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City/State</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addresses.map((address) => (
              <TableRow key={address.id}>
                <TableCell>
                  {address.isDefault && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                </TableCell>
                <TableCell className="font-medium">{address.fullName}</TableCell>
                <TableCell>
                  {address.line1}
                  {address.line2 && <><br />{address.line2}</>}
                </TableCell>
                <TableCell>
                  {address.city}{address.state ? `, ${address.state}` : ""}
                  <br />
                  <span className="text-muted-foreground text-xs">{address.postalCode}</span>
                </TableCell>
                <TableCell>{address.country}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/admin/users/${user.id}/addresses/${address.id}/edit`)} className="cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(address.id)} className="cursor-pointer text-destructive">
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {addresses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No addresses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
