import React from 'react';
import { images } from "../../assets";
import { Box, Grid, Stack, Typography, colors,useTheme } from '@mui/material';
import {Animate} from "./Animate";
import MPaper from './MPaper';

const summaryData = [
  {
    title: "Templates cadastrados",
    value: "714k",
    image: images.summaryImages.totalBook
  },
  {
    title: "Uploads realizados",
    value: "311k",
    image: images.summaryImages.sold
  },
  {
    title: "Total de usuários",
    value: "333",
    image: images.summaryImages.cancel
  }
];

const SummaryGrid = () => {

  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {summaryData.map((summary, index) => (
        <Grid key={index} item xs={12} lg={4}>
          <Animate type="fade" delay={(index + 1) / 3}>
            <MPaper>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack spacing={1}>
                  <Typography variant="h4" color={theme.palette.primary.contrastText} fontWeight="bold">
                    {summary.value}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color={theme.palette.primary.textColor}>
                    {summary.title}
                  </Typography>
                </Stack>
                <Box sx={{
                  height: "100px",
                  width: "100px",
                  "& img": { width: "100%" }
                }}>
                  <img src={summary.image} alt="summary" />
                </Box>
              </Stack>
            </MPaper>
          </Animate>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryGrid;