"use client"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useEffect, useState } from "react"
import { useUserContext } from "@/app/context/userContext"

const styleDialogText = { fontSize: "1.3rem", lineHeight: 1.6, marginTop: 2, color: "black" }

export default function WelcomeMsg() {
  const { isFirstLoad, setFirstLoadFalse } = useUserContext()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isFirstLoad) {
      setOpen(true)
    }
  }, [isFirstLoad])

  const handleClose = () => {
    setFirstLoadFalse()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        bgcolor={"#1f1d1c"}
        color={"#ff7900"}
        style={{ fontSize: "1.6rem", letterSpacing: "3px", marginBottom: "0.5rem" }}
      >
        Trending Shoe Market
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={styleDialogText}>
          Link referido por Nico Battaglia.
        </DialogContentText>

        <DialogContentText sx={styleDialogText}>
          Tenés $ 5,000 de regalo para comprar!
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Ok 👍
        </Button>
      </DialogActions>
    </Dialog>
  )
}
