import type { Components, Theme } from '@mui/material/styles';

export const components: Components<Omit<Theme, "components">> = {
    MuiButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                fontWeight: 500,
                borderRadius: 100,
                fontSize: '0.95rem',  
                padding: '10px 22px',
                textTransform: 'none',
                letterSpacing: '0.3px',     
                transition: theme.transitions.create(
                    ['background-color', 'box-shadow'],
                    { duration: 200 }
                ),
                boxShadow: 'none',

                '&:hover': {
                    boxShadow: theme.shadows[2],
                },

                '&:active': {
                    boxShadow: theme.shadows[1],
                },

                '&:focus-visible': {
                    outline: 'none',
                    boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
                },
            }),
        },
        variants: [
            {
                props: { variant: 'contained' },
                style: ({ theme }) => ({
                    color: theme.palette.primary.contrastText,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }),
            },
            {
                props: { variant: 'outlined' },
                style: ({ theme }) => ({
                    borderWidth: 2,
                    color: theme.palette.primary.main,
                    '&:hover': {
                        borderWidth: 2,
                        backgroundColor: theme.palette.action.hover,
                    },
                }),
            },
            {
                props: { variant: 'text' },
                style: ({ theme }) => ({
                    padding: '8px 14px',
                    color: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }),
            },
        ],
    },
};
