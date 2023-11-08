import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, colors } from '@mui/material';

interface MenuItemProps {
  index: number;
  isActive: boolean;
  item: {
    icon: React.ReactNode;
    title: string;
  };
  to: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  return (
    <ListItem disableGutters disablePadding sx={{ py: 0.8 }}>
      <ListItemButton
        sx={{
          borderRadius: '10px',
          bgcolor: props.isActive ? colors.green[600] : '',
          color: props.isActive ? '#fff' : '#fff',
          textDecoration: 'none',
          '&:hover': {
            bgcolor: props.isActive ? colors.green[600] : '',
            color: props.isActive ? colors.common.white : '',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: '40px',
            color: props.isActive ? colors.common.white : '#fff',
          }}
        >
          {props.item.icon}
        </ListItemIcon>
        <ListItemText primary={<Typography>{props.item.title}</Typography>} />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;