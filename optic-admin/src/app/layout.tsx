import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "ŌPTIC | Admin Portal",
  description: "Cinematic Dark Luxury Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background min-h-screen text-foreground selection:bg-optic-amber selection:text-white transition-colors duration-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
               {/* Subtle noise overlay */}
               <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
               
               {/* Content */}
               <div className="relative z-10 p-8 pt-24 md:pt-8 min-h-full">
                 {children}
               </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
