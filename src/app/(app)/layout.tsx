import type React from "react";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
        <Navbar />
        <section>
            {children}
        </section>
        <Footer />
    </main>
  );
}