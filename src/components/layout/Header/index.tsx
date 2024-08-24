import { APP_NAME } from '@/config'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { DynamicWidget } from '@/lib/dynamic'

const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: '#008080',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {APP_NAME}
          </Typography>
          <DynamicWidget />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
