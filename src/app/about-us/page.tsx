import { Deck } from "@/components/cards/Deck";
import ProfileCard from "@/components/team/ProfileCard";
import { team } from "@/content/team";

export default function AboutUs() {
    return (
        <>
            <Deck title="Our Team" data={team} CardComponent={ProfileCard} />
        </>
    );
}
