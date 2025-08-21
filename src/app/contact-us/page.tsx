import ContactForm from "@/components/ContactForm";
import { Box } from "@mui/material";

export default function ContactUs() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ContactForm />
        </Box>
    );
}