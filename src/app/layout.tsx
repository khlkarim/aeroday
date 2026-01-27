import "@/app/globals.css";

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/navigation/Navbar";
import ThreeDProvider from "@/providers/ThreeDProvider";
import { Container, Stack } from "@mui/material";
import Toolbar from "@/components/Toolbar";
import ThemeModeProvider from "@/providers/ThemeModeProvider";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import String from "@/components/deco/String";
import Banner from "@/components/deco/Banner";
import QueryProvider from "@/providers/QueryProvider";

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
                            <QueryProvider>
                                <Navbar />
                                <SmoothScrollProvider>
                                    <Banner />
                                    <String variant="inverted" />
                                    <Container className="stars">
                                        <Stack gap={8}>
                                            <Toolbar />
                                            {children}
                                            <Footer />
                                        </Stack>
                                    </Container>
                                </SmoothScrollProvider>
                            </QueryProvider>
                        </ThreeDProvider>
                    </ThemeModeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
