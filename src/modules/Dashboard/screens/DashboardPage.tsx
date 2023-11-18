import { Grid, useTheme } from '@mui/material';
import SummaryGrid from '../../../components/common/SummaryGrid';
import { Animate } from '../../../components/common/Animate';
import { Header } from '../../../components/common/Header';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import StatisticData from '../../../components/common/StatisticData';


const DashboardPage = () => {
  const theme = useTheme();


  return (

    <>
      <Header
        title="Dashboard"
        description="Visualize e gerencie todos templates, podendo ativar ou desativar cada um."
        icon={<DashboardCustomizeOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />
        }>
      </Header>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SummaryGrid />
        </Grid>
        <Grid item xs={12} md={6} lg={7} paddingBottom={2}>
          <Animate delay={0.5}>
            <StatisticData />
          </Animate>
        </Grid>
      </Grid>

    </>



  );
};

export default DashboardPage;