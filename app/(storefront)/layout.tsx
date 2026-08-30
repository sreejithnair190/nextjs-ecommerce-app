import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function StoreFrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="w-full flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}