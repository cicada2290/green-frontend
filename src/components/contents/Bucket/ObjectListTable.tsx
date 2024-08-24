import { unixtimeToDate, convertBytes, toHex32, shortenHex } from '@/util'
import {
  Box,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  List,
  ListItem,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'

const ObjectListTable: React.FC<{ list: any[] }> = ({ list }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Data Updated</TableCell>
            <TableCell>Data Created</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {list.map((row) => (
          <TableRow key={row.createTxHash}>
            <TableCell component="th" scope="row">
              {row.objectInfo.objectName}
            </TableCell>
            <TableCell component="th" scope="row">
              {unixtimeToDate(row.updateAt)}
            </TableCell>
            <TableCell component="th" scope="row">
              {unixtimeToDate(row.objectInfo.createAt)}
            </TableCell>
            <TableCell component="th" scope="row">
              xxx
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ObjectListTable
