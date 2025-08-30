import { common, red, green, teal } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material';

// 🎨 Refined Color Palette - Better harmony and contrast
const palette = {
  brand: {
    burgundy: "#8B2635",     // Slightly brighter for better contrast
    cream: "#FAF7F0",        // Warmer, less stark
    mustard: "#D4A574",      // More muted, harmonious
    teal: "#2D7D75",         // Better balanced
    midnight: "#1A1F3A",     // Slightly lighter for readability
    sage: "#7A8471",         // New complementary color
  },
  neutrals: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  accents: {
    coral: "#E67E55",        // Warm, inviting
    lavender: "#9B7EDE",     // Soft purple
    mint: "#68D8B0",         // Fresh green
    peach: "#F4A773",        // Gentle orange
  },
};

export const shadTheme = (mode: 'light' | 'dark') => {
  const isDarkMode = mode === 'dark';

return responsiveFontSizes(
    createTheme({
        palette: {
            mode,
            primary: isDarkMode
                ? {
                        main: palette.brand.teal,
                        light: "#7AAA99",
                        dark: "#1F5D56",
                        contrastText: common.white,
                    }
                : {
                        main: palette.brand.burgundy,
                        light: "#A63C4A",
                        dark: "#6B1F29",
                        contrastText: common.white,
                    },
            secondary: isDarkMode
                ? {
                        main: palette.brand.burgundy,
                        light: "#A63C4A",
                        dark: "#6B1F29",
                        contrastText: common.white,
                    }
                : {
                        main: palette.brand.teal,
                        light: "#7AAA99",
                        dark: "#1F5D56",
                        contrastText: common.white,
                    },
            background: {
                default: isDarkMode ? palette.brand.midnight : palette.brand.cream,
                paper: isDarkMode ? "#242B4A" : common.white,
            },
            error: {
                main: isDarkMode ? "#E57373" : red[700],
                light: isDarkMode ? "#EF9A9A" : red[500],
                dark: isDarkMode ? "#D32F2F" : red[900],
            },
            warning: {
                main: palette.brand.mustard,
                light: "#E6BC8A",
                dark: "#B8945E",
            },
            success: {
                main: isDarkMode ? "#81C784" : green[700],
                light: isDarkMode ? "#A5D6A7" : green[500],
                dark: isDarkMode ? "#4CAF50" : green[900],
            },
            info: {
                main: isDarkMode ? palette.accents.mint : teal[600],
                light: isDarkMode ? "#B2EBF2" : teal[400],
                dark: isDarkMode ? "#00695C" : teal[800],
            },
            divider: isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
            text: {
                primary: isDarkMode ? "#F5F5F5" : palette.neutrals[900],
                secondary: isDarkMode ? "#B8BCC8" : palette.neutrals[600],
                disabled: isDarkMode ? "rgba(255, 255, 255, 0.38)" : "rgba(0, 0, 0, 0.38)",
            },
            action: {
                hover: isDarkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
                selected: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                disabled: isDarkMode ? "rgba(255, 255, 255, 0.26)" : "rgba(0, 0, 0, 0.26)",
            },
        },
        // ...rest of your theme config remains unchanged
        shape: {
            borderRadius: 8,
        },
        spacing: 8,
        typography: {
            fontFamily: [
                "Inter",
                "Geist Sans", 
                "SF Pro Display",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "sans-serif",
            ].join(","),
            fontSize: 14,
            htmlFontSize: 16,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
            h1: {
                fontSize: "3rem",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
            },
            h2: {
                fontSize: "2.5rem",
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
            },
            h3: {
                fontSize: "2rem",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
            },
            h4: {
                fontSize: "1.5rem",
                fontWeight: 600,
                lineHeight: 1.35,
            },
            h5: {
                fontSize: "1.25rem",
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h6: {
                fontSize: "1.125rem",
                fontWeight: 600,
                lineHeight: 1.4,
            },
            body1: {
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.6,
            },
            body2: {
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: 1.5,
            },
            button: {
                fontSize: "0.875rem",
                fontWeight: 600,
                textTransform: "none",
                letterSpacing: "0.01em",
            },
            caption: {
                fontSize: "0.75rem",
                fontWeight: 400,
                lineHeight: 1.4,
                color: isDarkMode ? palette.neutrals[400] : palette.neutrals[600],
            },
            overline: {
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                lineHeight: 1.5,
            },
        },
        components: {
            // ...rest of your components config remains unchanged
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        background: isDarkMode
                            ? `linear-gradient(135deg, ${palette.brand.midnight} 0%, #243358 50%, #2A3B65 100%)`
                            : `linear-gradient(135deg, ${palette.brand.cream} 0%, #FFFFFF 50%, #F8F6F1 100%)`,
                        backgroundAttachment: "fixed",
                        color: isDarkMode ? "#F5F5F5" : palette.neutrals[900],
                        fontSmoothing: "antialiased",
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                    },
                    "*": {
                        scrollbarWidth: "thin",
                        scrollbarColor: isDarkMode 
                            ? `${palette.neutrals[600]} ${palette.neutrals[800]}`
                            : `${palette.neutrals[400]} ${palette.neutrals[200]}`,
                    },
                    "*::-webkit-scrollbar": {
                        width: "6px",
                    },
                    "*::-webkit-scrollbar-track": {
                        background: isDarkMode ? palette.neutrals[800] : palette.neutrals[200],
                    },
                    "*::-webkit-scrollbar-thumb": {
                        backgroundColor: isDarkMode ? palette.neutrals[600] : palette.neutrals[400],
                        borderRadius: "3px",
                    },
                },
            },
            // ...other component overrides unchanged
            MuiButton: {
                styleOverrides: {
                    root: {
                            fontWeight: 500,
                            boxShadow: 'none',
                            fontSize: '0.95rem', 
                            textTransform: 'none',
                        borderRadius: 8,
                        padding: "10px 24px",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                    containedPrimary: {
                        backgroundColor: isDarkMode ? palette.brand.teal : palette.brand.burgundy,
                        color: common.white,
                        "&:hover": {
                            backgroundColor: isDarkMode ? "#1F5D56" : "#6B1F29",
                            boxShadow: `0 4px 12px ${
                                isDarkMode ? palette.brand.teal : palette.brand.burgundy
                            }40`,
                        },
                    },
                    containedSecondary: {
                        backgroundColor: isDarkMode ? palette.brand.burgundy : palette.brand.teal,
                        color: common.white,
                        "&:hover": {
                            backgroundColor: isDarkMode ? "#6B1F29" : "#1F5D56",
                            boxShadow: `0 4px 12px ${
                                isDarkMode ? palette.brand.burgundy : palette.brand.teal
                            }40`,
                        },
                    },
                    outlined: {
                        borderWidth: "1.5px",
                        "&:hover": {
                            borderWidth: "1.5px",
                            backgroundColor: isDarkMode 
                                ? "rgba(255, 255, 255, 0.04)"
                                : "rgba(0, 0, 0, 0.04)",
                        },
                    },
                },
            },
            // ...rest of your component overrides unchanged
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        backgroundColor: isDarkMode ? "#242B4A" : common.white,
                        border: `1px solid ${
                            isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"
                        }`,
                        boxShadow: isDarkMode
                            ? "0 4px 20px rgba(0, 0, 0, 0.3)"
                            : "0 2px 12px rgba(0, 0, 0, 0.04)",
                    },
                    elevation1: {
                        boxShadow: isDarkMode
                            ? "0 2px 8px rgba(0, 0, 0, 0.2)"
                            : "0 1px 8px rgba(0, 0, 0, 0.04)",
                    },
                    elevation2: {
                        boxShadow: isDarkMode
                            ? "0 4px 16px rgba(0, 0, 0, 0.25)"
                            : "0 2px 12px rgba(0, 0, 0, 0.06)",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        backgroundColor: isDarkMode ? "#242B4A" : common.white,
                        border: `1px solid ${
                            isDarkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)"
                        }`,
                        boxShadow: isDarkMode
                            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                            : "0 4px 20px rgba(0, 0, 0, 0.08)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: isDarkMode
                                ? "0 12px 40px rgba(0, 0, 0, 0.4)"
                                : "0 8px 30px rgba(0, 0, 0, 0.12)",
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 8,
                            backgroundColor: isDarkMode 
                                ? "rgba(255, 255, 255, 0.02)"
                                : "rgba(0, 0, 0, 0.02)",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: isDarkMode ? palette.neutrals[500] : palette.neutrals[400],
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderWidth: "2px",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            fontWeight: 500,
                        },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        fontWeight: 500,
                        fontSize: "0.813rem",
                    },
                    filled: {
                        backgroundColor: isDarkMode ? palette.neutrals[700] : palette.neutrals[200],
                        color: isDarkMode ? common.white : palette.neutrals[800],
                        "&:hover": {
                            backgroundColor: isDarkMode ? palette.neutrals[600] : palette.neutrals[300],
                        },
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    root: {
                        borderBottom: `1px solid ${
                            isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"
                        }`,
                    },
                    indicator: {
                        height: 3,
                        borderRadius: "2px 2px 0 0",
                        backgroundColor: isDarkMode ? palette.brand.teal : palette.brand.burgundy,
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        minHeight: 48,
                        "&.Mui-selected": {
                            color: isDarkMode ? palette.brand.teal : palette.brand.burgundy,
                            fontWeight: 600,
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        transition: "all 0.2s ease",
                        "&:hover": {
                            backgroundColor: isDarkMode
                                ? "rgba(255, 255, 255, 0.08)"
                                : "rgba(0, 0, 0, 0.04)",
                            transform: "scale(1.05)",
                        },
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        "& .MuiSwitch-switchBase.Mui-checked": {
                            color: isDarkMode ? palette.brand.teal : palette.brand.burgundy,
                            "&:hover": {
                                backgroundColor: `${
                                    isDarkMode ? palette.brand.teal : palette.brand.burgundy
                                }14`,
                            },
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: isDarkMode ? palette.brand.teal : palette.brand.burgundy,
                            opacity: 0.5,
                        },
                    },
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        fontWeight: 500,
                    },
                    standardError: {
                        backgroundColor: isDarkMode ? "#4A1C1C" : "#FFF5F5",
                        color: isDarkMode ? "#FFCDD2" : "#C62828",
                        border: `1px solid ${isDarkMode ? "#D32F2F" : "#FFCDD2"}`,
                    },
                    standardWarning: {
                        backgroundColor: isDarkMode ? "#4A3C1C" : "#FFFBF0",
                        color: isDarkMode ? "#FFE0B2" : palette.brand.mustard,
                        border: `1px solid ${isDarkMode ? palette.brand.mustard : "#FFE0B2"}`,
                    },
                    standardSuccess: {
                        backgroundColor: isDarkMode ? "#1C4A2E" : "#F1F8E9",
                        color: isDarkMode ? "#C8E6C9" : "#2E7D32",
                        border: `1px solid ${isDarkMode ? "#4CAF50" : "#C8E6C9"}`,
                    },
                    standardInfo: {
                        backgroundColor: isDarkMode ? "#1C3A4A" : "#F0F8FF",
                        color: isDarkMode ? "#B3E5FC" : "#1976D2",
                        border: `1px solid ${isDarkMode ? "#2196F3" : "#B3E5FC"}`,
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 16,
                        backgroundColor: isDarkMode ? "#242B4A" : common.white,
                        backgroundImage: "none",
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: isDarkMode ? palette.neutrals[800] : palette.neutrals[700],
                        color: common.white,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        borderRadius: 6,
                        padding: "8px 12px",
                    },
                },
            },
        },
    })
);
};