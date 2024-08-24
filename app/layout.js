'use client'
import { Inter } from "next/font/google";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

const cuteTheme = createTheme({
  palette: {
    mode: 'light',  // Switching to light mode for a brighter, cuter look
    primary: {
      main: '#e8b4b8',  // Soft pink for primary actions
    },
    secondary: {
      main: '#a49393',  // Warm beige for secondary elements
    },
    background: {
      default: '#eed6d3',  // Light, warm background color
      paper: '#67595e',  // Deep, contrasting paper color
    },
    text: {
      primary: '#67595e',  // Darker color for primary text
      secondary: '#a49393',  // Slightly lighter color for secondary text
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider theme={cuteTheme}>
        <CssBaseline />
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
