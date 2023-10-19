import { ReactNode } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { colors } from '@mui/material';

interface HeaderProps {
    title: string;
    icon: ReactNode; // Defina o tipo para a prop "icon" como ReactNode
    children?: ReactNode; // Torne a propriedade "children" opcional
}

export const Header = (props: HeaderProps) => {
    const theme = useTheme();
    return(
        <Box sx={{
            py: 4
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "space-between",
            }}>
                <Box sx={{
                    display: "flex",
                    gap: "10px"

                }}>
                    {props.icon}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"                      
                    }}>
                        <Typography variant="h1" color={theme.palette.primary.contrastText} fontSize="1.9rem" fontWeight={500}>
                            {props.title}
                        </Typography>
                        <Typography variant="h2" color={colors.green[600]} fontSize="0.8rem" fontWeight={500}>
                            Visualize e gerencie todos templates, podendo ativar ou desativar cada um.
                        </Typography>
                    </Box>
                </Box>

                {props.children}
            </Box>
        </Box>
    )
}