import { Box, Paper, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface MPaperProps {
  title?: string;
  fullHeight?: boolean;
  children: ReactNode;
}

const MPaper = (props: MPaperProps) => {
  const theme = useTheme();
  return (
    <Paper

      sx={{
        bgcolor: theme.palette.primary.dark,
        height: props.fullHeight ? "100%" : "unset",
        border: "1px solid #5a5a5a52",
        boxShadow: theme.palette.primary.light ? '0px 3px 6px rgba(0, 0, 0, 0.1)' : 'none',
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