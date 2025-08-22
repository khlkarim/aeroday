import Title from "../text/Title";
import { event } from "@/content/event";
import { Box, Container, Stack } from "@mui/material";
import { Paragraph } from "../text/Paragraph";
import { Gallery } from "./Gallery";

export default function EditionsPrecedentes() {
    return (
        <Container 
            sx={{ 
                gap: 6,
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh'
            }}
        >
            <Box sx={{
                gap: 6,
                display: 'flex', 
                alignItems: 'center',
                flexDirection: 'column', 
            }}>
                <Title label="Editions Précédentes" />
                <Paragraph>
                    {event.editionsPrecedentes.description}
                </Paragraph>
            </Box>


            <Stack gap={8}>
                {event.editionsPrecedentes.galleries.map((_, index) => {
                    return (
                        <Box key={index}>
                            <Gallery index={index} />
                        </Box>
                    );
                })}
            </Stack>
        </Container>
    );
}
