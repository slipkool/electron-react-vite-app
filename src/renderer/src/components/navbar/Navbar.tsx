import React, { useContext } from 'react'

import './navbar.scss'

//imports icons
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CropFreeIcon from '@mui/icons-material/CropFree'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import PetsIcon from '@mui/icons-material/Pets'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

//import image
import logo from '../../assets/images/logo.png'
import img from '../../assets/images/user.png'

import { ColorModeContext, tokens } from '../../theme'

const Navbar = (): React.JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)

  return (
    <Box sx={{ bgcolor: colors.primary[400] }}>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <Typography variant="h4" color={colors.grey[100]}>
            <span>lamadmin</span>
          </Typography>
        </div>
        <div className="icons">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          <IconButton>
            <SearchIcon className="icon" />
          </IconButton>
          <IconButton>
            <PetsIcon className="icon" />
          </IconButton>
          <IconButton>
            <CropFreeIcon className="icon" />
          </IconButton>
          <IconButton>
            <div className="notification">
              <NotificationsIcon />
              <span>1</span>
            </div>
          </IconButton>
          <div className="user">
            <img src={img} alt="" />
            <Typography variant="h4" color={colors.grey[100]}>
              <span>Jane</span>
            </Typography>
          </div>
          <IconButton>
            <SettingsIcon className="icon" />
          </IconButton>
        </div>
      </div>
    </Box>
  )
}

export default Navbar
