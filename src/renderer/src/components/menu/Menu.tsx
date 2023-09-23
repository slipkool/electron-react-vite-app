import React from 'react'
import { Link } from 'react-router-dom'

import { Box, IconButton, Typography, useTheme } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined'
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined'
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

import { menu } from '../../data'

import './menu.scss'

import { tokens } from '../../theme'

type Props = {
  toggleMenu: () => void
  isMenuOpen: boolean
}

const Menu = (props: Props): React.JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const mapIcons = new Map()
  mapIcons.set('home', <HomeIcon />)
  mapIcons.set('user', <PersonOutlineIcon />)
  mapIcons.set('product', <ShoppingCartOutlinedIcon />)
  mapIcons.set('order', <ImportContactsOutlinedIcon />)
  mapIcons.set('post2', <FeedOutlinedIcon />)
  mapIcons.set('element', <DashboardOutlinedIcon />)
  mapIcons.set('note', <NoteAltOutlinedIcon />)
  mapIcons.set('form', <SegmentOutlinedIcon />)
  mapIcons.set('calendar', <CalendarMonthOutlinedIcon />)
  mapIcons.set('setting', <SettingsOutlinedIcon />)
  mapIcons.set('backup', <BackupOutlinedIcon />)
  mapIcons.set('chart', <LeaderboardOutlinedIcon />)
  mapIcons.set('log', <TextSnippetOutlinedIcon />)

  const handleTrigger = (): void => props.toggleMenu()

  return (
    <Box sx={{ bgcolor: colors.primary[400] }}>
      <div className="menu">
        <div className="trigger" onClick={handleTrigger}>
          <IconButton>{props.isMenuOpen ? <ClearOutlinedIcon /> : <MenuOutlinedIcon />}</IconButton>
        </div>

        {menu.map((item) => (
          <div className="item" key={item.id}>
            <Typography variant="h6" color={colors.grey[100]}>
              <span className="title">{item.title}</span>
            </Typography>
            {item.listItems.map((listItem) => (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <IconButton>
                  {mapIcons.has(listItem.icon) ? mapIcons.get(listItem.icon) : <HomeIcon />}
                </IconButton>
                <Typography variant="h6" color={colors.grey[100]}>
                  <span className="listItemTitle">{listItem.title}</span>
                </Typography>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </Box>
  )
}

export default Menu
