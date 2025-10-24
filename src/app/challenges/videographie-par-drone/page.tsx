import Page from "@/components/challenges/Page";
import VideoList from "@/components/challenges/videographie-par-drone/VideoList";
import VoteResults from "@/components/challenges/videographie-par-drone/VoteResults";
import WinnerCard from "@/components/challenges/videographie-par-drone/WinnerCard";
import { Divider, Stack } from "@mui/material";

export default function Ambassade() {
    return (
        <Stack gap={8}>
            <Page id={5} />   
            <Divider />
            <VideoList />     
            <Divider />
            <WinnerCard />
            <Divider />
            <VoteResults />
        </Stack>
    );
}
