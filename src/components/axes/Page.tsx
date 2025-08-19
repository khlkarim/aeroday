import MaxCard from "@/components/axes/MaxCard";
import ProfileCard from "@/components/team/ProfileCard";
import { axes } from "@/content/axes";
import { team } from "@/content/team";
import { Box, Typography } from "@mui/material";

export default function Page({ id }: { id: number }) {
    const axe = axes[id];

    return (
        <>
            <Box className="flex flex-wrap items-center justify-around gap-6">
                <MaxCard item={axe} />
                <Box
                    className="flex flex-col justify-around items-center"
                >
                    <Typography variant="h2" margin={2}>
                        Responsable
                    </Typography>
                    <ProfileCard item={team[axe.responsableId]} />
                </Box>
            </Box>
        </>
    );
}