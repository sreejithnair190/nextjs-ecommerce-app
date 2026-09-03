"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProductVariant } from "@prisma/client";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  size: z.string().optional(),
  color: z.string().optional(),
  price: z.string().optional(), // We'll parse this to int in onSubmit
  stock: z.coerce.number().min(0, "Stock must be positive"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export function VariantForm({ 
  productId,
  initialData 
}: { 
  productId: string,
  initialData?: ProductVariant 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      sku: initialData?.sku || "",
      size: initialData?.size || "",
      color: initialData?.color || "",
      price: initialData?.price ? (initialData.price / 100).toString() : "",
      stock: initialData?.stock || 0,
      imageUrl: initialData?.imageUrl || "",
      isActive: initialData ? initialData.isActive : true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const formattedValues = {
        sku: values.sku,
        size: values.size || null,
        color: values.color || null,
        price: values.price ? Math.round(parseFloat(values.price) * 100) : null,
        stock: values.stock,
        imageUrl: values.imageUrl || null,
        isActive: values.isActive,
      };

      if (initialData) {
        await api.put(`/products/${productId}/variants/${initialData.id}`, formattedValues, {
          loadingMessage: "Updating variant..."
        } as any);
      } else {
        await api.post(`/products/${productId}/variants`, formattedValues, {
          loadingMessage: "Creating variant..."
        } as any);
      }
      router.refresh();
      router.push(`/admin/catalog/products/${productId}/variants`);
    } catch (error) {
      // Handled globally
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8 max-w-2xl">
        <FormField
          control={form.control as any}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="e.g. NL-TEE-M-BLK" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control as any}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. M" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control as any}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Override ($)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Leave blank for base price" {...field} />
                </FormControl>
                <FormDescription>
                  Overrides the product's base price.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control as any}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/variant.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control as any}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Active Status
                </FormLabel>
                <FormDescription>
                  Determine if this variant can be purchased.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : initialData ? "Save Changes" : "Create Variant"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push(`/admin/catalog/products/${productId}/variants`)} disabled={loading}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
