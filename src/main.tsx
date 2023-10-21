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
import { DataProvider } from './shared/hooks/useDataContext.tsx';
import { Provider } from 'react-redux'
import { store } from './store/index.ts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <GlobalProvider>
      <DataProvider>
        <ThemeProvider theme={Dark}>
          <App/>
        </ThemeProvider>
      </DataProvider>
    </GlobalProvider>
  </Provider>
)
