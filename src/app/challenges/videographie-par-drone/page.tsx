import Page from "@/components/challenges/Page";
import VideoList from "@/components/challenges/videographie-par-drone/VideoList";
import { Divider, Stack } from "@mui/material";

export default function Ambassade() {
    return (
        <Stack gap={8}>
            <Page id={5} />   
            <Divider />
            <VideoList />     
        </Stack>
    );
}
