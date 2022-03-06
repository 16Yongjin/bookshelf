import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Input,
  InputAdornment,
  Snackbar,
} from '@mui/material'
import React from 'react'
import { useCopyToClipboard } from 'react-use'

interface ShareUrlModalProps {
  url: string
  activator: JSX.Element
}

export const ShareUrlModal: React.FC<ShareUrlModalProps> = ({
  url,
  activator,
}) => {
  // 다이얼로그 상태
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const openDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)

  // 스낵바 상태
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const openSnackbar = () => setSnackbarOpen(true)
  const closeSnackbar = () => setSnackbarOpen(false)

  // 로직
  const [_isCopid, setCopy] = useCopyToClipboard()
  const host = `${window.location.protocol}//${window.location.host}`
  const embedURL = `${host}/${url}`
  const copy = () => (openSnackbar(), setCopy(embedURL))

  return (
    <>
      <span onClick={openDialog}>{activator}</span>

      <Dialog onClose={closeDialog} open={dialogOpen}>
        <DialogTitle>공유</DialogTitle>

        <Box sx={{ p: 2.5, pt: 3, width: 600, height: 72 }}>
          <InputAdornment position="end">
            <Input readOnly value={embedURL} sx={{ width: '100%' }} />
            <Button onClick={copy}>복사</Button>
          </InputAdornment>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        onClose={closeSnackbar}
        autoHideDuration={3000}
        message="링크를 클립보드에 복사했습니다."
      />
    </>
  )
}
