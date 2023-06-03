import { Routes, Route, Navigate } from 'react-router-dom';

import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

export const App = () => (
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/home' element={<Navigate to='/' replace />} />

    <Route path='/productInfo/:productId' element={<ProductPage />} />

    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);
