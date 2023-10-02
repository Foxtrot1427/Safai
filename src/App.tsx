import Provider from '@rsces/providers/index';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}

export default App;
