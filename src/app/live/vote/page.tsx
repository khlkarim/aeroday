import { Divider, Stack } from "@mui/material";
import { Container } from "@/components/container";
import VideoList from "@/components/challenges/videographie-par-drone/VideoList";
import VoteResults from "@/components/challenges/videographie-par-drone/VoteResults";
import WinnerCard from "@/components/challenges/videographie-par-drone/WinnerCard";

export default function Vote() {
    return (
        <Container className="my-10 px-5 vw-80">
            <Stack gap={8}>
                <VideoList />
                <Divider />
                <WinnerCard />
                <Divider />
                <VoteResults />
            </Stack>
        </Container>
    );
}
