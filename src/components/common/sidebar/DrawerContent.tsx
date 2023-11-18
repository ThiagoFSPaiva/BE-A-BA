import { Box, Paper, List, Button, styled, Switch, Stack, Typography } from '@mui/material';
import { Animate } from '../Animate';
import { images } from '../../../assets';
import MenuItem from './MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfoByToken, logout } from '../../../shared/functions/connection/auth';
import { UserTypeEnum } from '../../../shared/enums/userType.enum';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useAppThemeContext } from '../../../shared/contexts';
import { useTheme } from '@emotion/react';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';


interface DrawerContentProps {
    menus: any[];
    menuAdmin: any[];
    activeState: string;
    isMobile: boolean;
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: "64px",
    height: "34px",
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#15171e' : '#FFC107',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));


const DrawerContent: React.FC<DrawerContentProps> = ({ menus, menuAdmin, activeState, isMobile }) => {
    const { user } = useGlobalReducer();

    const navigate = useNavigate();
    const { toggleTheme, themeName } = useAppThemeContext()



    return (
        <Box
            padding={isMobile ? 0 : 3}
            paddingTop={isMobile ? 3 : ''}
            paddingBottom={0}
            display="flex"
            flexDirection="column"
            height="100vh"
            sx={{
                '::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
        >
            {/* logo */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Animate type="fade" delay={1}>
                    <img src={images.logo} alt="logo" height={60} />
                </Animate>
            </Box>
            {/* logo */}
            <Animate sx={{ flexGrow: 1 }}>

                <Box
                    sx={{
                        backgroundColor: theme => theme.palette.background.paper,
                        borderTopRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                        p: 2,
                        height: '100%',
                        border: theme => theme.palette.mode === 'dark' ? "1px solid #5a5a5a52" : 'none',
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                    }}>
                        <List>
                            {menus.map((item, index) => (
                                <Link to={`/${item.path}`} key={item.state}>
                                    <MenuItem
                                        index={index}
                                        to={item.path}
                                        item={item}
                                        isActive={item.state === activeState}
                                    />
                                </Link>
                            ))}

                            {user?.typeUser === UserTypeEnum.Admin &&
                                menuAdmin.map((item, index) => (
                                    <Link to={`/${item.path}`} key={item.state}>
                                        <MenuItem
                                            index={index}
                                            to={item.path}
                                            item={item}
                                            isActive={item.state === activeState}
                                        />
                                    </Link>
                                ))}
                        </List>

                        {/* menu group 2 */}

                        <Stack spacing={2} direction="column" alignItems="center">
                            <Box sx={{
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                            
                                backgroundImage: `url('https://criticalhits.com.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2022/04/spy-x-family-loid-forger-anime-768x402.jpg.webp')`, // Adiciona a URL da imagem como plano de fundo
                                backgroundSize: 'cover', // Ajusta o tamanho da imagem para cobrir completamente o elemento
                                backgroundPosition: 'center', // Centraliza a imagem no elemento
                            }}>
                            </Box>
                            <Typography
                      
                                color={theme => theme.palette.text.primary}
                                sx={{
                                    fontWeight: "700", 
                                }}
                            >
                                {user?.name ? `${user.name.split(' ')[0]} ${user.name.split(' ').pop()}` : 'Nome não disponível'}
                            </Typography>
                            <Typography color={theme => theme.palette.text.secondary} variant='subtitle2'>{user?.typeUser}</Typography>
                            <MaterialUISwitch onChange={toggleTheme} defaultChecked={themeName === 'dark'} />
                        </Stack>
                        <Button sx={{color: theme => theme.palette.text.primary, fontWeight: "600"}} startIcon={<LogoutRoundedIcon sx={{color: theme => theme.palette.text.primary}} />} onClick={() => logout(navigate)}>
                            Sair
                        </Button>

                    </Box>




                    {/* menu group 1 */}
                </Box>
            </Animate>
        </Box>
    );
};

export default DrawerContent;