import React, { useState } from 'react';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography, colors,useTheme, useMediaQuery } from '@mui/material';
import { images } from "../../assets";
import { Animate } from "./Animate";
import { Link } from "react-router-dom";
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';


const menus = [
  {
    title: "Dashboard",
    icon: <DashboardCustomizeOutlinedIcon />,
    state: "/dashboard",
    path: "dashboard"
  },
  {
    title: "Meus templates",
    icon: <TableChartOutlinedIcon />,
    state: "/templates",
    path: "templates"
  },
  {
    title: "Uploads",
    icon: <UploadFileOutlinedIcon />,
    state: "/uploads",
    path: "uploads"
  }
];

const menuAdmin = [
  {
    title: "Gerenciar Templates",
    icon: <BackupTableOutlinedIcon />,
    state: "/gerenciar-templates",
    path: "gerenciar-templates"
  },
  {
    title: "Usuários",
    icon: <PersonOutlineOutlinedIcon />,
    state: "/usuarios",
    path: "usuarios"
  },
];


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  sidebarWidth: number;
  window?: () => Window;
}

interface MenuItemProps {
  index: number;
  isActive: boolean;
  item: {
    icon: React.ReactNode;
    title: string;
  };
  to: string;
}



const MenuItem = (props: MenuItemProps) => {
  return (
    <ListItem key={props.index} disableGutters disablePadding sx={{ py: 0.8 }}>
      <ListItemButton sx={{
        borderRadius: "10px",
        bgcolor: props.isActive ? colors.green[600] : "",
        color: props.isActive ? "#fff" : "#fff",
        textDecoration:"none",
        "&:hover": {
          bgcolor: props.isActive ? colors.green[600] : "",
          color: props.isActive ? colors.common.white : "",
        }
      }}>
        <ListItemIcon sx={{
          minWidth: "40px",
          color: props.isActive ? colors.common.white : "#fff"
        }}>
          {props.item.icon}
        </ListItemIcon>
        <ListItemText primary={
          <Typography>
            {props.item.title}
          </Typography>
        } />
      </ListItemButton>
    </ListItem>
  );
};


export default function ResponsiveDrawer(props: Props) {
  const activeState = location.pathname;
  const {user} = useGlobalReducer();
  const isMobile = useMediaQuery('(max-width: 600px)');
  
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
      <Box
      padding={isMobile ? 0 : 3}
      paddingTop={isMobile? 3 : ""}
      paddingBottom={0}
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        }
      }}
    >
      {/* logo */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
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
            backgroundColor: "black",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            p: 2,
            height: "100%",
            border: "1px solid #5a5a5a52"
          }}
        >
          {/* menu group 1 */}
          <List>
            {menus.map((item,index) => (
              <Link to={`/${item.path}`}  key={item.state}>
                <MenuItem
                  index= {index}
                  to={item.path}
                  item={item}
                  isActive={item.state === activeState}
                /> 
              </Link>
            ))}
          </List>
          
          {/* menu group 2 */}
          <List>
            
            {menuAdmin.map((item,index) => (
              <Link to={`/${item.path}`} key={item.state}>
                <MenuItem
                  index= {index}
                  to={item.path}
                  item={item}
                  isActive={item.state === activeState}
                />  
              </Link>
              ))}
           
          </List>
        </Paper>
      </Animate>
    </Box>
  )


  return (
    <>
    
    
    
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${props.sidebarWidth}px)` },
          ml: { sm: `${props.sidebarWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{color: "black"}}>
            {user?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: props.sidebarWidth }, flexShrink: { sm: 0 }, p: 0}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            p: 0,
            display: { xs: 'block', sm: 'none' },
            "& .MuiDrawer-paper": {
              padding: 0,
              boxSizing: "border-box",
              width: 300,
              borderWidth: 0,
              bgcolor: "black",
              "::-webkit-scrollbar": {
                display: "none"
              }
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: props.sidebarWidth,
              borderWidth: 0,
              bgcolor: "transparent",
              "::-webkit-scrollbar": {
                display: "none"
              }
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
      
  );
}

