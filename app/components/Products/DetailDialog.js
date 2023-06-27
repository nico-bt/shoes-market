"use client"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import closeIcon from "@/public/closeIcon.svg"
import Image from "next/image"
import { DialogTitle, IconButton } from "@mui/material"
import { useUserContext } from "../../context/userContext"
import ImgCarousel from "./ImgCarousel"

export default function DetailDialog({ open, setOpen, item, canBuy }) {
  const { redeemItem } = useUserContext()

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
            right: 1,
            top: 1,
            zIndex: 900,
            fill: "gray",
          }}
        >
          <Image src={closeIcon} width={24} height={24} alt="close icon" />
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
      <CloseBtn />
      <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
        <ImgCarousel images={item.images} />
        <h2 style={{ margin: 0, marginBottom: "8px", textAlign: "center" }}>{item.title}</h2>

        <div style={{ display: "flex", fontSize: "2rem" }}>$ {item.price.toLocaleString()}</div>

        {canBuy && (
          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <Button variant="outlined" color="error" size="large" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              size="large"
              autoFocus
              onClick={handleGetItem}
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 225, 0, 0.75),rgba(255, 165, 0, 0.75), rgba(255, 0, 0, 0.75))",
              }}
            >
              Comprar
            </Button>
          </div>
        )}
      </DialogActions>
    </Dialog>
  )
}
