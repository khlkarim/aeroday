"use client"

import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const Title = ({ label }: { label: string }) => {
    return (
        <Stack alignItems={'center'}>
            <Stack alignItems={'center'}>
                <Typography variant="h3">
                    {label}
                </Typography>
                <Divider
                    sx={{
                        mt: 1,
                        width: '60%',
                        borderBottomWidth: 2,
                        borderColor: 'primary.main',
                    }}
                />
            </Stack>
        </Stack>
    );
}

export default Title;