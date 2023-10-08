import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'
import Home from './pages/home/Home'
import Clients from './pages/users/Clients'
import Products from './pages/products/Products'
import DefaultLayout from './Layout/DefaultLayout'
import Login from './pages/login/Login'
import OrderList from './pages/order/order-list/OrderList'
import OrderForm from './pages/order/order-form/OrderForm'

import './assets/styles/index.scss'

const App = (): React.JSX.Element => {
  const [theme, colorMode] = useMode()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/clients',
          element: <Clients />
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: '/orders',
          element: <OrderList />
        },
        {
          path: '/orders/add',
          element: <OrderForm />
        },
        {
          path: '/orders/:id',
          element: <OrderForm />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    }
  ])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
