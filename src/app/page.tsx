import { Box } from "@mui/material";
import { axes } from "@/content/axes";
import { Divider } from "@mui/material";
import Hero from "@/components/home/Hero";
import About from "@/components/home/about-section/About";
import Teaser from "@/components/home/Teaser";
import { CardLayout } from "@/components/CardLayout";
import MinCard from "@/components/axes/MinCard";
import { challenges } from "@/content/challenges";
import ContactForm from "@/components/contact-us/Form";

export default function Home() {
    return (
        <>
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    width: '100dvw',
                    height: { xs: '14dvh', sm: '14dvh', md: '18dvh' },
                    overflow: 'hidden',
                    position: 'absolute',
                    backgroundImage: "url('/assets/images/deco/strand.jpg')",
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'auto 150%', 
                    backgroundPosition: 'bottom',
                }}
            />
            <Hero />    
            <Divider />
            <About />
            <Divider />
            <Teaser />
            <Divider />
            <CardLayout title="Axes" data={axes} CardComponent={MinCard} />
            <Divider />
            <CardLayout title="Challenges" data={challenges} CardComponent={MinCard} />
            <Divider />
            <ContactForm />
        </>
    );
}
