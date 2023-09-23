import { Box } from '@mui/material'
import { DatagridFooterTotalProps } from '@renderer/types/types'
import React from 'react'

const CustomFooterTotalComponent = (props: DatagridFooterTotalProps): React.JSX.Element => {
  return (
    <Box sx={{ padding: '10px', display: 'flex' }}>
      Total : {new Intl.NumberFormat().format(props.total)}
    </Box>
  )
}

export default CustomFooterTotalComponent
