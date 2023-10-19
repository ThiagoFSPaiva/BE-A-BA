import { createTheme } from "@mui/material";

export const Dark = createTheme({

    palette: {
        primary: {
            main: "#fff",
            dark: "#202125",
            light: "#747474",
            contrastText: "#ffffff",
            textColor: "#757575",
            iconColor: "#757575"
        },
        background: {
            default: "#16171B"
        },
    },
    shape: {
        borderRadius: 8
    },

});