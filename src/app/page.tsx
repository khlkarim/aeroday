import { axes } from "@/content/axes";
import { Divider } from "@mui/material";
import Hero from "@/components/home/Hero";
import About from "@/components/home/about-section/About";
import Teaser from "@/components/home/Teaser";
import { CardLayout } from "@/components/CardLayout";
import MinCard from "@/components/axes/MinCard";
import { challenges } from "@/content/challenges";
import ContactForm from "@/components/ContactForm";

export default function Home() {
    return (
        <>
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
