import React from 'react'
import { Box, IconButton, Typography, useTheme } from '@mui/material'

import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'

import './top.scss'

import video from '../../../assets/videos/video.mp4'
import img from '../../../assets/images/pets.png'

import { tokens } from '../../../theme'

const Top = (): React.JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const sxPropCSS = {
    position: 'relative',
    padding: '1rem',
    height: '200px',
    borderRadius: '1rem',
    justifyContent: 'space-between',
    bgcolor: colors.primary[400],
    display: 'flex',
    alignItems: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      height: '100%',
      width: '75%',
      left: 0,
      bottom: 0,
      borderRadius: '1rem',
      bgcolor: colors.blueAccent[800]
    }
  }

  return (
    <Box sx={{ bgcolor: colors.primary[400] }}>
      <div className="topSection">
        <div className="cardSection flex">
          <div className="rightCard flex">
            <h1>Create and sell extraordinary products</h1>
            <p>The world`s fast growing industry today are natural made products!</p>

            <div className="buttons flex">
              <button className="btn">Explore more</button>
              <button className="btn transparent">Top Sellers</button>
            </div>

            <div className="videoDiv">
              <video src={video} autoPlay loop muted></video>
            </div>
          </div>

          <div className="leftCard flex">
            <div className="main flex">
              <Box sx={sxPropCSS}>
                <div className="textDiv">
                  <h1>My Stat</h1>

                  <div className="flex">
                    <span>
                      <Typography color={colors.grey[100]}>
                        Today <br />{' '}
                      </Typography>
                      <small>
                        <Typography color={colors.grey[400]}>4 orders</Typography>
                      </small>
                    </span>
                    <span>
                      <Typography color={colors.grey[100]}>
                        This month <br />{' '}
                      </Typography>
                      <small>
                        <Typography color={colors.grey[400]}>175 orders</Typography>
                      </small>
                    </span>
                  </div>

                  <span className="flex link">
                    <Typography color={colors.grey[100]}>Go to my orders </Typography>
                    <IconButton>
                      <ArrowRightAltOutlinedIcon className="icon" />
                    </IconButton>
                  </span>
                </div>

                <div className="imgDiv">
                  <img src={img} alt="Image name" />
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default Top
