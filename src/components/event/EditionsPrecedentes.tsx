import { event } from "@/content/event";
import { Typography, Box, Divider } from "@mui/material";
import { Paragraph } from "../text/Paragraph";

export default function EditionsPrecedentes() {
    return (
        <Box sx={{ 
            display: "flex", 
            minHeight: '100vh',
            alignItems: "center",
            flexDirection: 'column',
            justifyContent: "space-around", 
        }}>
            <Typography variant="h3">
                Éditions Précédentes
                <Divider 
                    sx={{ 
                        mt: 1, 
                        mx: "auto", 
                        width: 200, 
                        borderBottomWidth: 2,
                        borderColor: "primary.main", 
                    }} />
            </Typography>

            <Paragraph>
                {event.editionsPrecedentes.description}
            </Paragraph>
        </Box>
    );
}
