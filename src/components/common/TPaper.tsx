import { Box, Paper, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface MPaperProps {
  title?: string; // Torna a prop "title" opcional
  fullHeight?: boolean;
  children: ReactNode;
}

const TPaper = (props: MPaperProps) => {
  const theme = useTheme();

  const boxShadow = theme.palette.mode === 'light' ? "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" : 'none';
  return (
    <Box

      sx={{
        bgcolor: theme.palette.background.paper,
        height: props.fullHeight ? "100%" : "unset",
        overflow: "auto",
        borderRadius: "10px",
        border: theme.palette.mode === 'dark' ?  "1px solid #5a5a5a52" : 'none',
        boxShadow: boxShadow,
      }}
    >
      {props.title && (
        <Typography variant="body1" fontWeight={600} mb={3}>
          {props.title}
        </Typography>
      )}
      <Box>
        {props.children}
      </Box>
    </Box>
  );
};

export default TPaper;