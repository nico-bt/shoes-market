import Image from "next/image"
import styles from "./shoe.module.css"
import { useUserContext } from "../context/userContext"
import { useEffect, useState } from "react"

function Shoe({ item }) {
  const { id, title, brand, price, thumbnail, images } = item

  const { user, redeemItem } = useUserContext()
  const [canBuy, setCanBuy] = useState(true)

  useEffect(() => {
    setCanBuy(user.money - price > 0)
    console.log(user)
  }, [user])

  const handleClick = () => {
    if (canBuy) {
      redeemItem(item)
    }
  }

  return (
    <div className={styles.productItem}>
      <img src={thumbnail} className={styles.productImg} alt={title} />
      <div className={styles.description}>
        <p>
          {brand} <span>$ {price}</span>
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
        <div className={styles.moreMoney}>
          Te faltan ${Math.abs(user.money - price).toLocaleString()}
        </div>
      )}
    </div>
  )
}

export default Shoe
