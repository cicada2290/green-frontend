'use client'

import { useRouter } from 'next/navigation'
import {
  Breadcrumbs,
  Button,
  Link,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import ObjectListTable from './ObjectListTable'
import { useObjectList } from '@/hooks/useObjectList'

const BucketContent: React.FC<{ bucketName: string }> = ({ bucketName }) => {
  const router = useRouter()

  const { list } = useObjectList(bucketName)

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Breadcrumbs>
          <Link underline="hover" color="inherit" href="/">
            Bucket
          </Link>
          <Typography color="text.primary">{bucketName}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          My Notes
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Button
          variant="contained"
          disableElevation
          sx={{ mb: 2 }}
          onClick={() => router.push(`/bucket/${bucketName}/create`)}
        >
          Create Note
        </Button>
      </Grid>
      <Grid xs={12}>
        <ObjectListTable list={list} />
      </Grid>
    </Grid>
  )
}

export default BucketContent
