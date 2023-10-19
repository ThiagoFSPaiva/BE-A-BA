import { Box, LinearProgress, Stack, Typography, colors, linearProgressClasses, useTheme } from '@mui/material';
import MPaper from './MPaper';

const bookedData = [
  {
    title: "xls",
    value: 1000,
    percent: 30,
    color: colors.yellow[600]
  },
  {
    title: "Xlsx",
    value: 100,
    percent: 10,
    color: colors.red[600]
  },
  {
    title: "csv",
    value: 2800,
    percent: 70,
    color: colors.green[600]
  }
];

const BookedData = () => {

  const theme = useTheme();

  return (
    <MPaper>
      <Typography marginBottom={2} color={theme.palette.primary.contrastText}>
        Templates
      </Typography>
      <Stack spacing={6}>
        {bookedData.map((data, index) => (
          <Stack spacing={1} key={index}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" fontWeight="600" color={theme.palette.primary.contrastText}>{data.title}</Typography>
              <Typography variant="caption" color={data.color} fontWeight="600">{data.value}</Typography>
            </Stack>
            <Box>
              <LinearProgress
                variant="determinate"
                value={data.percent}
                sx={{
                  bgcolor: colors.grey[200],
                  height: 10,
                  borderRadius: 5,
                  [`& .${linearProgressClasses.bar}`]: {
                    borderRadius: 5,
                    bgcolor: data.color
                  }
                }}
              />
            </Box>
          </Stack>
        ))}
      </Stack>
    </MPaper>
  );
};

export default BookedData;
