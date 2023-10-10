import { GridColDef } from '@mui/x-data-grid'

export type AddProps<T> = {
  slug?: string
  columns?: GridColDef[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  saveEvent: () => void
  editObject: T | undefined | null
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
