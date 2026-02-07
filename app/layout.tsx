import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/global/theme-provider";
import { HydrationErrorSuppressor } from "@/components/global/hydration-error-suppressor";
import { DevNotice } from "@/components/global/dev-notice";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "DS Visualizer",
  description: "DS Visualizer is a tool for visualizing data structures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
          <HydrationErrorSuppressor />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <div className="flex-1">
                {children}
              </div>
            </div>
            <Toaster />
            <DevNotice />
          </ThemeProvider>
          <Analytics />
      </body>
    </html>
  );
}
