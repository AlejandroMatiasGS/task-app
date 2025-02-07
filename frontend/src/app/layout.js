
import { ThemeProvider } from "@/contexts/theme-context";
import "./globals.css";

export const metadata = {
  title: "Task App",
  description: "Mi task app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-white dark:bg-gray-900">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
