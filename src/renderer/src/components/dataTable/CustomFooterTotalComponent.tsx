import { Box } from '@mui/material'
import { DatagridFooterTotalProps } from '@renderer/app/props/props'
import React from 'react'

const CustomFooterTotalComponent = (props: DatagridFooterTotalProps): React.JSX.Element => {
  return (
    <Box sx={{ padding: '10px', display: 'flex', fontSize: '15px' }}>
      Total : {new Intl.NumberFormat().format(props.total)}
    </Box>
  )
}

export default CustomFooterTotalComponent
