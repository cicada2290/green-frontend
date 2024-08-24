'use client'

import { useState } from 'react'
import { unixtimeToDate, convertBytes } from '@/util'
import {
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useBucketList } from '@/hooks/useBucketList'

const HomeContent: React.FC = () => {
  const { list, loading } = useBucketList()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bucket Name</TableCell>
              <TableCell>Bucket Size</TableCell>
              <TableCell>Data Updated</TableCell>
              <TableCell>Data Created</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow key={row.createTxHash}>
                <TableCell component="th" scope="row">
                  {row.bucketInfo.bucketName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {convertBytes(row.storageSize)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {unixtimeToDate(row.updateTime)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {unixtimeToDate(row.bucketInfo.createAt)}
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem>View Details</MenuItem>
                    <MenuItem>Share</MenuItem>
                    <MenuItem sx={{ color: 'red' }}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default HomeContent
