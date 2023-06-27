import Image from "next/image"
import styles from "./shoe.module.css"

function Shoe({ item }) {
  const { title, brand, price, thumbnail, images } = item

  return (
    <div className={styles.productItem}>
      <img src={thumbnail} className={styles.productImg} alt={title} />
      <div className={styles.description}>
        <p>
          {brand} <span>$ {price}</span>
        </p>
        <h2>{title}</h2>
      </div>

      <div className={styles.productItemOverlay}>
        <h2>$ {price}</h2>
        <button>Comprar</button>
      </div>
    </div>
  )
}

export default Shoe
