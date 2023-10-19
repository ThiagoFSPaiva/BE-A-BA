import { Box,Typography } from "@mui/material"

export const Perfil = () => {
    return(

    <Box  sx={{
        display: "flex",
        paddingTop: "24px",
        justifyContent: "flex-end",
        spacing: 3

    }}>
        <Box sx={{
            height: "50px",
            width: "50px",
            bgcolor: "#43a047",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",

        }}>
            <Typography color="#fff" textAlign="center" fontSize="2rem">
                T
            </Typography>
        </Box>
    </Box>

    )
}