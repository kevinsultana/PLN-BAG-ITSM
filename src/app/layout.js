import { Toaster } from "sonner";
import "./globals.css";
import { TicketDataProvider } from "@/context/TicketDataContext";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Dashboard ITSM",
  description: "dashboard ITSM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster richColors position="top-center" />
        <SessionWrapper>
          <TicketDataProvider>{children}</TicketDataProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
