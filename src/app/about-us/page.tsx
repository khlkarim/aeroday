import { team } from "@/content/team";
import { Divider } from "@mui/material";
import { Deck } from "@/components/cards/Deck";
import Teaser from "@/components/event/Teaser";
import ProfileCard from "@/components/team/ProfileCard";
import EditionsPrecedentes from "@/components/event/EditionsPrecedentes";

export default function AboutUs() {
    return (
        <>
            <EditionsPrecedentes />
            <Divider />
            {/* <Teaser /> */}
            {/* <Divider /> */}
            <Deck title="Our Team" data={team} CardComponent={ProfileCard} />
        </>
    );
}
