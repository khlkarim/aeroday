import Badge from "@/components/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactForm from "@/components/ContactForm";
import { Divider, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ContactUs() {
    return (
        <>
            <Stack 
                gap={4}
                width={'100%'} 
                flexWrap={'wrap'} 
                flexDirection={'row'} 
                justifyContent={'space-around'}
            >
                <Badge>
                    <Stack gap={1} alignItems={'center'}>
                        <LocationOnIcon color="primary" fontSize="large" />
                        <Typography variant="h5">Visit Our Office</Typography>
                        <Typography 
                            variant="body1" 
                            textAlign={'center'}
                            color="text.secondary"
                        >
                            INSAT Centre Urbain Nord BP 676 - 1080 Tunis Cedex
                        </Typography>
                    </Stack>
                </Badge>
                <Badge>
                    <Stack alignItems={'center'}>
                        <EmailIcon color="primary" fontSize="large" />
                        <Typography variant="h5">Email Us</Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                        >
                            contact@aeroday.tn
                        </Typography>
                    </Stack>
                </Badge>
                <Badge>
                    <Stack alignItems={'center'}>
                        <PhoneIcon color="primary" fontSize="large" />
                        <Typography variant="h5">Call Us</Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                        >
                            +216 12 123 123
                        </Typography>
                    </Stack>
                </Badge>
            </Stack>

            <Divider />

            <ContactForm />
        </>
    );
}