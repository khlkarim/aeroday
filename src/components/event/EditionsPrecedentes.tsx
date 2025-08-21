import Title from "../text/Title";
import { Container } from "@mui/material";
import { event } from "@/content/event";
import { Paragraph } from "../text/Paragraph";

export default function EditionsPrecedentes() {
    return (
        <Container 
            sx={{ 
                gap: 6,
                display: 'flex', 
                alignItems: 'center',
                flexDirection: 'column', 
                minHeight: '100vh'
            }}
        >
            <Title label="Editions Précédentes" />

            <Paragraph>
                {event.editionsPrecedentes.description}
            </Paragraph>
        </Container>
    );
}
