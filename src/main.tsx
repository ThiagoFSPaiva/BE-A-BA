import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import App from './App.tsx'
import {ThemeProvider } from "@mui/material";
import { Dark } from './themes';
import { GlobalProvider } from './shared/hooks/useGlobalContext.tsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
        <ThemeProvider theme={Dark}>
          <App/>
        </ThemeProvider>
    </GlobalProvider>
  </React.StrictMode>
)
