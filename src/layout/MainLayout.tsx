import { Box } from '@mui/material';
import React from 'react';
import Sidebar from '../components/common//Sidebar';
import { Outlet } from 'react-router-dom';
import {Perfil} from '../components/common/Perfil';

const sidebarWidth = 350;

const MainLayout = () => {
  return (
    
      <Box display="flex" bgcolor="primary">
        {/* sidebar */}
        <Sidebar sidebarWidth={sidebarWidth} />
        {/* sidebar */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            paddingLeft: 3,
            paddingRight: 3,
            height: "100vh",
            width: { sm: `calc(100% - ${sidebarWidth}px)` }
          }}
        >
          <Outlet />
        </Box>
      </Box>
   
  );
};

export default MainLayout;