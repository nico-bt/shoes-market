"use client"

import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import CloseIcon from "@mui/icons-material/Close"
import Image from "next/image"
import { CircularProgress, DialogTitle, IconButton } from "@mui/material"
import { useUserContext } from "../context/userContext"
import ImgCarousel from "./ImgCarousel"

export default function DetailDialog({ open, setOpen, item }) {
  const { getUser, redeemItem, isTransactionOk } = useUserContext()

  const handleClose = () => {
    setOpen(false)
  }

  const handleGetItem = async () => {
    redeemItem(item)
    setOpen(false)
  }

  const CloseBtn = () => {
    return (
      <DialogTitle sx={{ m: 0, p: 0 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Image src={CloseIcon} width={32} height={32} alt="close icon" />
        </IconButton>
      </DialogTitle>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <img src={item.images[0]} width={"100%"} alt={`${item.title} image`} /> */}

        <ImgCarousel images={item.images} />

        <h2 style={{ margin: 0, marginBottom: "8px", textAlign: "center" }}>{item.title}</h2>
        <div
          style={{
            display: "flex",
            fontSize: "2rem",
          }}
        >
          {item.price}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
          <Button variant="outlined" size="large" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" size="large" autoFocus onClick={handleGetItem}>
            Comprar
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}
