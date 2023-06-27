import Image from "next/image"
import styles from "./shoe.module.css"
import { useUserContext } from "../context/userContext"
import { useEffect, useState } from "react"
import DetailDialog from "./DetailDialog"

function Shoe({ item }) {
  const { id, title, brand, price, thumbnail, images } = item

  const { user, redeemItem } = useUserContext()
  const [canBuy, setCanBuy] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    setCanBuy(user.money - price > 0)
    console.log(user)
  }, [user])

  const handleClick = () => {
    setOpenDialog(true)
    // redeemItem(item)
  }

  return (
    <>
      <div className={styles.productItem}>
        <img src={thumbnail} className={styles.productImg} alt={title} />
        <div className={styles.description}>
          <p>
            {brand} <span>$ {price.toLocaleString()}</span>
          </p>
          <h2>{title}</h2>
        </div>

        {canBuy && (
          <div className={styles.productItemOverlay}>
            <h2>$ {price}</h2>
            <button onClick={handleClick} disabled={!canBuy}>
              Comprar
            </button>
          </div>
        )}

        {!canBuy && (
          <div className={styles.productItemOverlay} style={{ backgroundImage: "none" }}>
            <div className={styles.moreMoney}>
              Te faltan ${Math.abs(user.money - price).toLocaleString()}
            </div>
            <button style={{ border: "1px solid gray" }} onClick={handleClick}>
              Ver
            </button>
          </div>
        )}

        <DetailDialog open={openDialog} setOpen={setOpenDialog} item={item} canBuy={canBuy} />
      </div>
    </>
  )
}

export default Shoe
