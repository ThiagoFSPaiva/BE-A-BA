import { useEffect, useState } from 'react';
import { images } from "../../assets";
import { Box, Grid, Stack, Typography,useTheme } from '@mui/material';
import {Animate} from "./Animate";
import MPaper from './MPaper';
import { useRequests } from '../../shared/hooks/useRequests';
import { MethodsEnum } from '../../shared/enums/methods.enum';


type TotalType = {
  total_templates?: string;
  total_uploads?: string;
  total_users?: string;
};

const SummaryGrid = () => {

  const theme = useTheme();
  const { request } = useRequests();
  const [total, setTotal] = useState<TotalType>({});

  useEffect(() => {
    	request("http://localhost:5000/totals",MethodsEnum.GET,setTotal)
  },[])


  const summaryData = [
    {
      title: "Templates cadastrados",
      value: total.total_templates,
      image: images.summaryImages.totalBook
    },
    {
      title: "Uploads realizados",
      value: total.total_uploads,
      image: images.summaryImages.sold
    },
    {
      title: "Total de usuários",
      value: total.total_users,
      image: images.summaryImages.cancel
    }
  ];

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