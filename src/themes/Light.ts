import { createTheme } from "@mui/material";

export const Light = createTheme({


    typography: {
        fontFamily: 'Nunito, sans-serif',
    },
    components: {
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: '#43a047',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                },
            },
        }
    },
    palette: {
        mode: "light",
        primary: {
            main: "#39a03d",
            light: "#056f09",
            dark: "#124514",
            contrastText: "#364a63",
            textColor: "#757575",
            iconColor: "#757575"
        },
        secondary: {
            main: "#00733B",
            light: "#056f09",
            dark: "#8094ae",
            contrastText: "#ebeef2",
        },
        background: {
            paper: "#fff",
            default: "#f5f6fa"
        },
        text: {
            primary: "#364a63",
            secondary: "#8094ae",
        },
    },
    shape: {
        borderRadius: 5
    },

});