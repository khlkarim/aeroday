import { axes } from "@/content/axes";
import { Divider } from "@mui/material";
import Hero from "@/components/event/Hero";
import About from "@/components/event/About";
import { Deck } from "@/components/cards/Deck";
import MinCard from "@/components/axes/MinCard";
import { challenges } from "@/content/challenges";
import ContactForm from "@/components/ContactForm";
import Teaser from "@/components/event/Teaser";

export default function Home() {
    return (
        <>
            <Hero />    
            <Divider />
            <About />
            <Divider />
            <Teaser />
            <Divider />
            <Deck title="Axes" data={axes} CardComponent={MinCard} />
            <Divider />
            <Deck title="Challenges" data={challenges} CardComponent={MinCard} />
            <Divider />
            <ContactForm />
        </>
    );
}
