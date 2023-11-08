import React, { useState } from 'react';
import { AppBar, Box, CssBaseline, IconButton, Menu, MenuItem, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { logout } from '../../../shared/functions/connection/auth';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
    sidebarWidth: number;
    handleDrawerToggle: () => void;
    isMobile: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ sidebarWidth, handleDrawerToggle, isMobile }) => {
    const { user } = useGlobalReducer();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
            <CssBaseline />
            {isMobile && (
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${sidebarWidth}px)` },
                    ml: { sm: `${sidebarWidth}px` },
                    background: '#2b2c2f',
         
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', p: 2 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
  
                    <Box
                        onClick={handleClick}
                        sx={{
                            backgroundColor: 'green',
                            borderRadius: '50%',
                            width: 45,
                            height: 45,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            fontSize: '1.5rem'
                        }}
                    >
                        {user?.name[0]}
                    </Box>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Option 1</MenuItem>
                        <MenuItem onClick={() => logout(navigate)}>Option 2</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
                  )}
        </>
    );
};

export default AppHeader;