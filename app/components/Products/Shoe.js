import Image from "next/image"
import styles from "./shoe.module.css"
import { useUserContext } from "../../context/userContext"
import { useEffect, useState } from "react"
import DetailDialog from "./DetailDialog"

function Shoe({ item }) {
  const { title, brand, price, thumbnail } = item

  const { user, redeemItem } = useUserContext()
  const [canBuy, setCanBuy] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    setCanBuy(user.money - price > 0)
  }, [user])

  const handleClick = () => {
    setOpenDialog(true)
    // redeemItem(item)
  }

  return (
    <>
      <div className={styles.productItem}>
        <div className={styles.productImgContainer}>
          <img src={thumbnail} className={styles.productImg} alt={title} />
        </div>
        <div className={styles.description}>
          <p>
            {brand} <span>$ {price.toLocaleString()}</span>
          </p>
          <h2>{title}</h2>
        </div>

        {canBuy && (
          <div className={styles.productItemOverlay}>
            <h2>$ {price.toLocaleString()}</h2>
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
