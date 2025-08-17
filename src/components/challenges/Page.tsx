import MaxCard from "@/components/challenges/MaxCard";
import ProfileCard from "@/components/team/ProfileCard";
import { challenges } from "@/content/challenges";
import { team } from "@/content/team";
import { Box, Typography } from "@mui/material";

export default function Page({ id }: { id: number }) {
    const challenge = challenges[id];

    return (
        <>
            <Box className="flex flex-wrap justify-around gap-6">
                <MaxCard item={challenge} />
                <Box
                    className="flex flex-col justify-around items-center"
                >
                    <Typography variant="h2" margin={2}>
                        Responsable
                    </Typography>
                    <ProfileCard item={team[challenge.responsableId]} />
                </Box>
            </Box>
        </>
    );
}