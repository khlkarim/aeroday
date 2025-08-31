import { createTheme, responsiveFontSizes } from '@mui/material';

// 🎨 Minimized Color Palette - All colors consolidated
const palette = {
  brand: {
    burgundy: "#8B2635",     // Primary brand color
    cream: "#FAF7F0",        // Background light
    mustard: "#D4A574",      // Warning/accent
    teal: "#2D7D75",         // Secondary brand color
    midnight: "#1A1F3A",     // Background dark
    sage: "#7A8471",         // Neutral accent
  },
  // Simplified neutrals - only essential grays
  neutral: {
    white: "#FFFFFF",
    light: "#F5F5F5",        // Light backgrounds
    medium: "#9E9E9E",       // Disabled/placeholder text
    dark: "#424242",         // Secondary text
    black: "#212121",        // Primary text
  },
  // Semantic colors derived from brand colors
  semantic: {
    error: "#D32F2F",        // Standard error red
    success: "#2E7D32",      // Standard success green
    info: "#1976D2",         // Standard info blue
    // Light variants for backgrounds
    errorBg: "#FFEBEE",
    successBg: "#E8F5E8",
    infoBg: "#E3F2FD",
    // Dark variants for backgrounds
    errorBgDark: "#4A1C1C",
    successBgDark: "#1C4A2E", 
    infoBgDark: "#1C3A4A",
  },
  // Alpha values for consistent transparency
  alpha: {
    light: "rgba(255, 255, 255, 0.04)",
    medium: "rgba(255, 255, 255, 0.08)",
    heavy: "rgba(255, 255, 255, 0.12)",
    darkLight: "rgba(0, 0, 0, 0.04)",
    darkMedium: "rgba(0, 0, 0, 0.08)",
    darkHeavy: "rgba(0, 0, 0, 0.12)",
  }
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
              light: "#5A9B93",
              dark: "#1F5D56",
              contrastText: palette.neutral.white,
            }
          : {
              main: palette.brand.burgundy,
              light: "#A63C4A",
              dark: "#6B1F29",
              contrastText: palette.neutral.white,
            },
        secondary: isDarkMode
          ? {
              main: palette.brand.burgundy,
              light: "#A63C4A",
              dark: "#6B1F29",
              contrastText: palette.neutral.white,
            }
          : {
              main: palette.brand.teal,
              light: "#5A9B93",
              dark: "#1F5D56",
              contrastText: palette.neutral.white,
            },
        background: {
          default: isDarkMode ? palette.brand.midnight : palette.brand.cream,
          paper: isDarkMode ? "#242B4A" : palette.neutral.white,
        },
        error: {
          main: palette.semantic.error,
          light: "#EF5350",
          dark: "#C62828",
        },
        warning: {
          main: palette.brand.mustard,
          light: "#E6BC8A",
          dark: "#B8945E",
        },
        success: {
          main: palette.semantic.success,
          light: "#4CAF50",
          dark: "#1B5E20",
        },
        info: {
          main: palette.semantic.info,
          light: "#42A5F5",
          dark: "#1565C0",
        },
        divider: isDarkMode ? palette.alpha.heavy : palette.alpha.darkMedium,
        text: {
          primary: isDarkMode ? palette.neutral.light : palette.neutral.black,
          secondary: isDarkMode ? palette.neutral.medium : palette.neutral.dark,
          disabled: isDarkMode ? "rgba(255, 255, 255, 0.38)" : "rgba(0, 0, 0, 0.38)",
        },
        action: {
          hover: isDarkMode ? palette.alpha.light : palette.alpha.darkLight,
          selected: isDarkMode ? palette.alpha.medium : palette.alpha.darkMedium,
          disabled: isDarkMode ? "rgba(255, 255, 255, 0.26)" : "rgba(0, 0, 0, 0.26)",
        },
      },
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
          color: isDarkMode ? palette.neutral.medium : palette.neutral.dark,
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
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: isDarkMode
                ? `linear-gradient(135deg, ${palette.brand.midnight} 0%, #243358 50%, #2A3B65 100%)`
                : `linear-gradient(135deg, ${palette.brand.cream} 0%, ${palette.neutral.white} 50%, #F8F6F1 100%)`,
              backgroundAttachment: "fixed",
              color: isDarkMode ? palette.neutral.light : palette.neutral.black,
              fontSmoothing: "antialiased",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            },
            "*": {
              scrollbarWidth: "thin",
              scrollbarColor: isDarkMode 
                ? `${palette.neutral.medium} ${palette.neutral.dark}`
                : `${palette.neutral.medium} ${palette.neutral.light}`,
            },
            "*::-webkit-scrollbar": {
              width: "6px",
            },
            "*::-webkit-scrollbar-track": {
              background: isDarkMode ? palette.neutral.dark : palette.neutral.light,
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: palette.neutral.medium,
              borderRadius: "3px",
            },
          },
        },
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
              color: palette.neutral.white,
              "&:hover": {
                backgroundColor: isDarkMode ? "#1F5D56" : "#6B1F29",
                boxShadow: `0 4px 12px ${
                  isDarkMode ? palette.brand.teal : palette.brand.burgundy
                }40`,
              },
            },
            containedSecondary: {
              backgroundColor: isDarkMode ? palette.brand.burgundy : palette.brand.teal,
              color: palette.neutral.white,
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
                backgroundColor: isDarkMode ? palette.alpha.light : palette.alpha.darkLight,
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
              backgroundColor: isDarkMode ? "#242B4A" : palette.neutral.white,
              border: `1px solid ${isDarkMode ? palette.alpha.medium : palette.alpha.darkMedium}`,
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
              backgroundColor: isDarkMode ? "#242B4A" : palette.neutral.white,
              border: `1px solid ${isDarkMode ? palette.alpha.medium : palette.alpha.darkLight}`,
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
                backgroundColor: isDarkMode ? palette.alpha.light : palette.alpha.darkLight,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: palette.neutral.medium,
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
              backgroundColor: isDarkMode ? palette.neutral.dark : palette.neutral.light,
              color: isDarkMode ? palette.neutral.white : palette.neutral.black,
              "&:hover": {
                backgroundColor: isDarkMode ? palette.neutral.medium : palette.neutral.medium,
              },
            },
          },
        },
        MuiTabs: {
          styleOverrides: {
            root: {
              borderBottom: `1px solid ${isDarkMode ? palette.alpha.medium : palette.alpha.darkMedium}`,
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
                backgroundColor: isDarkMode ? palette.alpha.medium : palette.alpha.darkLight,
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
              backgroundColor: isDarkMode ? palette.semantic.errorBgDark : palette.semantic.errorBg,
              color: isDarkMode ? "#FFCDD2" : palette.semantic.error,
              border: `1px solid ${isDarkMode ? palette.semantic.error : "#FFCDD2"}`,
            },
            standardWarning: {
              backgroundColor: isDarkMode ? "#4A3C1C" : "#FFFBF0",
              color: isDarkMode ? "#FFE0B2" : palette.brand.mustard,
              border: `1px solid ${isDarkMode ? palette.brand.mustard : "#FFE0B2"}`,
            },
            standardSuccess: {
              backgroundColor: isDarkMode ? palette.semantic.successBgDark : palette.semantic.successBg,
              color: isDarkMode ? "#C8E6C9" : palette.semantic.success,
              border: `1px solid ${isDarkMode ? palette.semantic.success : "#C8E6C9"}`,
            },
            standardInfo: {
              backgroundColor: isDarkMode ? palette.semantic.infoBgDark : palette.semantic.infoBg,
              color: isDarkMode ? "#B3E5FC" : palette.semantic.info,
              border: `1px solid ${isDarkMode ? palette.semantic.info : "#B3E5FC"}`,
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: 16,
              backgroundColor: isDarkMode ? "#242B4A" : palette.neutral.white,
              backgroundImage: "none",
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              backgroundColor: isDarkMode ? palette.neutral.dark : palette.neutral.dark,
              color: palette.neutral.white,
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