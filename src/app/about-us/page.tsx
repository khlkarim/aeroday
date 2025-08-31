import { team } from "@/content/team";
import { Divider } from "@mui/material";
import { CardLayout } from "@/components/CardLayout";
import ProfileCard from "@/components/team/ProfileCard";
import EditionsPrecedentes from "@/components/about-us/EditionsPrecedentes";

export default function AboutUs() {
    return (
        <>
            <EditionsPrecedentes />
            <Divider />
            <CardLayout title="Our Team" data={team} CardComponent={ProfileCard} />
        </>
    );
}
