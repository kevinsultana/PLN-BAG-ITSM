import "./globals.css";

export const metadata = {
  title: "Dashboard ITSM",
  description: "dashboard ITSM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
