import "./globals.css";
import "@fontsource/geist-sans/300.css"; 
import "@fontsource/geist-sans/400.css"; 
import "@fontsource/geist-sans/500.css"; 
import "@fontsource/geist-sans/700.css"; 

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Container } from "@mui/material";
import Navbar from "@/components/navigation/Navbar";
import ThemeModeProvider from "@/providers/ThemeModeProvider";

export const metadata: Metadata = {
    title: "Tunisian Aeroday 2026",
    icons: "assets/images/logos/page-icon.ico"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ThemeModeProvider>
                    <Container sx={{ 
                        pt: '7rem',
                        gap: 8, 
                        display: "flex", 
                        flexDirection: "column"
                    }}>
                        <Navbar />
                            {children}
                        <Footer />
                    </Container>
                </ThemeModeProvider>
            </body>
        </html>
    );
}
