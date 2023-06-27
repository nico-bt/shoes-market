"use client"

import styles from "./products.module.css"
import Shoe from "./Shoe"

function Products({ products }) {
  return (
    <div className={styles.productsContainer}>
      {products.map((item) => (
        <Shoe key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Products
