import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import LandingPage from './pages/LandingPage';
import SingleProduct from './components/SingleProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UploadProduct from './components/UploadProduct';
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 100000, // for overall the scope for quries
        refetchOnWindowFocus: false
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/upload-product" element={<UploadProduct />} />
          <Route path="/products/product/:id" element={<SingleProduct />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
