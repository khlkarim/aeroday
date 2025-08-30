import * as React from "react";
import { Box } from "@mui/material";
import { days } from "@/content/schedule";
import { Day } from "@/components/schedule/Day";

export default function Schedule() {
    return (
        <Box sx={{ columns: '500px' }}>
            {days.map((_, idx) => (
                <Day key={idx} index={idx} />
            ))}
        </Box>
    );
}
