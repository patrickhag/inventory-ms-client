import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Category from './pages/Category'
import { CategoryProvider } from './utils/categoryContext'
import PrivateRoute from './utils/PrivateRoute'
import Product from './pages/Product'
import SupplierDashboard from './pages/SupplierDashboard'
import { ProductProvider } from './utils/productContext'

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/admin-dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/category'
            element={
              <PrivateRoute>
                <CategoryProvider>
                  <Category />
                </CategoryProvider>
              </PrivateRoute>
            }
          />
          <Route
            path='/supplier-dashboard'
            element={
              <PrivateRoute>
                <SupplierDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/s-product'
            element={
              <PrivateRoute>
                <ProductProvider>
                  <Product />
                </ProductProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
