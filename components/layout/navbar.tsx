"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Search, User, ShoppingBag, Sun, Moon, Heart } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => setMounted(true), []);

  return (
    <nav className="bg-background/80 backdrop-blur-md sticky top-0 w-full border-b border-border z-50 transition-colors duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-16 max-w-[1440px] mx-auto h-20 gap-4">
        
        {/* Left: Brand & Links */}
        <div className="flex items-center gap-8">
          <Link
            className="text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors flex-shrink-0"
            href="/"
          >
            Northlane
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              className="text-foreground font-medium border-b-2 border-primary pb-1 text-sm hover:text-primary transition-colors duration-200"
              href="/products"
            >
              Shop
            </Link>
            <Link
              className="text-muted-foreground font-medium hover:text-foreground text-sm transition-colors duration-200"
              href="#"
            >
              About
            </Link>
          </div>
        </div>

        {/* Middle: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface-variant border border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface focus:border-border transition-all text-foreground placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push("/products");
                }
              }}
            />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-2 text-foreground flex-shrink-0">
          {/* Mobile Search Icon (Shows only on small screens) */}
          <button
            className="md:hidden hover:text-primary transition-colors duration-200 flex items-center justify-center p-2 rounded-full hover:bg-surface-variant"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {session?.user ? (
            <Link
              href="/profile"
              className="hover:text-primary transition-colors duration-200 flex items-center justify-center p-2 rounded-full hover:bg-surface-variant"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full transition-colors"
            >
              Log in
            </Link>
          )}
          
          <button
            className="hover:text-primary transition-colors duration-200 flex items-center justify-center p-2 rounded-full hover:bg-surface-variant text-muted-foreground"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>

          <Link
            href="/cart"
            className="hover:text-primary transition-colors duration-200 flex items-center justify-center p-2 rounded-full hover:bg-surface-variant relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {/* Mock Cart Badge */}
            <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
              2
            </span>
          </Link>
          
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:text-primary transition-colors duration-200 flex items-center justify-center p-2 rounded-full hover:bg-surface-variant"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
