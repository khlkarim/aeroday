import Page from "@/components/challenges/Page";
import VideoList from "@/components/challenges/videographie-par-drone/VideoList";
import VotingResults from "@/components/challenges/videographie-par-drone/VotingResults";
import { Divider, Stack } from "@mui/material";

export default function Ambassade() {
    return (
        <Stack gap={8}>
            <Page id={5} />   
            <Divider />
            <VideoList />     
            <Divider />
            <VotingResults />
        </Stack>
    );
}
