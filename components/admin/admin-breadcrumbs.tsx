"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AdminBreadcrumbs() {
  const pathname = usePathname();
  
  if (!pathname || pathname === "/admin") {
    return null; // Don't show breadcrumbs on the main admin dashboard
  }

  const segments = pathname.split("/").filter((s) => s !== "");
  
  return (
    <div className="px-8 pt-8 pb-2">
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const href = "/" + segments.slice(0, index + 1).join("/");
            
            let label = segment.replace(/-/g, " ");
            label = label.charAt(0).toUpperCase() + label.slice(1);
            
            // Truncate long IDs (e.g. CUIDs or UUIDs)
            if (segment.length > 20) {
              label = segment.substring(0, 8) + "...";
            }

            return (
              <React.Fragment key={href}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>
                      {label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
