"use client"

import { Stack } from '@mui/material';
import { Star } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const Title = ({ label }: { label: string }) => {
    return (
        <Stack alignItems={'center'}>
            <Stack alignItems={'center'}>
                <Stack flexDirection={'row'} alignItems={"center"} gap={1}>
                    <Star color='warning' fontSize="medium" />
                    <Typography variant="h3" color='primary'>
                        {label}
                    </Typography>
                    <Star color='warning' fontSize='medium' />
                </Stack>
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