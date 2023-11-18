import { Box, Paper, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface MPaperProps {
  title?: string;
  fullHeight?: boolean;
  children: ReactNode;
}

const MPaper = (props: MPaperProps) => {
  const theme = useTheme();
  const boxShadow = theme.palette.mode === 'light' ? "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" : 'none';
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        height: props.fullHeight ? "100%" : "unset",
        border: theme.palette.mode === 'dark' ?  "1px solid #5a5a5a52" : 'none',
        boxShadow: boxShadow,
      }}
    >
      {props.title && (
        <Typography variant="body1" fontWeight={600} mb={3}>
          {props.title}
        </Typography>
      )}
      <Box p={3}>
        {props.children}
      </Box>
    </Paper>
  );
};

export default MPaper;