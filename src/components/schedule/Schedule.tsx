import * as React from "react";
import { Box, Stack } from "@mui/material";
import { days } from "@/content/schedule";
import { Day } from "@/components/schedule/Day";

export default function Schedule() {
    return (
        <Box sx={{ columns: '380px' }}>
            {days.map((_, idx) => (
                <Day key={idx} index={idx} />
            ))}
        </Box>
    );
}
