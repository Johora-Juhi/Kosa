import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes';
import 'animate.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <RouterProvider router={routes}>
        </RouterProvider>
      </Provider>
    </>
  );
}

export default App;
