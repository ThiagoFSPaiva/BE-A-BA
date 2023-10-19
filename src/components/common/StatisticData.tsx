import React from 'react';
import MPaper from './MPaper';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { Bar } from 'react-chartjs-2';


const dataFromDatabase = [
  { mes: '2023-01', extensao: 'xls' },
  { mes: '2023-01', extensao: 'xlsx' },
  { mes: '2023-02', extensao: 'csv' },
  { mes: '2023-02', extensao: 'xls' },
  { mes: '2023-03', extensao: 'csv' },
];

const chartData = {
  labels: ["Semana","Feb", "Mar", "Apr", "May", "Semana"],
  datasets: [
    {
      label: "xls",
      data: [100, 0],
      stack: "stack 0",
      backgroundColor: "#105B35",
      barPercentage: 0.6,
      categoryPercentage: 0.7
    },
    {
      label: "xlsx",
      data: [0],
      stack: "stack 1",
      backgroundColor: "#43a047",
      barPercentage: 0.6,
      categoryPercentage: 0.7
    },
    {
        label: "csv",
        data: [0],
        stack: "stack 2",
        backgroundColor: "#14dd1c",
        barPercentage: 0.6,
        categoryPercentage: 0.7
      }
  ]
};

const charOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
      stacked: true
    },
    y: { stacked: true }
  },
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  elements: {
    bar: {
      borderRadius: 10
    }
  }
};
export const StatisticData = () => {
    const theme = useTheme();
  return (
    <MPaper>
        <Typography marginBottom={2} color={theme.palette.primary.contrastText}>
            Templates
        </Typography>
      <Stack spacing={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={3} alignItems="center">
            {chartData.datasets.map((data, index) => (
              <Stack key={index} direction="row" alignItems="center">
                <Box sx={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "4px",
                  bgcolor: data.backgroundColor,
                  mr: 1
                }} />
                <Typography variant="subtitle2" color={theme.palette.primary.contrastText}>
                  {data.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
        {/* bar chart */}
        <Box>
          <Bar options={charOptions} data={chartData} height="300px" />
        </Box>
        {/* bar chart */}
      </Stack>
    </MPaper>
  );
};