import Title from "../text/Title";
import { event } from "@/content/event";
import { Box, Stack } from "@mui/material";
import { Paragraph } from "../text/Paragraph";
import { Gallery } from "./Gallery";

export default function EditionsPrecedentes() {
    return (
        <Stack gap={6}>
            <Stack gap={6} alignItems={'center'}>
                <Title label="Editions Précédentes" />
                <Paragraph>
                    {event.editionsPrecedentes.description}
                </Paragraph>
            </Stack>


            <Stack gap={8}>
                {event.editionsPrecedentes.galleries.map((_, index) => {
                    return (
                        <Box key={index}>
                            <Gallery index={index} />
                        </Box>
                    );
                })}
            </Stack>
        </Stack>
    );
}
