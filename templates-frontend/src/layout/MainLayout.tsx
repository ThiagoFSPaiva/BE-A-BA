import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/sidebar/Sidebar';

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
            px: 3,
            paddingBottom: 3,
            maxWidth: "1200px",
            margin: "auto",
            width: { sm: `calc(100% - ${sidebarWidth}px)` },
            marginTop: "100px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
   
  );
};

export default MainLayout;