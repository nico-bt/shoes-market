"use client"

import styles from "./products.module.css"
import { products } from "../data/data.json"
import Shoe from "./Shoe"

function Products() {
  console.log(products)
  return (
    <div className={styles.productsContainer}>
      {products.map((item) => (
        <Shoe key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Products
