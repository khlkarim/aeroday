import Hero from "@/components/event/Hero";
import About from "@/components/event/About";
import { Divider } from "@mui/material";
import { Deck } from "@/components/cards/Deck";
import { axes } from "@/content/axes";
import MinCard from "@/components/axes/MinCard";
import { challenges } from "@/content/challenges";
import ContactForm from "@/components/ContactForm";
import Teaser from "@/components/event/Teaser";
import EditionsPrecedentes from "@/components/event/EditionsPrecedentes";
import Section from "@/components/Section";

export default function Home() {
    return (
        <>
            <Section index={0}>
                <Hero />    
            </Section>
            <Section index={1}>
                <Divider />
                <About />
            </Section>
            <Section index={2}>
                <Divider />
                <Teaser />
            </Section>
            <Section index={3}>
                <Divider />
                <EditionsPrecedentes />
            </Section>
            <Section index={4}>
                <Divider />  
                <Deck title="Axes" data={axes} CardComponent={MinCard} />
            </Section>
            <Section index={5}>
                <Divider />
                <Deck title="Challenges" data={challenges} CardComponent={MinCard} />
            </Section>
            <Section index={6}>
                <Divider />
                <ContactForm />
            </Section>
        </>
    );
}
