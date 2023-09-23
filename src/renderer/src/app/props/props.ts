import { GridColDef } from '@mui/x-data-grid'
import { Order } from '../models/order.model'

export type AddProps = {
  slug: string
  columns: GridColDef[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  saveEvent: () => void
  order?: Order
}

export type DatagridProps = {
  columns: GridColDef[]
  rows: object[]
  slug: string
  disableToolbar: boolean
  disableViewAction: boolean
  disableFooterTotalBar: boolean
  total?: number
  deleteEvent?: (id: number) => void
  viewEvent?: (id: number) => void
}

export type DatagridFooterTotalProps = {
  total: number
}
