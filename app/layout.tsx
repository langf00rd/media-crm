import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { UserProvider } from "@/hooks/use-user";
import "./globals.css";

export const metadata: Metadata = {
  title: "media crm thing",
  description: "media crm thing",
  generator: "media crm thing",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
