import { axes } from "@/content/axes";
import Hero from "@/components/event/Hero";
import About from "@/components/event/About";
import Teaser from "@/components/event/Teaser";
import { Deck } from "@/components/cards/Deck";
import MinCard from "@/components/axes/MinCard";
import { challenges } from "@/content/challenges";
import ContactForm from "@/components/ContactForm";
import EditionsPrecedentes from "@/components/event/EditionsPrecedentes";
import { Divider } from "@mui/material";

export default function Home() {
    return (
        <>
            <Hero />    
            <Divider />
            <About />
            <Divider />
            <Teaser />
            <Divider />
            <EditionsPrecedentes />
            <Divider />
            <Deck title="Axes" data={axes} CardComponent={MinCard} />
            <Divider />
            <Deck title="Challenges" data={challenges} CardComponent={MinCard} />
            <Divider />
            <ContactForm />
        </>
    );
}
