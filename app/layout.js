'use client'
import { Inter } from "next/font/google";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BB86FC',
    },
    secondary: {
      main: '#03DAC6',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
