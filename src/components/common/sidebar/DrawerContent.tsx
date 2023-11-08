import { Box, Paper, List, Button } from '@mui/material';
import { Animate } from '../Animate';
import { images } from '../../../assets';
import MenuItem from './MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfoByToken, logout } from '../../../shared/functions/connection/auth';
import { UserTypeEnum } from '../../../shared/enums/userType.enum';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

interface DrawerContentProps {
    menus: any[];
    menuAdmin: any[];
    activeState: string;
    isMobile: boolean;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ menus, menuAdmin, activeState, isMobile }) => {

    const user = getUserInfoByToken();
    const navigate = useNavigate();

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
                <Paper
                    elevation={0}
                    square
                    sx={{
                        backgroundColor: '#202125',
                        borderTopRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                        p: 2,
                        height: '100%',
                        border: '1px solid #5a5a5a52',
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


                        <Button startIcon={<LogoutRoundedIcon />} onClick={() => logout(navigate)}>
                            Deslogar
                        </Button>

                    </Box>
                    {/* menu group 1 */}
                </Paper>
            </Animate>
        </Box>
    );
};

export default DrawerContent;