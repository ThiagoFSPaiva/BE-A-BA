import { Box, Paper, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface MPaperProps {
  title?: string; // Torna a prop "title" opcional
  fullHeight?: boolean;
  children: ReactNode;
}

const MPaper = (props: MPaperProps) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: theme.palette.primary.dark,
        p: 3,
        height: props.fullHeight ? "100%" : "unset",
        border: "1px solid #5a5a5a52",
        overflow: 'auto', // Add this line to enable scrolling
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
    </Paper>
  );
};

export default MPaper;