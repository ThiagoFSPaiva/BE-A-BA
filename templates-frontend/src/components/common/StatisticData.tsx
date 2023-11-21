import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import MPaper from './MPaper';
import { useRequests } from '../../shared/hooks/useRequests';
import { MethodsEnum } from '../../shared/enums/methods.enum';


interface DataItem {
  dia_mes: string;
  extensao: string;
  quantidade: number;
}


const LegendItem: React.FC<{ label: string; backgroundColor: string }> = ({ label, backgroundColor }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Box
        sx={{
          width: '15px',
          height: '15px',
          borderRadius: '4px',
          bgcolor: backgroundColor,
          mr: 1,
        }}
      />
      <Typography variant="subtitle2">{label}</Typography>
    </Stack>
  );
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
      stacked: true,
    },
    y: { stacked: true },
  },
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
};

interface GroupedData {
  [key: string]: { [key: string]: number };
}

const StatisticData: React.FC = () => {
  const theme = useTheme();
  const { request } = useRequests();
  const [data, setData] = useState<DataItem[]>([])
  const [selectedOption, setSelectedOption] = useState('7');


  useEffect(() => {
    const url = `http://localhost:5000/consulta_dados/${selectedOption}`;
    request(url, MethodsEnum.GET, setData)
  }, [selectedOption]);

  const groupedData: GroupedData = {};

  data.forEach((item) => {
    if (!groupedData[item.dia_mes]) {
      groupedData[item.dia_mes] = {};
    }

    groupedData[item.dia_mes][item.extensao] = item.quantidade;
  });

  const backgroundColors: Record<string, string[]> = {
    csv: ["#14dd1c"],
    xls: ["#105B35"],
    xlsx: ["#43a047"],
  };


  return (
    <MPaper>
      <Stack direction="row" spacing={2} mb={2} alignItems="center">

        <Typography color={theme.palette.primary.contrastText}>
          Templates
        </Typography>

        <Select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <MenuItem value="1">Ultimas 24hrs</MenuItem>
          <MenuItem value="7">Esta semana</MenuItem>
          <MenuItem value="30">Este mês</MenuItem>
        </Select>
      </Stack>

      <Stack spacing={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">


          <Stack direction="row" spacing={3} alignItems="center">
            <LegendItem label="csv" backgroundColor="#14dd1c" />
            <LegendItem label="xls" backgroundColor="#105B35" />
            <LegendItem label="xlsx" backgroundColor="#43a047" />

          </Stack>

        </Stack>
        {/* bar chart */}
        <Box>
          <Bar
            data={{
              labels: Object.keys(groupedData),
              datasets: Object.keys(data.reduce((acc, item) => ({ ...acc, [item.extensao]: true }), {})).map((extensao) => ({
                label: extensao,
                data: Object.keys(groupedData).map((dia_mes) => groupedData[dia_mes][extensao] || 0),
                stack: `stack ${Object.keys(backgroundColors).indexOf(extensao)}`,
                backgroundColor: backgroundColors[extensao][0],
                barPercentage: 0.6,
                categoryPercentage: 0.7,
              })),

            }}
            options={chartOptions}


          />
        </Box>
        {/* bar chart */}
      </Stack>
    </MPaper>
  );
};

export default StatisticData;