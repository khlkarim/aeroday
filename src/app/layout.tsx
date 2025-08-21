import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/geist-sans/300.css"; 
import "@fontsource/geist-sans/400.css"; 
import "@fontsource/geist-sans/500.css"; 
import "@fontsource/geist-sans/700.css"; 

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/navigation/Navbar";
import { Container, Stack, Toolbar } from "@mui/material";
import ThemeModeProvider from "@/providers/ThemeModeProvider";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

export const metadata: Metadata = {
    title: "Tunisian Aeroday 2026",
    icons: "/assets/images/logos/page-icon.ico"
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
                    <Navbar />
                    <SmoothScrollProvider>
                        <Container>
                            <Stack gap={8}>
                                <Toolbar />
                                {children}
                                <Footer />
                            </Stack>
                        </Container>
                    </SmoothScrollProvider>
                </ThemeModeProvider>
            </body>
        </html>
    );
}
