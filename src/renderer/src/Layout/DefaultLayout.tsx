import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, useTheme } from '@mui/material'
import Footer from '@renderer/components/footer/Footer'
import Menu from '@renderer/components/menu/Menu'
import Navbar from '@renderer/components/navbar/Navbar'

import { tokens } from '../theme'

const DefaultLayout = (): React.JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen)

  return (
    <Box sx={{ bgcolor: colors.primary[400] }}>
      <div className="main">
        <Navbar />
        <div className="container">
          <div className={`menuContainer ${!isMenuOpen ? 'sidebar--close' : ''}`}>
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </Box>
  )
}

export default DefaultLayout
