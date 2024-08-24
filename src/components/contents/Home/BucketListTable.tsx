'use client'

import { GREEBFIELD_SCAN_URL } from '@/config'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import MoreVertIcon from '@mui/icons-material/MoreVert'
import type { Bucket } from '@/hooks/useBucketList'

const BucketListTable: React.FC<{ list: Bucket[] }> = ({ list }) => {
  const router = useRouter()

  const [bucket, setBucket] = useState<Bucket | null>(null)

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // ウインドウタブを新規で開いて、URLに遷移する関数
  const handleOpenTab = (url: string) => {
    window.open(url, '_blank')
  }

  return (
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
                  <MenuItem
                    onClick={() => {
                      setBucket(row)
                      setDrawerOpen(true)
                      handleClose()
                    }}
                  >
                    View Details
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      router.push(`/bucket/${row.bucketInfo.bucketName}`)
                    }
                  >
                    Edit
                  </MenuItem>
                  <MenuItem>Share</MenuItem>
                  <MenuItem sx={{ color: 'red' }}>Delete</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Drawer
        open={drawerOpen}
        anchor="right"
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ mx: 4, my: 2, textAlign: 'left' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Bucket Detail
          </Typography>
          <List>
            <ListItem sx={{ px: 0 }}>
              <Grid spacing={2}>
                <Grid xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: 'gray' }}>
                      Bucket Name
                    </Typography>
                    <Typography variant="body1">
                      {bucket?.bucketInfo.bucketName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: 'gray' }}>
                      Bucket ID
                    </Typography>
                    <Typography variant="body1">
                      <Link
                        rel="noopener"
                        target="_blank"
                        href={`${GREEBFIELD_SCAN_URL}/bucket/${toHex32(Number(bucket?.bucketInfo.id) || 0)}`}
                      >
                        {shortenHex(
                          toHex32(Number(bucket?.bucketInfo.id) || 0),
                          10
                        )}
                      </Link>
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: 'gray' }}>
                      Payment address
                    </Typography>
                    <Typography variant="body1">
                      <Link
                        rel="noopener"
                        target="_blank"
                        href={`${GREEBFIELD_SCAN_URL}/account/${bucket?.bucketInfo.paymentAddress}`}
                      >
                        {shortenHex(
                          bucket?.bucketInfo.paymentAddress || '',
                          10
                        )}
                      </Link>
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: 'gray' }}>
                      Create transaction hash
                    </Typography>
                    <Typography variant="body1">
                      <Link
                        rel="noopener"
                        target="_blank"
                        href={`${GREEBFIELD_SCAN_URL}/tx/${bucket?.createTxHash}`}
                      >
                        {shortenHex(bucket?.createTxHash || '', 10)}
                      </Link>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </TableContainer>
  )
}

export default BucketListTable
