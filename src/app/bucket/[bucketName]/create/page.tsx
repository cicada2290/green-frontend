'use client'

import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import {
  Box,
  Breadcrumbs,
  Link,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useUploadObject } from '@/hooks/useUploadObject'

interface Form {
  name: string
  note: string
}

const BucketCreate: React.FC<{ params: { bucketName: string } }> = ({
  params,
}) => {
  const router = useRouter()
  const { handleUpload, loading } = useUploadObject()
  const { control, handleSubmit } = useForm<Form>({})

  const submit = async (data: Form) => {
    try {
      await handleUpload({
        bucketName: params.bucketName,
        filename: data.name,
        text: data.note,
      })

      router.push(`/bucket/${params.bucketName}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Breadcrumbs>
          <Link underline="hover" color="inherit" href="/">
            Bucket
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href={`/bucket/${params.bucketName}`}
          >
            {params.bucketName}
          </Link>
          <Typography color="text.primary">Create Note</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Create Note
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Box component="form" onSubmit={handleSubmit(submit)}>
          <LoadingButton
            variant="contained"
            disableElevation
            sx={{ mb: 2 }}
            type="submit"
            loading={loading}
          >
            Create
          </LoadingButton>
          <Box sx={{ mb: 2 }}>
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
                  error={errors.name ? true : false}
                  helperText={errors.name?.message as string}
                />
              )}
            />
          </Box>
          <Box>
            <Controller
              name="note"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: 'Required' },
              }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  {...field}
                  label="Note"
                  fullWidth
                  rows={15}
                  multiline
                  variant="outlined"
                  error={errors.note ? true : false}
                  helperText={errors.note?.message as string}
                />
              )}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default BucketCreate
