import { Box, Typography } from "@mui/material";

export function Paragraph({ children }: { children: React.ReactNode }) {
    return (
        <Box maxWidth="sm">
            <Typography>
                {children}
            </Typography>
        </Box>
    );
}
