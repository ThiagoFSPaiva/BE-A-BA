import React, { useState } from 'react';
import { Box, Drawer } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import DrawerContent from './DrawerContent';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import AppHeader from './AppHeader';

interface Props {
  sidebarWidth: number;
}

const ResponsiveDrawer: React.FC<Props> = (props) => {
  const activeState = location.pathname;
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menus = [
    {
      title: 'Meus templates',
      icon: <TableChartOutlinedIcon />,
      state: '/templates',
      path: 'templates',
    },
  ];

  const menuAdmin = [
    {
      title: 'Dashboard',
      icon: <DashboardCustomizeOutlinedIcon />,
      state: '/dashboard',
      path: 'dashboard',
    },
    {
      title: 'Uploads',
      icon: <UploadFileOutlinedIcon />,
      state: '/uploads',
      path: 'uploads',
    },
    {
      title: 'Gerenciar Templates',
      icon: <BackupTableOutlinedIcon />,
      state: '/templates/gerenciar',
      path: 'templates/gerenciar',
    },
    {
      title: 'Usuários',
      icon: <PersonOutlineOutlinedIcon />,
      state: '/usuarios',
      path: 'usuarios',
    },
    {
      title: 'Categorias',
      icon: <LayersOutlinedIcon />,
      state: '/category',
      path: 'category',
    },
  ];

  const drawer = (
    <DrawerContent menus={menus} menuAdmin={menuAdmin} activeState={activeState} isMobile={isMobile} />
  );

  return (
    <>
      <AppHeader sidebarWidth={props.sidebarWidth} handleDrawerToggle={handleDrawerToggle} isMobile={isMobile}/>
      <Box
        component="nav"
        sx={{ width: { sm: props.sidebarWidth }, flexShrink: { sm: 0 }, p: 0 }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            p: 0,
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              padding: 0,
              boxSizing: 'border-box',
              width: 300,
              backgroundImage: "none",
              borderWidth: 0,
              bgcolor: theme => theme.palette.background.paper,
              '::-webkit-scrollbar': {
                display: 'none',
              },
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: props.sidebarWidth,
              borderWidth: 0,
              bgcolor: 'transparent',
              '::-webkit-scrollbar': {
                display: 'none',
              },
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default ResponsiveDrawer;