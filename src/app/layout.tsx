import "./globals.css";

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/navigation/Navbar";
import { Container, Stack, Toolbar } from "@mui/material";
import ThemeModeProvider from "@/providers/ThemeModeProvider";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ThreeDProvider from "@/providers/ThreeDProvider";

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
                        <ThreeDProvider>
                            <Navbar />
                            <SmoothScrollProvider>
                                <Container className="stars">
                                    <Stack gap={8}>
                                        <Toolbar />
                                        {children}
                                        <Footer />
                                    </Stack>
                                </Container>
                            </SmoothScrollProvider>
                        </ThreeDProvider>
                    </ThemeModeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
