import { Toaster } from "sonner";
import "./globals.css";
import { TicketDataProvider } from "@/context/TicketDataContext";
import { AuthProvider } from "@/context/AuthContext"; // Import AuthProvider yang baru

export const metadata = {
  title: "Dashboard ITSM",
  description: "dashboard ITSM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster richColors position="top-center" />
        <AuthProvider>
          <TicketDataProvider>{children}</TicketDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
