import { axes } from "@/content/axes";
import { Divider } from "@mui/material";
import Hero from "@/components/home/Hero";
import Teaser from "@/components/home/Teaser";
import MinCard from "@/components/axes/MinCard";
import { challenges } from "@/content/challenges";
import { CardLayout } from "@/components/CardLayout";
import ContactForm from "@/components/contact-us/Form";
import About from "@/components/home/about-section/About";

export default function Home() {
    return (
        <>
            <Hero /> 
            <Divider />
            <About />
            <Divider />
            <Teaser />
            <Divider />
            <CardLayout 
                data={axes}
                title="Axes" 
                CardComponent={MinCard} 
            />
            <Divider />
            <CardLayout 
                data={challenges} 
                title="Challenges" 
                CardComponent={MinCard} 
            />
            <Divider />
            <ContactForm />
        </>
    );
}
