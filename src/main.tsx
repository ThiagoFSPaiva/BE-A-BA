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
import { Provider } from 'react-redux'
import { store } from './store/index.ts';
import { AppThemeProvider } from './shared/contexts';
import Swal from 'sweetalert2'
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
        <AppThemeProvider>
          <App/>
        </AppThemeProvider>
  </Provider>
)
