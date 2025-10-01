import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Dashboard ITSM",
  description: "dashboard ITSM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased `}>
        <Toaster richColors position="top-center" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
