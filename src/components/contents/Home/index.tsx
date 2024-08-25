'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useBucketList } from '@/hooks/useBucketList'
import { useCreateBucket } from '@/hooks/useCreateBucket'
import BucketListTable from './BucketListTable'

interface Form {
  name: string
}

const HomeContent: React.FC = () => {
  const { loading: fetchLoading, list, fetchBucketList } = useBucketList()
  const { loading: createLoading, handleCreate } = useCreateBucket()

  const { control, reset, handleSubmit } = useForm<Form>({})

  const [openCreateBucketDialog, setOpenCreateBucketDialog] =
    useState<boolean>(false)

  const submit = async (data: Form) => {
    try {
      await handleCreate({
        bucketName: data.name,
      })
      await fetchBucketList()
      reset()
      setOpenCreateBucketDialog(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Bucket
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Button
            variant="contained"
            disableElevation
            color="success"
            onClick={() => setOpenCreateBucketDialog(true)}
          >
            Create Bucket
          </Button>
          <Dialog
            open={openCreateBucketDialog}
            maxWidth="sm"
            fullWidth
            onClose={() => setOpenCreateBucketDialog(false)}
          >
            <DialogTitle>Create a Bucket</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: { value: true, message: 'Required' },
                  }}
                  render={({ field, formState: { errors } }) => (
                    <TextField
                      {...field}
                      label="name"
                      fullWidth
                      variant="outlined"
                      disabled={createLoading}
                      error={errors.name ? true : false}
                      helperText={errors.name?.message as string}
                    />
                  )}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <LoadingButton
                variant="contained"
                disableElevation
                loading={createLoading}
                onClick={handleSubmit(submit)}
              >
                Create
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid xs={12}>
          {fetchLoading ? (
            <CircularProgress />
          ) : (
            <BucketListTable list={list} fetchBucketList={fetchBucketList} />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default HomeContent
