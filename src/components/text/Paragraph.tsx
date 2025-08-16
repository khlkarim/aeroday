import { Box, Typography } from "@mui/material";

export function Paragraph({ children }: { children: React.ReactNode }) {
    return (
        <Box maxWidth="sm">
            <Typography variant="body1">
                {children}
            </Typography>
        </Box>
    );
}
