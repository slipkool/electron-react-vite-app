import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'
import Home from './pages/home/Home'
import Users from './pages/users/Users'
import Products from './pages/products/Products'
import User from './pages/user/User'
import DefaultLayout from './Layout/DefaultLayout'
import Login from './pages/login/Login'

import './assets/styles/index.scss'
import Orders from './pages/orders/Orders'

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
          path: '/users',
          element: <Users />
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: '/orders',
          element: <Orders />
        },
        {
          path: '/users/:id',
          element: <User />
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
