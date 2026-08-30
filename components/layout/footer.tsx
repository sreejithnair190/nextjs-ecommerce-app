import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface w-full border-t border-border mt-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16 py-16 max-w-[1440px] mx-auto">
        {/* Brand Column */}
        <div className="flex flex-col mb-8 md:mb-0">
          <span className="text-xl font-bold text-foreground mb-4">
            Northlane
          </span>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
            Curated essentials for a modern, mindful lifestyle.
          </p>
          <div className="mt-auto">
            <span className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} Northlane. All rights reserved.
            </span>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col space-y-4">
          <Link
            className="text-muted-foreground hover:text-primary text-sm font-medium hover:underline decoration-1 underline-offset-4 transition-all duration-300"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-muted-foreground hover:text-primary text-sm font-medium hover:underline decoration-1 underline-offset-4 transition-all duration-300"
            href="#"
          >
            Customer Service
          </Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col space-y-4">
          <Link
            className="text-muted-foreground hover:text-primary text-sm font-medium hover:underline decoration-1 underline-offset-4 transition-all duration-300"
            href="#"
          >
            Shipping
          </Link>
          <Link
            className="text-muted-foreground hover:text-primary text-sm font-medium hover:underline decoration-1 underline-offset-4 transition-all duration-300"
            href="#"
          >
            Returns
          </Link>
        </div>

        {/* Links Column 3 */}
        <div className="flex flex-col space-y-4">
          <Link
            className="text-muted-foreground hover:text-primary text-sm font-medium hover:underline decoration-1 underline-offset-4 transition-all duration-300"
            href="#"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
