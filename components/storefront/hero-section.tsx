import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full h-[819px] flex items-center justify-center bg-surface overflow-hidden mb-xl">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
        aria-label="A premium minimalist interior space featuring a sleek designer sofa..."
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAE5_TvdSfWvOWUYrprqLaLPg_7g7YG7HhuXhN86LA3UHMomTdxK6dW1Z6Q6mrz_kjDsD0w_K_bTZHRAUBYjB9OhTNS7ugtiRTS4E9szO1a9qu1ZGHNylaWCRuNxAj7NkPsvw4Qj-Th_Xz_XNZ0pOJTdvENuJ6Fk3d4muuU20nfKI_1on1DVgLSiTS61zZQjU1lwt-MX-QDmZitZzoltz3te5H7_QNpUnuNsdUvbyiTtxjq_vRKjYzxA')",
        }}
      ></div>
      {/* Dark gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
      
      <div className="relative z-10 text-center px-margin-desktop max-w-[1440px] mx-auto flex flex-col items-center">
        <h1 className="text-display-lg font-bold text-white mb-md tracking-tight drop-shadow-md">
          Essentials for the Modern Living
        </h1>
        <Button render={<Link href="#" />} className="px-lg py-6 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 rounded-full text-button transition-all duration-300 shadow-lg">
          Shop New Arrivals
        </Button>
      </div>
    </section>
  );
}
