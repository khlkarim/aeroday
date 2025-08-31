import { Box } from "@mui/material";

export function Paragraph({ children }: { children: React.ReactNode }) {
    return (
        <Box maxWidth="sm" textAlign={{ xs: 'center', sm: 'start' }}>
            {children}
        </Box>
    );
}
