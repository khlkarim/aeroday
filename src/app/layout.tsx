import "./globals.css";

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/navigation/Navbar";
import { Container, Stack, Toolbar } from "@mui/material";
import ThemeModeProvider from "@/providers/ThemeModeProvider";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

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
                <AppRouterCacheProvider>
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
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
